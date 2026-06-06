import React, { createContext, useContext, useState, useEffect } from 'react';
import Web3 from 'web3';

const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  // Check if MetaMask or any ethereum provider is injected
  const hasProvider = typeof window !== 'undefined' && window.ethereum !== undefined;

  // Initialize Web3 if provider is available, check already connected accounts
  useEffect(() => {
    if (hasProvider) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      // Check if already authorized/connected
      web3Instance.eth.getAccounts()
        .then((accounts) => {
          if (accounts && accounts.length > 0) {
            setAccount(accounts[0]);
          }
        })
        .catch((err) => {
          console.error("Error fetching accounts:", err);
        });

      // Handle account changes
      const handleAccountsChanged = (accounts) => {
        if (accounts && accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount(null);
        }
      };

      // Handle chain change
      const handleChainChanged = () => {
        // Standard recommendation is to reload the page on network/chain changes
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        if (window.ethereum && window.ethereum.removeListener) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
          window.ethereum.removeListener('chainChanged', handleChainChanged);
        }
      };
    }
  }, [hasProvider]);

  const connectWallet = async () => {
    if (!hasProvider) {
      setError('MetaMask is not installed. Please install MetaMask to connect.');
      window.open('https://metamask.io/download/', '_blank');
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      // Request accounts access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts && accounts.length > 0) {
        setAccount(accounts[0]);
      }
    } catch (err) {
      console.error("User rejected or error connecting:", err);
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    // Clear account state in the frontend
    setAccount(null);
  };

  const isConnected = !!account;

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
