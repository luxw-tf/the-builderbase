import React from 'react';
import Link from './Link.jsx';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

const upcomingEvents = [
  {
    id: 1,
    title: "MetaMask Community Builder Night Delhi #3",
    date: "June 21, 2026",
    type: "Builder Night",
    partner: "MetaMask / Consensys",
    location: "Delhi NCR",
    luma: "https://lu.ma/cbndelhijune",
    gradient: "linear-gradient(135deg, #f6851b 0%, #e17726 100%)" // MetaMask orange
  },
  {
    id: 2,
    title: "Builder Base × ETH India Ecosystem Session",
    date: "TBA · July 2026",
    type: "Workshop",
    partner: "Ethereum Foundation",
    location: "Delhi / Online",
    luma: "https://https://luma.com/Builderbase",
    gradient: "linear-gradient(135deg, #627eea 0%, #8b5cf6 100%)" // Ethereum purple-blue
  },
  {
    id: 3,
    title: "Monad Blitz V4 Delhi",
    date: "TBA · Q3 2026",
    type: "Hackathon",
    partner: "Monad",
    location: "Delhi NCR",
    luma: "https://https://luma.com/Builderbase",
    gradient: "linear-gradient(135deg, #836ef9 0%, #4f0ff7 100%)" // Monad violet
  }
];

const Tokenomics = () => {
  return (
    <section className="section upcoming-events-preview" style={{ background: '#8cbbea', padding: '100px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <div style={{ maxWidth: '1200px', width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 className="section-title" style={{ color: '#1a1a1a', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, marginBottom: '10px', fontFamily: 'var(--font-display)' }}>
          WHAT'S NEXT
        </h2>
        <p style={{ color: 'rgba(0,0,0,0.7)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 50px auto', lineHeight: 1.6 }}>
          Upcoming IRL & online hackathons, workshops, and builder nights across India.
        </p>

        {/* Event Preview Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', width: '100%', marginBottom: '50px' }}>
          {upcomingEvents.map(ev => (
            <div
              key={ev.id}
              style={{
                background: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                borderRadius: '20px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'left',
                minHeight: '340px',
                justifyContent: 'space-between',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.2)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.08)'; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.04)'; }}
            >
              {/* Card Top Banner */}
              <div style={{ height: '100px', background: ev.gradient, padding: '20px', display: 'flex', alignItems: 'flex-end', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)' }} />
                <span style={{ position: 'relative', zIndex: 2, background: 'rgba(0, 0, 0, 0.75)', color: 'var(--accent-lime)', border: '1px solid rgba(182,255,64,0.3)', fontSize: '0.7rem', fontWeight: 800, padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                  {ev.type}
                </span>
              </div>

              {/* Card Body */}
              <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', gap: '15px', flexGrow: 1, justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '8px', lineHeight: 1.4 }}>{ev.title}</h3>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(0,0,0,0.6)', display: 'block' }}>
                    Partner: {ev.partner}
                  </span>
                </div>

                <div style={{ borderTop: '1px solid rgba(0, 0, 0, 0.08)', paddingTop: '15px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', color: 'rgba(0,0,0,0.7)', marginBottom: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Calendar size={14} style={{ color: '#0a3a6b' }} />
                      <span>{ev.date}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <MapPin size={14} style={{ color: '#ff6b00' }} />
                      <span>{ev.location}</span>
                    </div>
                  </div>

                  <a
                    href={ev.luma}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      background: 'transparent',
                      border: '1px solid rgba(0, 0, 0, 0.15)',
                      color: '#1a1a1a',
                      padding: '10px',
                      borderRadius: '8px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      fontSize: '0.75rem',
                      letterSpacing: '0.5px',
                      textDecoration: 'none',
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    RSVP on Luma ↗
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Events Link */}
        <Link
          to="/events"
          style={{
            fontSize: '1rem',
            color: '#1a1a1a',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'gap 0.2s'
          }}
          onMouseOver={(e) => { e.currentTarget.style.gap = '14px'; }}
          onMouseOut={(e) => { e.currentTarget.style.gap = '8px'; }}
        >
          View All Events <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
};

export default Tokenomics;
