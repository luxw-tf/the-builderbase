import React from 'react';

const partners = [
  { name: "MetaMask", tier: "anchor", logo: "🦊", url: "https://metamask.io", desc: "Anchor Partner · Event Co-Host" },
  { name: "Ethereum Foundation", tier: "anchor", logo: "⟠", url: "https://ethereum.org", desc: "Ecosystem Grant · ESP Partner" },
  { name: "Arbitrum", tier: "ecosystem", logo: "🔵", url: "https://arbitrum.io", desc: "Ecosystem Partner" },
  { name: "Monad", tier: "ecosystem", logo: "🟣", url: "https://monad.xyz", desc: "Ecosystem Partner · Event Sponsor" },
  { name: "BNB Chain", tier: "ecosystem", logo: "🟡", url: "https://www.bnbchain.org", desc: "Ecosystem Partner" },
  { name: "Shardeum", tier: "ecosystem", logo: "🔷", url: "https://shardeum.org", desc: "Ecosystem Partner" },
  { name: "Vara Network", tier: "ecosystem", logo: "⚡", url: "https://vara.network", desc: "Ecosystem Partner" }
];

const Ecosystem = () => {
  return (
    <section className="ecosystem-section" id="ecosystem" style={{ background: '#fdfaf6' }}>
      <div style={{ maxWidth: '1200px', width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 className="section-title" style={{ color: '#1a1a1a', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, marginBottom: '10px', fontFamily: 'var(--font-display)' }}>
          PARTNER NETWORK
        </h2>
        <p style={{ color: 'rgba(0,0,0,0.6)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 40px auto', lineHeight: 1.6 }}>
          Backed by the ecosystems we build on.
        </p>

        {/* Row 1: Anchor Partners */}
        <div className="partner-grid-anchor">
          {partners.filter(p => p.tier === 'anchor').map((p, idx) => (
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              key={idx}
              className="partner-card anchor"
            >
              <span className="partner-logo">{p.logo}</span>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <span className="partner-name">{p.name}</span>
                <span className="partner-badge">Anchor Partner</span>
              </div>
              <p className="partner-desc">{p.desc}</p>
            </a>
          ))}
        </div>

        {/* Row 2: Ecosystem Partners */}
        <div className="partner-grid-eco">
          {partners.filter(p => p.tier === 'ecosystem').map((p, idx) => (
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              key={idx}
              className="partner-card"
            >
              <span className="partner-logo" style={{ fontSize: '2rem' }}>{p.logo}</span>
              <span className="partner-name">{p.name}</span>
              <p className="partner-desc">{p.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ecosystem;
