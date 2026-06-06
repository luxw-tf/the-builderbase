import React from 'react';

const Lore = () => {
  return (
    <section className="section lore" id="lore" style={{ padding: '80px 0' }}>
      <div className="lore-bg-container">
        <div className="lore-bg"></div>
        <div className="lore-vignette"></div>
      </div>
      <div className="lore-content" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px', zIndex: 10, position: 'relative' }}>
        <h2 className="section-title" style={{ textAlign: 'center', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, marginBottom: '30px', background: 'linear-gradient(135deg, #ffffff 0%, #a3a3a3 100%)', 'WebkitBackgroundClip': 'text', 'WebkitTextFillColor': 'transparent' }}>
          THE ORIGIN
        </h2>
        <p className="lore-text" style={{ fontSize: '1.25rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginBottom: '40px', maxWidth: '800px', margin: '0 auto' }}>
          In May 2025, a group of builders got tired of watching India's Web3 talent
          scatter — brilliant devs with no crew, founders with no builders, hackers
          with no community. Builder Base started as a single WhatsApp group.
          <br /><br />
          Today it's 3,500+ builders across Delhi, Mumbai, Bengaluru, and 7+ more cities.
          Partnerships spanning MetaMask, the Ethereum Foundation, Arbitrum, Monad,
          BNB Chain, Shardeum, Avalanche, and Vara Network.
          <br /><br />
          We run hackathons, builder nights, workshops, and collab sessions — all IRL,
          all high-signal, zero fluff.
        </p>

        {/* 4-Item Stats Row */}
        <div className="lore-stats-row">
          <div className="lore-stat">
            <span className="stat-num">3,500+</span>
            <span className="stat-label">Builders</span>
          </div>
          <div className="lore-stat">
            <span className="stat-num">10+</span>
            <span className="stat-label">Cities</span>
          </div>
          <div className="lore-stat">
            <span className="stat-num">8+</span>
            <span className="stat-label">Ecosystem Partners</span>
          </div>
          <div className="lore-stat">
            <span className="stat-num">50+</span>
            <span className="stat-label">Events Organized</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lore;
