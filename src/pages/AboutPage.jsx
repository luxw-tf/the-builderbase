import React from 'react';
import { Shield, Sparkles, MapPin, Coffee, Code2, Users } from 'lucide-react';

const values = [
  { name: "Build In Public", desc: "We ship open source code, share designs, write contract iterations, and build ecosystem tools openly in front of the community.", icon: <Code2 size={24} style={{ color: 'var(--accent-lime)' }} /> },
  { name: "High Signal, Zero Fluff", desc: "No speculative memes. No VC vibes. We prioritize technical masterclasses, gas optimizations, and real product escrows.", icon: <Sparkles size={24} style={{ color: '#00c8ff' }} /> },
  { name: "IRL Over URL", desc: "While we code in IDEs, we believe building trust happens IRL. We organize builder nights, bootcamps, and hackathons in person.", icon: <MapPin size={24} style={{ color: '#ff9d6c' }} /> },
  { name: "India-First", desc: "India has the world's largest developer talent pool. We exist to turn that talent into the global standard for Web3 applications.", icon: <Coffee size={24} style={{ color: '#ffb5b5' }} /> }
];

const team = [
  { name: "Punit Pal", role: "Founder", bio: "Developer advocate, EVM researcher, and creator. Coordinates community partnerships, hackathons, and runs Propulsion Labs.", handle: "@its_punit05", email: "founder@builderbase.xyz" },
  { name: "Aryan Sharma", role: "Delhi Chapter Lead", bio: "Hackathon veteran, full stack dApp dev, and leader of regional builder syncs in Delhi NCR.", handle: "@aryan_bb", email: "delhi@builderbase.xyz" },
  { name: "Rohan Sawant", role: "Mumbai Chapter Lead", bio: "Smart contract auditor, EVM researcher, and organizer of Mumbai developer syncs.", handle: "@rohan_bb", email: "mumbai@builderbase.xyz" },
  { name: "Sneha Nair", role: "Bengaluru Chapter Lead", bio: "ZK cryptography researcher and coordinator of Bengaluru hacker houses.", handle: "@sneha_bb", email: "blr@builderbase.xyz" }
];

const AboutPage = () => {
  return (
    <div className="subpage-container" style={{ background: '#07070a', color: '#fff', minHeight: '100vh', padding: '120px 20px 80px 20px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '60px' }}>
        
        {/* Hero Section */}
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontFamily: 'var(--font-display)', color: '#fff', letterSpacing: '2px', marginBottom: '20px' }}>THE MISSION</h1>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', fontWeight: 800, color: 'var(--accent-lime)', maxWidth: '800px', margin: '0 auto', lineHeight: 1.4 }}>
            "We exist to turn India's developer talent into the world's next generation of Web3 builders."
          </h2>
        </div>

        {/* Origin Story */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px', alignItems: 'center', background: 'rgba(255,255,255,0.01)', padding: '40px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.04)' }}>
          <div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '20px', fontFamily: 'var(--font-display)', color: 'var(--accent-lime)' }}>THE ORIGIN</h3>
            <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginBottom: '15px' }}>
              In May 2025, a group of builders got tired of watching India's Web3 talent scatter. Brilliant devs with no crew, founders with no builders, hackers with no community.
            </p>
            <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>
              Builder Base started as a single WhatsApp group. Today, it has grown to 3,500+ members across Delhi, Mumbai, Bengaluru, and 7+ more cities. We run zero-fluff hackathons, builder nights, workshops, and collab sessions with MetaMask, the Ethereum Foundation, Arbitrum, Monad, and more.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--accent-lime)', display: 'block', marginBottom: '5px' }}>3,500+</span>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Builders</span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--accent-lime)', display: 'block', marginBottom: '5px' }}>10+</span>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Cities</span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--accent-lime)', display: 'block', marginBottom: '5px' }}>8+</span>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Partners</span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--accent-lime)', display: 'block', marginBottom: '5px' }}>50+</span>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Events</span>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div>
          <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '40px', fontFamily: 'var(--font-display)' }}>CORE VALUES</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '25px' }}>
            {values.map(val => (
              <div
                key={val.name}
                style={{
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '16px',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px'
                }}
              >
                <div style={{ display: 'flex', background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '50%', width: 'fit-content' }}>
                  {val.icon}
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{val.name}</h3>
                <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* The Team */}
        <div>
          <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '40px', fontFamily: 'var(--font-display)' }}>THE TEAM</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '25px' }}>
            {team.map(member => (
              <div
                key={member.name}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '16px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>{member.name}</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-lime)' }}>{member.role}</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, flexGrow: 1 }}>{member.bio}</p>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px', fontSize: '0.75rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div>Handle: {member.handle}</div>
                  <div>Contact: {member.email}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Press/Media and Contact */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '50px' }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Press & Announcements</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
              <li>• Arbitrum Stylus regional dev tour partnership announced</li>
              <li>• MetaMask SDK integration and sponsored builder nights featured</li>
              <li>• QuantCraft hackathon attracts 1,500+ registration hub</li>
            </ul>
          </div>
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Get in Touch</h3>
            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: '15px' }}>
              Want to sponsor a developer track, host a bootcamp, or write about our on-chain builder reputation system?
            </p>
            <div style={{ fontSize: '0.88rem', fontFamily: 'monospace', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div>Email: <a href="mailto:founder@builderbase.xyz" style={{ color: 'var(--accent-lime)' }}>founder@builderbase.xyz</a></div>
              <div>Twitter: <a href="https://twitter.com/theBuilder_base" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-lime)' }}>@theBuilder_base</a></div>
              <div>Community: <a href="https://link3.to/builderbase" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-lime)' }}>link3.to/builderbase</a></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
