import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    q: "What is Builder Base?",
    a: "Builder Base is India's largest Web3 + AI builder community. Founded in May 2025, we're 3,500+ builders across 10+ cities and multiple chapters. We organize hackathons, builder nights, workshops, and collab sessions with leading Web3 ecosystems."
  },
  {
    q: "How do I join?",
    a: "Join via https://link3.to/builderbase for community access. You can also attend any of our upcoming events — walk in, build something, you're one of us."
  },
  {
    q: "What is the DAO Portal?",
    a: "The DAO Portal is Builder Base's on-chain infrastructure layer. Connect your wallet to access the events calendar, bounty board (earn USD/ETH for completing gigs), ecosystem directory, and your on-chain builder profile. Currently running on Base Sepolia testnet."
  },
  {
    q: "What is Propulsion Labs?",
    a: "Propulsion Labs is Builder Base's creator and content program. The Visibility Track is free — we amplify your content across Builder Base channels. The Campaign Track is a paid partnership track where ecosystem partners sponsor your content. Apply at founder@builderbase.xyz."
  },
  {
    q: "How do I host an event with Builder Base?",
    a: "We co-host builder nights, hackathons, workshops, and community sessions with ecosystem partners across India. If you're an ecosystem/protocol team or a college club looking to co-organize, email founder@builderbase.xyz with your proposal."
  },
  {
    q: "Which ecosystems does Builder Base partner with?",
    a: "MetaMask/Consensys (anchor partner, event co-host), Ethereum Foundation (ESP grant), Arbitrum, Monad, BNB Chain, Shardeum, Avalanche, and Vara Network. We run dedicated events and hackathons with each ecosystem."
  }
];

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(null);

  const toggleFAQ = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="section faq" style={{ background: '#fdfaf6', padding: '100px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <h2 className="section-title" style={{ color: '#1a1a1a', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, textAlign: 'center', marginBottom: '10px', fontFamily: 'var(--font-display)' }}>
          FAQ
        </h2>
        <p style={{ color: 'rgba(0, 0, 0, 0.7)', fontSize: '1.1rem', textAlign: 'center', marginBottom: '50px', lineHeight: 1.6 }}>
          Everything you need to know about India's core developer base.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  borderLeft: isOpen ? '4px solid #71c000' : '4px solid transparent',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                  transition: 'all 0.3s ease'
                }}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    padding: '24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    color: '#1a1a1a',
                    textAlign: 'left'
                  }}
                >
                  <span style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontSize: 'clamp(1rem, 2vw, 1.3rem)', 
                    letterSpacing: '0.5px', 
                    fontWeight: 700 
                  }}>
                    {faq.q}
                  </span>
                  <span style={{ color: isOpen ? '#71c000' : 'rgba(0, 0, 0, 0.4)' }}>
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </span>
                </button>

                {/* Answer panel */}
                <div
                  style={{
                    maxHeight: isOpen ? '250px' : '0px',
                    overflow: 'hidden',
                    transition: 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    background: 'rgba(0, 0, 0, 0.02)'
                  }}
                >
                  <p 
                    style={{ 
                      padding: '0 24px 24px 24px', 
                      fontSize: '0.95rem', 
                      color: 'rgba(0, 0, 0, 0.7)', 
                      lineHeight: 1.6,
                      fontFamily: 'var(--font-body)'
                    }}
                  >
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
