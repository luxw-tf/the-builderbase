import React from 'react';
import { useWallet } from '../context/WalletContext.jsx';
import { User, Shield, CheckCircle, Calendar, Award, ArrowRight, Terminal } from 'lucide-react';

const DashboardTab = ({ member, setActiveTab, onEditProfile }) => {
  const { account, isConnected, connectWallet, isConnecting } = useWallet();

  const getProfileData = () => {
    if (!member) return {};
    try {
      return JSON.parse(member.profileIpfsHash || '{}');
    } catch (e) {
      console.error(e);
      return {};
    }
  };

  const p = getProfileData();

  // Simulated metrics
  const gigsCompleted = p.username === 'its_punit05' ? 4 : (p.username ? 2 : 0);
  const eventsAttended = p.username === 'its_punit05' ? 3 : (p.username ? 1 : 0);
  const reputation = Math.min((gigsCompleted * 15) + (eventsAttended * 10), 100);

  // Pixel Reputation progress bar rendering
  const renderReputationProgress = (val) => {
    const barsCount = 10;
    const filledBars = Math.round((val / 100) * barsCount);
    return (
      <div style={{ display: 'flex', gap: '3px', marginTop: '10px' }}>
        {Array.from({ length: barsCount }).map((_, i) => (
          <div
            key={i}
            style={{
              width: '18px',
              height: '18px',
              background: i < filledBars ? 'var(--accent-sky)' : 'rgba(0,0,0,0.04)',
              border: i < filledBars ? '1px solid var(--accent-sky)' : '1px solid rgba(0,0,0,0.1)',
              boxShadow: i < filledBars ? '0 0 8px rgba(48,98,140,0.2)' : 'none'
            }}
          />
        ))}
        <span style={{ marginLeft: '12px', fontSize: '0.95rem', fontFamily: 'monospace', fontWeight: 'bold', color: 'var(--accent-sky)' }}>
          {val}/100 RP
        </span>
      </div>
    );
  };

  if (!isConnected) {
    return (
      <div 
        className="glass-panel" 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: '60px 40px', 
          textAlign: 'center',
          border: '1px solid rgba(48, 98, 140, 0.15)',
          background: '#ffffff',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.03)',
          minHeight: '400px'
        }}
      >
        <div style={{ display: 'flex', background: 'rgba(48, 98, 140, 0.08)', padding: '24px', borderRadius: '50%', color: 'var(--accent-sky)', marginBottom: '24px' }}>
          <Terminal size={48} />
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '1px', marginBottom: '10px', color: '#1a1a1a', fontFamily: 'Space Mono, monospace' }}>
          AUTHENTICATE TO ENTER BASE
        </h2>
        <p style={{ fontSize: '0.95rem', color: 'rgba(0,0,0,0.65)', maxWidth: '460px', lineHeight: 1.6, marginBottom: '30px' }}>
          Connect your Web3 wallet to verify signatures, access developer gigs, list events, and claim reputation credentials on Base Sepolia.
        </p>

        <button 
          onClick={connectWallet}
          disabled={isConnecting}
          style={{
            background: 'transparent',
            border: '1px solid var(--accent-sky)',
            color: 'var(--accent-sky)',
            padding: '14px 30px',
            borderRadius: '4px',
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.85rem',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(48,98,140,0.06)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(48, 98, 140, 0.15)'; }}
          onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          {isConnecting ? "> loading_provider..." : "> connect_wallet --provider=privy"}
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      
      {/* Welcome & Profile Details */}
      <div 
        className="glass-panel" 
        style={{ 
          padding: '35px', 
          background: 'linear-gradient(135deg, rgba(255, 181, 181, 0.15) 0%, transparent 100%)',
          border: '1px solid rgba(136, 78, 79, 0.15)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div 
              style={{ 
                width: '64px', 
                height: '64px', 
                borderRadius: '12px', 
                background: 'linear-gradient(135deg, var(--accent-lime-light), var(--accent-sky-light))', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '1.6rem', 
                fontWeight: 900, 
                color: '#000' 
              }}
            >
              {p.username ? p.username.substring(0, 2).toUpperCase() : 'BB'}
            </div>
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#1a1a1a', margin: 0 }}>
                WELCOME BACK, {p.displayName || 'ANONYMOUS BUILDER'}
              </h2>
              <p style={{ fontSize: '0.88rem', color: 'rgba(0,0,0,0.6)', marginTop: '4px' }}>
                @{p.username || 'unsigned'} · {p.profession || 'Solidity Dev'} · <span style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{account.substring(0, 6)}...{account.substring(account.length - 4)}</span>
              </p>
            </div>
          </div>
          <button 
            className="btn-bounty-action" 
            onClick={onEditProfile}
            style={{ fontSize: '0.8rem', padding: '8px 20px', color: '#1a1a1a', border: '1px solid rgba(0,0,0,0.15)' }}
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
        
        {/* Reputation Card */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(0,0,0,0.5)' }}>
            On-Chain Reputation
          </span>
          <span style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent-sky)' }}>
            LEVEL {reputation >= 75 ? 3 : (reputation >= 40 ? 2 : 1)}
          </span>
          {renderReputationProgress(reputation)}
        </div>

        {/* Gigs stats */}
        <div className="glass-panel" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ display: 'flex', background: 'rgba(48, 98, 140, 0.08)', padding: '16px', borderRadius: '12px', color: 'var(--accent-sky)' }}>
            <Award size={28} />
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'rgba(0,0,0,0.5)', letterSpacing: '1px' }}>
              Escrow Gigs Completed
            </span>
            <strong style={{ fontSize: '2.2rem', fontWeight: 900, color: '#1a1a1a' }}>{gigsCompleted}</strong>
          </div>
        </div>

        {/* Events stats */}
        <div className="glass-panel" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ display: 'flex', background: 'rgba(136, 78, 79, 0.08)', padding: '16px', borderRadius: '12px', color: 'var(--accent-lime)' }}>
            <Calendar size={28} />
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'rgba(0,0,0,0.5)', letterSpacing: '1px' }}>
              IRL Events Attended
            </span>
            <strong style={{ fontSize: '2.2rem', fontWeight: 900, color: '#1a1a1a' }}>{eventsAttended}</strong>
          </div>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="glass-panel">
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '20px', letterSpacing: '0.5px', color: '#1a1a1a' }}>QUICK ACTIONS</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
          <button 
            onClick={() => setActiveTab('events')} 
            className="btn-primary" 
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '0.8rem', background: 'var(--accent-lime-light)', color: '#1a1a1a', border: '1px solid rgba(0,0,0,0.08)', fontWeight: 'bold' }}
          >
            Browse Calendar <ArrowRight size={14} />
          </button>
          <button 
            onClick={() => setActiveTab('bounties')} 
            className="btn-bounty-action" 
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '0.8rem', color: '#1a1a1a', border: '1px solid rgba(0,0,0,0.15)' }}
          >
            Find a Developer Gig <ArrowRight size={14} />
          </button>
          <button 
            onClick={() => setActiveTab('directory')} 
            className="btn-bounty-action" 
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '0.8rem', color: '#1a1a1a', border: '1px solid rgba(0,0,0,0.15)' }}
          >
            Explore Partner Directory <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="glass-panel" style={{ fontFamily: 'Space Mono, monospace' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '20px', color: 'rgba(0,0,0,0.7)', borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: '10px' }}>
          LATEST COMMUNITY ACTIVITY FEED
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '0.8rem' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <span style={{ color: 'var(--accent-lime)' }}>•</span>
            <div style={{ color: '#1a1a1a' }}>
              <strong>MetaMask Community Builder Night Delhi #3</strong>: 47 builders RSVPed for June 21 session.
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <span style={{ color: 'var(--accent-sky)' }}>•</span>
            <div style={{ color: '#1a1a1a' }}>
              <strong>New Escrow Bounty</strong>: Build zkProof verifier smart contract · <span style={{ color: 'var(--accent-lime)', fontWeight: 'bold' }}>0.4 ETH locked</span> in escrow.
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <span style={{ color: 'var(--accent-lime)' }}>•</span>
            <div style={{ color: '#1a1a1a' }}>
              <strong>Escrow Release</strong>: Punit approved escrow payout for Escrow Bounty #2 work submission.
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <span style={{ color: 'rgba(0,0,0,0.3)' }}>•</span>
            <div style={{ color: '#1a1a1a' }}>
              <strong>Registry Sync</strong>: Shashi Dev registered project <strong>FlowMon</strong> to community directory.
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default DashboardTab;
