import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const numbers = [
  { value: "3500+", suffix: "+", label: "Active Builders", sub: "across India" },
  { value: "10+", suffix: "+", label: "Cities", sub: "Delhi · Mumbai · Bengaluru · more" },
  { value: "1500+", suffix: "+", label: "Hackathon Registrations", sub: "QuantCraft 2026 alone" },
  { value: "8+", suffix: "+", label: "Ecosystem Partners", sub: "MetaMask · ETH Foundation · more" },
  { value: "50+", suffix: "+", label: "Events Organized", sub: "since May 2025" }
];

const Avatars = () => {
  useEffect(() => {
    numbers.forEach((item, i) => {
      const numericValue = parseInt(item.value.replace(/[^0-9]/g, ''), 10);
      gsap.fromTo(`.stat-counter-${i}`,
        { innerText: 0 },
        {
          innerText: numericValue,
          duration: 2,
          ease: "power2.out",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: `.stat-counter-${i}`,
            start: "top 85%",
            once: true
          }
        }
      );
    });
  }, []);

  return (
    <section className="section avatars" style={{ background: '#8cbbea', padding: '100px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <div style={{ maxWidth: '1200px', width: '100%', textAlign: 'center' }}>
        <h2 className="section-title" style={{ color: '#1a1a1a', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, marginBottom: '20px', fontFamily: 'var(--font-display)' }}>
          BY THE NUMBERS
        </h2>
        <p style={{ color: 'rgba(0,0,0,0.7)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 50px auto', lineHeight: 1.6 }}>
          Zero fluff. High signal. Here is how Builder Base stacks up.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', justifyContent: 'center' }}>
          {numbers.map((item, i) => (
            <div 
              key={i} 
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(8px)',
                padding: '30px 20px',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', fontFamily: 'var(--font-display)' }}>
                <span 
                  className={`stat-counter-${i}`} 
                  style={{ 
                    fontSize: 'clamp(3rem, 6vw, 5.5rem)', 
                    color: '#0a3a6b', 
                    fontWeight: 900, 
                    letterSpacing: '-2px'
                  }}
                >
                  0
                </span>
                <span style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#0a3a6b', fontWeight: 900 }}>
                  {item.suffix}
                </span>
              </div>
              <span style={{ fontSize: '1.05rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#1a1a1a', fontWeight: 800 }}>
                {item.label}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'rgba(0,0,0,0.6)', letterSpacing: '0.5px' }}>
                {item.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Avatars;
