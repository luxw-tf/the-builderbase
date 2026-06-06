import React, { useState } from 'react';
import { MapPin, ShieldAlert, Award, Star, Compass } from 'lucide-react';

const chapters = [
  { city: "Delhi NCR", lead: "Aryan Sharma", members: "1,500+ builders", campus: "University, DTU, NSUT", emoji: "🏰", aesthetic: "Frenetic hackers, night-long code sprints, massive developer syncs." },
  { city: "Mumbai", lead: "Rohan Sawant", members: "800+ builders", campus: "VJTI, IIT Bombay, SPIT", emoji: "🌊", aesthetic: "DeFi protocols, algorithmic trading strategies, ocean-view syncs." },
  { city: "Bengaluru", lead: "Sneha Nair", members: "1,000+ builders", campus: "PESU, RVCE, IIITB", emoji: "🌴", aesthetic: "ZK researchers, protocol architects, coffee-fueled hackathons." },
  { city: "Kolkata", lead: "Aniket Ghosh", members: "450+ builders", campus: "JU, IEM, Techno India", emoji: "🌉", aesthetic: "FOSS enthusiasts, smart-contract devs, Web3 security auditors." },
  { city: "Indore", lead: "Divyansh Soni", members: "300+ builders", campus: "SGSITS, IPS, IET DAVV", emoji: "🌆", aesthetic: "Rapid prototyping, dApp devs, regional student bootcamps." },
  { city: "Bhopal", lead: "Karan Johar", members: "250+ builders", campus: "MANIT, LNCT, VIT Bhopal", emoji: "🏞️", aesthetic: "Solidity learners, ZK researchers, mechanism design study groups." }
];

const IndiaMapNode = ({ x, y, city, stats, active, onHover, onLeave }) => {
  return (
    <g 
      transform={`translate(${x}, ${y})`}
      onMouseEnter={() => onHover(city, stats)}
      onMouseLeave={onLeave}
      style={{ cursor: 'pointer' }}
    >
      {/* Pulsating outer radar */}
      <circle r="12" fill="var(--accent-lime)" opacity="0.15">
        <animate attributeName="r" values="5;20;5" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite" />
      </circle>
      {/* Core node */}
      <circle r="5" fill={active ? 'var(--accent-lime)' : '#00c8ff'} style={{ transition: 'fill 0.2s' }} />
      <circle r="2" fill="#fff" />
    </g>
  );
};

const ChaptersPage = () => {
  const [hoveredCity, setHoveredCity] = useState(null);
  const [hoveredStats, setHoveredStats] = useState(null);

  const handleNodeHover = (city, stats) => {
    setHoveredCity(city);
    setHoveredStats(stats);
  };

  const handleNodeLeave = () => {
    setHoveredCity(null);
    setHoveredStats(null);
  };

  return (
    <div className="subpage-container" style={{ background: '#07070a', color: '#fff', minHeight: '100vh', padding: '120px 20px 80px 20px' }}>
      <div className="subpage-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontFamily: 'var(--font-display)', color: '#fff', letterSpacing: '2px', marginBottom: '20px' }}>UNIVERSITY CHAPTERS</h1>
        <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto', fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>
          Powering Web3 & AI communities in universities. From local campus nodes to the pan-India developer network.
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '60px' }}>
        
        {/* Interactive Geographical Showcase */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '30px', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '40px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
          {/* Map wrapper */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '20px', letterSpacing: '1px' }}>Ecosystem Nodes Map</h3>
            <div style={{ width: '100%', maxWidth: '400px', height: '420px', position: 'relative' }}>
              
              {/* Premium Vector India Map Outline (Simplified/Abstract grid model) */}
              <svg viewBox="0 0 400 450" width="100%" height="100%" style={{ filter: 'drop-shadow(0 0 10px rgba(0,200,255,0.05))' }}>
                {/* Simplified India Borders Path */}
                <path 
                  d="M190 20 L210 30 L220 50 L200 80 L225 100 L240 120 L250 140 L260 160 L320 170 L345 160 L350 180 L320 200 L280 205 L260 215 L260 240 L285 245 L290 260 L270 270 L250 250 L235 240 L230 260 L210 270 L220 300 L210 330 L195 365 L180 395 L175 425 L170 395 L155 360 L140 330 L130 300 L115 285 L85 280 L75 290 L60 275 L80 260 L70 240 L100 220 L110 190 L125 170 L140 130 L160 100 L170 80 L165 65 L185 45 Z" 
                  fill="none" 
                  stroke="rgba(255, 255, 255, 0.06)" 
                  strokeWidth="2" 
                />
                
                {/* Pulsating City Nodes */}
                <IndiaMapNode x={145} y={150} city="Delhi NCR" stats="1,500+ builders · 15+ Events" active={hoveredCity === "Delhi NCR"} onHover={handleNodeHover} onLeave={handleNodeLeave} />
                <IndiaMapNode x={115} y={285} city="Mumbai" stats="800+ builders · 8+ Events" active={hoveredCity === "Mumbai"} onHover={handleNodeHover} onLeave={handleNodeLeave} />
                <IndiaMapNode x={150} y={350} city="Bengaluru" stats="1,000+ builders · 12+ Events" active={hoveredCity === "Bengaluru"} onHover={handleNodeHover} onLeave={handleNodeLeave} />
                <IndiaMapNode x={235} y={230} city="Kolkata" stats="450+ builders · 6+ Events" active={hoveredCity === "Kolkata"} onHover={handleNodeHover} onLeave={handleNodeLeave} />
                <IndiaMapNode x={155} y={240} city="Indore" stats="300+ builders · 4+ Events" active={hoveredCity === "Indore"} onHover={handleNodeHover} onLeave={handleNodeLeave} />
                <IndiaMapNode x={170} y={250} city="Bhopal" stats="250+ builders · 3+ Events" active={hoveredCity === "Bhopal"} onHover={handleNodeHover} onLeave={handleNodeLeave} />
                
                {/* Additional Cities */}
                <IndiaMapNode x={160} y={310} city="Hyderabad" stats="350+ members · Node active" active={hoveredCity === "Hyderabad"} onHover={handleNodeHover} onLeave={handleNodeLeave} />
                <IndiaMapNode x={165} y={380} city="Chennai" stats="200+ members · Node active" active={hoveredCity === "Chennai"} onHover={handleNodeHover} onLeave={handleNodeLeave} />
                <IndiaMapNode x={120} y={190} city="Jaipur" stats="180+ members · Node active" active={hoveredCity === "Jaipur"} onHover={handleNodeHover} onLeave={handleNodeLeave} />
                <IndiaMapNode x={190} y={190} city="Patna" stats="150+ members · Node active" active={hoveredCity === "Patna"} onHover={handleNodeHover} onLeave={handleNodeLeave} />
              </svg>
              
              {/* Dynamic Overlay HUD */}
              <div 
                style={{ 
                  position: 'absolute', 
                  bottom: '20px', 
                  left: '50%', 
                  transform: 'translateX(-50%)', 
                  background: 'rgba(7,7,10,0.95)', 
                  border: '1px solid rgba(182, 255, 64, 0.3)', 
                  borderRadius: '10px', 
                  padding: '10px 20px', 
                  width: '90%', 
                  textAlign: 'center',
                  fontFamily: 'monospace',
                  fontSize: '0.8rem',
                  opacity: hoveredCity ? 1 : 0.4,
                  transition: 'opacity 0.2s',
                  pointerEvents: 'none'
                }}
              >
                {hoveredCity ? (
                  <>
                    <strong style={{ color: 'var(--accent-lime)' }}>{hoveredCity}</strong>: {hoveredStats}
                  </>
                ) : (
                  "Hover over nodes to scan city metrics"
                )}
              </div>
            </div>
          </div>

          {/* Chapters Description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: 'var(--accent-lime)' }}>
              BUILDER HIVE MAP
            </h3>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
              Builder Base coordinates active node chapters across major campuses and hubs in India. Each chapter is run by a student lead backed by local organizers.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <MapPin size={18} style={{ color: 'var(--accent-lime)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ display: 'block', fontSize: '0.95rem' }}>Regional Dev Syncs</strong>
                  <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>Bi-weekly offline meetups, workshops, and build hacks on campus.</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Award size={18} style={{ color: '#00c8ff', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ display: 'block', fontSize: '0.95rem' }}>Ecosystem Support</strong>
                  <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>Direct grants, faucet resources, and access to partner platforms (MetaMask, Monad).</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chapters Grid */}
        <div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '25px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
            Active Campus Chapters
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
            {chapters.map(c => (
              <div
                key={c.city}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: '30px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px',
                  position: 'relative'
                }}
              >
                <span style={{ position: 'absolute', top: '25px', right: '30px', fontSize: '2rem' }}>
                  {c.emoji}
                </span>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>{c.city}</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-lime)' }}>{c.members}</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div>Lead: <strong style={{ color: '#fff' }}>{c.lead}</strong></div>
                  <div>Campuses: <span style={{ color: 'rgba(255,255,255,0.7)' }}>{c.campus}</span></div>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
                  {c.aesthetic}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Open a Chapter instructions */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '35px', marginTop: '40px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '50px' }}>
          <div>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '16px', color: 'var(--accent-lime)' }}>Open a New Chapter</h3>
            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: '20px' }}>
              Want to lead a Builder Base node at your university or city? We help builders establish local chapters to co-organize high-signal developer workshops, ZK study groups, and hackathons.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
              <div>• Minimum <strong>10+ committed builders</strong> inside campus</div>
              <div>• Host at least <strong>2 high-signal events per quarter</strong></div>
              <div>• Zero fluff workshops, ZK groups, and hack sprints</div>
            </div>
          </div>

          <div style={{ background: 'rgba(182, 255, 64, 0.02)', border: '1px solid rgba(182, 255, 64, 0.15)', borderRadius: '20px', padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px' }}>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Campus Ambassador Program</h4>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
              Become the voice of Builder Base in your campus. Drive Web3 education, organize hackathons, and connect developers directly with ecosystem grants.
            </p>
            <a
              href="mailto:founder@builderbase.xyz?subject=Apply for University Chapter Lead"
              style={{
                display: 'inline-block',
                textAlign: 'center',
                background: 'var(--accent-lime)',
                color: '#000',
                padding: '12px',
                borderRadius: '10px',
                fontWeight: 800,
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              Apply as Chapter Lead
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChaptersPage;
