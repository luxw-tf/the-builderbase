import { useWallet } from '../context/WalletContext.jsx';
import { Wallet } from 'lucide-react';

const Hero = ({ heroRef, bgRef, navRef, builderRef, baseRef, bottomTextRef, onEnterPortal }) => {
  const { account, isConnected, isConnecting, connectWallet, disconnectWallet } = useWallet();

  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <section className="section hero" ref={heroRef}>
      {/* Background Parallax Video + Vignette */}
      <div className="hero-bg-container">
        <iframe
          src="https://player.mux.com/023o1XMWktI2pY00xeQJicJsyJGXHblrVts4qDSAxYAxk?autoplay=true&muted=true&loop=true&controls=false"
          className="hero-video-bg"
          ref={bgRef}
          allow="autoplay; encrypted-media"
          title="Builder Base Cinematic Video"
        />
        <div className="hero-vignette"></div>
      </div>

      <nav className="nav-bar" ref={navRef}>
        <div className="nav-logo">BUILDER BASE</div>
        <div className="nav-actions-wrap" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <button className="btn-enter-portal-nav" onClick={onEnterPortal}>
            DAO Portal
          </button>
          <a
            href="https://lu.ma/builderbase"
            target="_blank"
            rel="noreferrer"
            className="btn-enter-portal-nav outline"
            style={{
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'rgba(255, 255, 255, 0.8)',
              padding: '10px 24px',
              borderRadius: '50px',
              fontWeight: 800,
              textTransform: 'uppercase',
              fontSize: '0.9rem',
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            Events ↗
          </a>

          {isConnected ? (
            <button className="btn-connect btn-connected" onClick={disconnectWallet}>
              <span className="dot-active"></span>
              <span className="btn-text" data-address={formatAddress(account)}></span>
            </button>
          ) : (
            <button
              className={`btn-connect-icon ${isConnecting ? 'btn-connecting' : ''}`}
              onClick={connectWallet}
              disabled={isConnecting}
              title={isConnecting ? "Connecting..." : "Connect Wallet"}
            >
              <Wallet size={18} />
            </button>
          )}
        </div>
      </nav>

      <div className="hero-content">
        <div className="hero-title-wrap">
          <span className="word-builder" ref={builderRef}>BUILDER</span>
          <span className="word-base" ref={baseRef}>BASE</span>
        </div>
      </div>

      <div className="hero-bottom-text" ref={bottomTextRef}>
        <span className="left">INDIA'S WEB3 + AI BUILDER NETWORK</span>
        <span className="center">SCROLL TO ENTER BASE</span>
        <span className="right">EST. MAY 2025 · 3,500+ BUILDERS</span>
      </div>
    </section>
  );
};

export default Hero;

