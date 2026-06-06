import React from 'react';

const phases = [
  {
    phase: "01",
    status: "completed",
    date: "May 2025",
    title: "Ignition",
    items: [
      "Founded Builder Base as WhatsApp-native community",
      "First 100 builders across Delhi NCR",
      "Community-first, no VC, no BS"
    ]
  },
  {
    phase: "02",
    status: "completed",
    date: "Late 2025",
    title: "Campus Expansion",
    items: [
      "First ecosystem partnerships: Arbitrum, Monad, BNB Chain",
      "Shardeum, Vara Network onboarded"
    ]
  },
  {
    phase: "03",
    status: "completed",
    date: "2025",
    title: "Ecosystem Anchor",
    items: [
      "MetaMask/Consensys anchor partnership established",
      "3,500+ members across 10+ cities",
      "QuantCraft: 1,500+ registrations",
      "Classified Hack: 81,500+ impressions"
    ]
  },
  {
    phase: "04",
    status: "active",
    date: "2026",
    title: "DAO Infrastructure",
    items: [
      "DAO Portal launch: events, bounties, builder registry",
      "MetaMask Community Builder Nights (3 events, Delhi)",
      "Propulsion Labs content program launched",
      "Onchain builder identity system (Base Sepolia)"
    ]
  },
  {
    phase: "05",
    status: "upcoming",
    date: "2026–27",
    title: "The Meta-Base",
    items: [
      "Cross-city DAO governance goes live",
      "Builder reputation system + onchain credentials",
      "Bounty Hub mainnet deployment",
      "Builder Base token utility (governance + rewards)",
      "Pan-India chapter network: 20+ cities"
    ]
  }
];

const Roadmap = () => {
  return (
    <section className="roadmap-section" id="roadmap">
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
        <h2 className="section-title" style={{ color: '#1a1a1a', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, textAlign: 'center', marginBottom: '10px', fontFamily: 'var(--font-display)' }}>
          ROADMAP
        </h2>
        <p style={{ color: 'rgba(0,0,0,0.6)', fontSize: '1.1rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto 50px auto', lineHeight: 1.6 }}>
          Our journey from a single group chat to India's core Web3 dev infrastructure.
        </p>

        <div className="timeline-wrap">
          <div className="timeline-line"></div>
          
          {phases.map((item, idx) => {
            const sideClass = idx % 2 === 0 ? "left-side" : "right-side";
            return (
              <div 
                key={idx} 
                className={`timeline-card ${sideClass} ${item.status}`}
              >
                <span className="phase-badge">{item.phase}</span>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: 800, 
                    padding: '4px 12px', 
                    borderRadius: '20px', 
                    background: item.status === 'completed' ? 'rgba(182, 255, 64, 0.12)' : (item.status === 'active' ? 'rgba(0, 200, 255, 0.08)' : 'rgba(0,0,0,0.05)'), 
                    color: item.status === 'completed' ? '#71c000' : (item.status === 'active' ? '#00c8ff' : 'rgba(0,0,0,0.4)'),
                    textTransform: 'uppercase',
                    border: item.status === 'completed' ? '1px solid rgba(182,255,64,0.3)' : (item.status === 'active' ? '1px solid rgba(0,200,255,0.2)' : '1px solid rgba(0,0,0,0.1)')
                  }}>
                    {item.date}
                  </span>
                  {item.status === 'completed' && <span style={{ color: '#b6ff40', fontWeight: 'bold' }}>✓ Done</span>}
                  {item.status === 'active' && <span style={{ color: '#00c8ff', fontWeight: 'bold', animation: 'blink 1.5s infinite' }}>● Active</span>}
                </div>

                <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1a1a1a', marginBottom: '16px' }}>{item.title}</h3>
                
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: 0 }}>
                  {item.items.map((bullet, bulletIdx) => (
                    <li 
                      key={bulletIdx}
                      style={{ 
                        fontSize: '0.9rem', 
                        color: 'rgba(0,0,0,0.7)', 
                        lineHeight: 1.5,
                        listStyle: 'none',
                        paddingLeft: '18px',
                        position: 'relative'
                      }}
                    >
                      <span style={{ position: 'absolute', left: 0, color: 'var(--accent-lime)' }}>▪</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
