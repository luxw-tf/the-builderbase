import React from 'react';
import { Calendar, MapPin, Users, Award, ExternalLink } from 'lucide-react';

const hackathons = [
  {
    title: "QuantCraft Hackathon",
    date: "May 25–26, 2026",
    location: "University, Delhi NCR",
    registrations: "1,500+",
    participants: "200+ in-person",
    winnerProject: "PyVax (Python-to-EVM Transpiler)",
    winnerTeam: "Punit + MECH X4 Team",
    desc: "A 48-hour regional hack sprint co-organized with Team Nexido. Onboarded student developers into EVM, smart contracts, and gas optimization layers.",
    tierColor: "#6366f1"
  },
  {
    title: "Classified Hack",
    date: "Late 2025",
    location: "Online",
    registrations: "434",
    participants: "165 completed",
    winnerProject: "RxGraph RAG (Biomedical GraphRAG)",
    winnerTeam: "Punit Pal",
    desc: "An agentic developer hackathon onboarding students into the Synthesis.md agentic automation platform. Builders had 48 hours to deploy working autonomous LLM workflows.",
    tierColor: "#10b981"
  },
  {
    title: "Monad Blitz V3 Delhi",
    date: "March 28, 2026",
    location: "91Springboard Noida",
    registrations: "150+",
    participants: "80 in-person",
    winnerProject: "FlowMon (Visual Orchestration)",
    winnerTeam: "Builder Base Core Team (1st Runner-Up)",
    desc: "Local regional hackathon co-sponsored by Monad. The Builder Base hacker team built and successfully demonstrated visual multi-agent workflow controls on the high-throughput Monad network.",
    tierColor: "#836ef9"
  }
];

const HackathonsPage = () => {
  return (
    <div className="subpage-container" style={{ background: '#07070a', color: '#fff', minHeight: '100vh', padding: '120px 20px 80px 20px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '50px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontFamily: 'var(--font-display)', color: '#fff', letterSpacing: '2px', marginBottom: '20px' }}>HACKATHON ARCHIVE</h1>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)', maxWidth: '500px', margin: '0 auto', fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>
            Browse past developer hacks organized or dominated by Builder Base teams.
          </p>
        </div>

        {/* Hackathons list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {hackathons.map((h, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(18, 18, 22, 0.7)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '24px',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Color accent strip */}
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: h.tierColor }} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '6px' }}>{h.title}</h3>
                  <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', display: 'block' }}>
                    Co-organized / Hosted by Builder Base
                  </span>
                </div>
                
                {/* Stats */}
                <div style={{ display: 'flex', gap: '20px', fontSize: '0.85rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ display: 'block', color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>Registrations</span>
                    <strong style={{ color: 'var(--accent-lime)', fontSize: '1.1rem' }}>{h.registrations}</strong>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ display: 'block', color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>Turnout</span>
                    <strong style={{ color: '#00c8ff', fontSize: '1.1rem' }}>{h.participants}</strong>
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{h.desc}</p>

              {/* Meta information row */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={14} style={{ color: h.tierColor }} />
                  <span>{h.date}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={14} />
                  <span>{h.location}</span>
                </div>
              </div>

              {/* Award Winner Spotlight */}
              {h.winnerProject && (
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ display: 'flex', background: 'rgba(182, 255, 64, 0.08)', padding: '10px', borderRadius: '50%', color: 'var(--accent-lime)', flexShrink: 0 }}>
                    <Award size={20} />
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.5px' }}>
                      Featured Winner Project
                    </span>
                    <strong style={{ fontSize: '0.95rem', color: '#fff', display: 'block', margin: '2px 0' }}>
                      {h.winnerProject}
                    </strong>
                    <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                      Built by: {h.winnerTeam}
                    </span>
                  </div>
                </div>
              )}

            </div>
          ))}
        </div>

        {/* Co-organize Callout */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', marginTop: '30px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '50px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.4rem' }}>Host a Hackathon at Your Campus?</h3>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', maxWidth: '450px', lineHeight: 1.5 }}>
            We sponsor university hack sprints and bring major Web3 ecosystems to campus developers.
          </p>
          <a
            href="/apply"
            style={{
              background: 'transparent',
              border: '1px solid rgba(182,255,64,0.4)',
              color: 'var(--accent-lime)',
              padding: '10px 24px',
              borderRadius: '20px',
              fontWeight: 700,
              textTransform: 'uppercase',
              fontSize: '0.8rem',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(182, 255, 64, 0.05)'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            Apply to Organize
          </a>
        </div>

      </div>
    </div>
  );
};

export default HackathonsPage;
