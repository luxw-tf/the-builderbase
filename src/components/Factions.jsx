import React from 'react';

const pillars = [
  {
    emoji: "⚙️",
    title: "DEVS",
    color: "#3a6b00",
    hoverBorder: "#b6ff40",
    bg: "rgba(240, 255, 230, 0.85)",
    desc: "Smart contract architects, full-stack Web3 engineers, protocol builders. The technical backbone. Ships code, not vibes."
  },
  {
    emoji: "🚀",
    title: "BUILDERS",
    color: "#006080",
    hoverBorder: "#00c8ff",
    bg: "rgba(240, 250, 255, 0.85)",
    desc: "Hackathon veterans, rapid prototypers, product obsessives. 48-hour sprint specialists who ship before the coffee gets cold."
  },
  {
    emoji: "📣",
    title: "ORGANIZERS",
    color: "#b34a00",
    hoverBorder: "#ff6b00",
    bg: "rgba(255, 245, 240, 0.85)",
    desc: "Chapter leads, event coordinators, community architects. The ones who fill rooms, build chapters, and keep the base alive."
  },
  {
    emoji: "🔬",
    title: "RESEARCHERS",
    color: "#6b21a8",
    hoverBorder: "#c084fc",
    bg: "rgba(253, 244, 255, 0.85)",
    desc: "ZK researchers, AI/ML engineers, mechanism designers. Deep in the whitepaper so the rest of us don't have to be."
  }
];

const Factions = () => {
  return (
    <section className="section factions" id="factions" style={{ background: '#ffb5b5', padding: '100px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <div style={{ maxWidth: '1200px', width: '100%', textAlign: 'center' }}>
        <h2 className="section-title" style={{ color: '#1a1a1a', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, marginBottom: '20px', fontFamily: 'var(--font-display)' }}>
          COMMUNITY PILLARS
        </h2>
        <p style={{ color: 'rgba(0,0,0,0.7)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 50px auto', lineHeight: 1.6 }}>
          Meet the archetypes driving India's most active developer network.
        </p>

        <div className="factions-grid">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="faction-card"
              style={{
                background: p.bg,
                border: `1px solid rgba(255, 255, 255, 0.4)`,
                borderRadius: '16px',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = p.hoverBorder;
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = `0 10px 30px rgba(0, 0, 0, 0.08)`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span className="faction-emoji">{p.emoji}</span>
              <h3 className="faction-title" style={{ color: p.color, margin: '0 0 8px 0' }}>{p.title}</h3>
              <p className="faction-desc" style={{ color: '#1a1a1a', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Factions;
