import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePrivy, useWallets } from '@privy-io/react-auth';

const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  const { login, logout, ready, authenticated, user } = usePrivy();
  const { wallets } = useWallets();

  const [useFallback, setUseFallback] = useState(false);
  const [fallbackAccount, setFallbackAccount] = useState(null);
  const [fallbackConnecting, setFallbackConnecting] = useState(false);

  // Detect if Privy takes too long to load (e.g. due to sandbox App ID domain restriction)
  useEffect(() => {
    if (ready) {
      setUseFallback(false);
    } else {
      const timer = setTimeout(() => {
        if (!ready) {
          console.warn("Privy SDK took too long to load (possibly due to domain restrictions). Enabling direct wallet fallback...");
          setUseFallback(true);
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [ready]);

  // Handle accountsChanged from direct window.ethereum if fallback is active
  useEffect(() => {
    if (useFallback && typeof window !== 'undefined' && window.ethereum) {
      // Check if already authorized in browser
      window.ethereum.request({ method: 'eth_accounts' })
        .then(accounts => {
          if (accounts && accounts.length > 0) {
            setFallbackAccount(accounts[0]);
          }
        })
        .catch(console.error);

      const handleAccounts = (accounts) => {
        if (accounts && accounts.length > 0) {
          setFallbackAccount(accounts[0]);
        } else {
          setFallbackAccount(null);
        }
      };
      window.ethereum.on('accountsChanged', handleAccounts);
      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener('accountsChanged', handleAccounts);
        }
      };
    }
  }, [useFallback]);

  // Helper to generate a stable mock address from Privy user ID if no embedded wallet is active
  const getDeterministicAddress = (userId) => {
    if (!userId) return null;
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      hash = userId.charCodeAt(i) + ((hash << 5) - hash);
    }
    let address = '0x';
    for (let i = 0; i < 20; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      address += ('00' + value.toString(16)).slice(-2);
    }
    while (address.length < 42) {
      address += '0';
    }
    return address.substring(0, 42).toLowerCase();
  };

  // Derived states
  const detectedAccount = wallets[0]?.address || user?.wallet?.address || (authenticated && user?.id ? getDeterministicAddress(user.id) : null);

  const account = useFallback
    ? fallbackAccount
    : detectedAccount;

  const isConnected = useFallback
    ? !!fallbackAccount
    : (authenticated && !!account);

  const isConnecting = useFallback
    ? fallbackConnecting
    : !ready;

  const error = null;

  const connectWallet = async () => {
    if (useFallback) {
      if (typeof window !== 'undefined' && window.ethereum) {
        setFallbackConnecting(true);
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          if (accounts && accounts.length > 0) {
            setFallbackAccount(accounts[0]);
          }
        } catch (err) {
          console.error("Direct wallet connection error:", err);
        } finally {
          setFallbackConnecting(false);
        }
      } else {
        // Mock fallback if no window.ethereum
        setFallbackConnecting(true);
        setTimeout(() => {
          setFallbackAccount("0x15E26315562166698982D811");
          setFallbackConnecting(false);
        }, 500);
      }
    } else {
      try {
        await login();
      } catch (err) {
        console.error("Privy login error:", err);
      }
    }
  };

  const disconnectWallet = async () => {
    if (useFallback) {
      setFallbackAccount(null);
    } else {
      try {
        await logout();
      } catch (err) {
        console.error("Privy logout error:", err);
      }
    }
  };

  const web3 = null;
  const hasProvider = true;

  return (
    <WalletContext.Provider
      value={{
        account,
        web3,
        isConnected,
        isConnecting,
        error,
        connectWallet,
        disconnectWallet,
        hasProvider
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
