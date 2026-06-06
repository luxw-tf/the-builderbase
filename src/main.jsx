import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { WalletProvider } from './context/WalletContext.jsx'
import { PrivyProvider } from '@privy-io/react-auth'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PrivyProvider
      appId="cmq2pggph02vz0cl7gcbfvf6n"
      config={{
        loginMethods: ['wallet', 'email', 'google', 'twitter', 'github'],
        appearance: {
          theme: 'light',
          accentColor: '#884e4f',
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
      }}
    >
      <WalletProvider>
        <App />
      </WalletProvider>
    </PrivyProvider>
  </StrictMode>,
)

