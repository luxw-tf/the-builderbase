import React from 'react';
import { useWallet } from '../context/WalletContext.jsx';
import { Wallet } from 'lucide-react';
import Link from './Link.jsx';

const Navbar = ({ onEnterPortal }) => {
  const { account, isConnected, isConnecting, connectWallet, disconnectWallet } = useWallet();

  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <nav className="nav-bar sticky-nav" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      padding: '20px 60px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 90,
      background: 'rgba(7, 7, 10, 0.8)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      <Link to="/" className="nav-logo" style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'var(--font-display)', letterSpacing: '1px' }}>
        BUILDER BASE
      </Link>

      <div className="nav-actions-wrap" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <button
          className="btn-enter-portal-nav outline"
          onClick={onEnterPortal}
          style={{
            background: 'transparent',
            border: '1px solid rgba(182, 255, 64, 0.4)',
            color: 'var(--accent-lime)',
            padding: '8px 18px',
            borderRadius: '20px',
            fontWeight: 700,
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(182,255,64,0.06)'; }}
          onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; }}
        >
          DAO Portal
        </button>

        <a
          href="https://https://luma.com/Builderbase"
          target="_blank"
          rel="noreferrer"
          className="btn-enter-portal-nav outline"
          style={{
            background: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: 'rgba(255,255,255,0.7)',
            padding: '8px 18px',
            borderRadius: '20px',
            fontWeight: 700,
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            cursor: 'pointer',
            textDecoration: 'none',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
          onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; }}
        >
          Events ↗
        </a>

        {isConnected ? (
          <button className="btn-connect btn-connected" onClick={disconnectWallet} style={{ fontSize: '0.8rem', padding: '10px 18px' }}>
            <span className="dot-active"></span>
            <span className="btn-text" data-address={formatAddress(account)}></span>
          </button>
        ) : (
          <button
            className={`btn-connect-icon ${isConnecting ? 'btn-connecting' : ''}`}
            onClick={connectWallet}
            disabled={isConnecting}
            style={{
              background: 'var(--accent-lime)',
              border: 'none',
              color: '#000',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <Wallet size={16} />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
