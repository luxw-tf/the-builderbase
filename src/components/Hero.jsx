import { useWallet } from '../context/WalletContext.jsx';

const Hero = ({ heroRef, bgRef, navRef, builderRef, baseRef, bottomTextRef }) => {
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
        {isConnected ? (
          <button className="btn-connect btn-connected" onClick={disconnectWallet}>
            <span className="dot-active"></span>
            <span className="btn-text" data-address={formatAddress(account)}></span>
          </button>
        ) : (
          <button 
            className={`btn-connect ${isConnecting ? 'btn-connecting' : ''}`} 
            onClick={connectWallet}
            disabled={isConnecting}
          >
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </button>
        )}
      </nav>

      <div className="hero-content">
        <div className="hero-title-wrap">
          <span className="word-builder" ref={builderRef}>BUILDER</span>
          <span className="word-base" ref={baseRef}>BASE</span>
        </div>
      </div>

      <div className="hero-bottom-text" ref={bottomTextRef}>
        <span className="left">BUILDING THE FUTURE OF WEB3</span>
        <span className="center">SCROLL TO ENTER BASE</span>
        <span className="right">EST. 2026 / CONTRACT ACTIVE</span>
      </div>
    </section>
  );
};

export default Hero;

