import React from 'react';
import { Gem, ArrowUpRight, ArrowDownLeft, Shield, Landmark } from 'lucide-react';

const ledger = [
  { id: 1, type: "out", amount: "0.85 ETH", desc: "MetaMask Community Builder Night Delhi #2 event expenses payout", recipient: "0x3216...2168", date: "May 29, 2026" },
  { id: 2, type: "out", amount: "1.00 ETH", desc: "QuantCraft Hackathon 1st prize release", recipient: "0x5555...5555", date: "May 26, 2026" },
  { id: 3, type: "out", amount: "0.50 ETH", desc: "Propulsion Labs creator spotlight payouts", recipient: "0x8888...8888", date: "May 18, 2026" },
  { id: 4, type: "in", amount: "10.00 ETH", desc: "Deposit from Arbitrum Foundation developer growth grant", recipient: "Treasury", date: "May 12, 2026" },
  { id: 5, type: "out", amount: "0.40 ETH", desc: "Escrow lock: Build zkProof verifier smart contract bounty", recipient: "Bounty Escrow", date: "May 10, 2026" }
];

const TreasuryTab = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      
      {/* Overview stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '25px' }}>
        
        {/* Total balance */}
        <div className="glass-panel" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <div style={{ display: 'flex', background: 'rgba(136, 78, 79, 0.08)', padding: '12px', borderRadius: '10px', color: 'var(--accent-lime)' }}>
            <Landmark size={24} />
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-dim)', letterSpacing: '0.5px' }}>
              Total Treasury Pool
            </span>
            <strong style={{ fontSize: '1.4rem', color: 'var(--text-light)' }}>24.50 ETH</strong>
            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '2px', opacity: 0.8 }}>
              ~$85,400 USD equivalent
            </span>
          </div>
        </div>

        {/* Allocated */}
        <div className="glass-panel" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <div style={{ display: 'flex', background: 'rgba(48, 98, 140, 0.08)', padding: '12px', borderRadius: '10px', color: 'var(--accent-sky)' }}>
            <Shield size={24} />
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-dim)', letterSpacing: '0.5px' }}>
              Allocated Escrow
            </span>
            <strong style={{ fontSize: '1.4rem', color: 'var(--text-light)' }}>8.20 ETH</strong>
            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '2px', opacity: 0.8 }}>
              Locked in active developer gig escrows
            </span>
          </div>
        </div>

        {/* Disbursed */}
        <div className="glass-panel" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <div style={{ display: 'flex', background: 'rgba(136, 78, 79, 0.08)', padding: '12px', borderRadius: '10px', color: 'var(--accent-lime)' }}>
            <Gem size={24} />
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-dim)', letterSpacing: '0.5px' }}>
              Disbursed Grants
            </span>
            <strong style={{ fontSize: '1.4rem', color: 'var(--text-light)' }}>14.30 ETH</strong>
            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '2px', opacity: 0.8 }}>
              Paid to builders and campus nodes since May 2025
            </span>
          </div>
        </div>

      </div>

      {/* Asset Distribution */}
      <div className="glass-panel">
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '20px', letterSpacing: '0.5px', color: 'var(--text-light)' }}>ASSETS IN POOL</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '25px' }}>
          <div style={{ background: 'rgba(0,0,0,0.02)', padding: '16px 24px', borderRadius: '10px', border: '1px solid var(--void-border-glass)', flex: '1 1 150px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>ETH (Native)</span>
            <strong style={{ fontSize: '1.2rem', color: 'var(--accent-lime)' }}>24.50 ETH</strong>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.02)', padding: '16px 24px', borderRadius: '10px', border: '1px solid var(--void-border-glass)', flex: '1 1 150px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>USDC (Base Sepolia)</span>
            <strong style={{ fontSize: '1.2rem', color: 'var(--accent-sky)' }}>15,000 USDC</strong>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.02)', padding: '16px 24px', borderRadius: '10px', border: '1px solid var(--void-border-glass)', flex: '1 1 150px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>ARB (Arbitrum Sepolia)</span>
            <strong style={{ fontSize: '1.2rem', color: 'var(--text-light)' }}>5,000 ARB</strong>
          </div>
        </div>
      </div>

      {/* Transaction log */}
      <div className="glass-panel" style={{ fontFamily: 'Space Mono, monospace' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '20px', color: 'var(--text-light)', borderBottom: '1px solid var(--void-border-glass)', paddingBottom: '10px' }}>
          RECENT TREASURY TRANSACTION LEDGER
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '0.78rem' }}>
          {ledger.map(item => (
            <div 
              key={item.id} 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start', 
                borderBottom: '1px solid var(--void-border-glass)', 
                paddingBottom: '12px',
                flexWrap: 'wrap',
                gap: '10px'
              }}
            >
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div 
                  style={{ 
                    display: 'flex', 
                    background: item.type === 'in' ? 'rgba(136, 78, 79, 0.08)' : 'rgba(255, 68, 68, 0.08)', 
                    padding: '8px', 
                    borderRadius: '50%', 
                    color: item.type === 'in' ? 'var(--accent-lime)' : '#ff4444' 
                  }}
                >
                  {item.type === 'in' ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
                </div>
                <div>
                  <strong style={{ color: 'var(--text-light)', display: 'block', fontSize: '0.85rem' }}>{item.desc}</strong>
                  <span style={{ color: 'var(--text-dim)', fontSize: '0.7rem' }}>
                    Recipient/Agent: {item.recipient} · {item.date}
                  </span>
                </div>
              </div>
              
              <strong style={{ fontSize: '0.9rem', color: item.type === 'in' ? 'var(--accent-lime)' : '#ff4444' }}>
                {item.type === 'in' ? '+' : '-'}{item.amount}
              </strong>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default TreasuryTab;
