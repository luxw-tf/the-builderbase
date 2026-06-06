import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext.jsx';
import { Vote, CheckCircle2, AlertTriangle, Play, HelpCircle } from 'lucide-react';

const initialProposals = [
  {
    id: "BIP-001",
    title: "Launch Propulsion Labs Season 2",
    status: "active",
    description: "Proposal to allocate 2 ETH from treasury for 10 creator grants under Propulsion Labs Season 2. Covers content creation, IRL event coverage, and ecosystem spotlight posts.",
    votesFor: 847,
    votesAgainst: 123,
    votesAbstain: 34,
    endsAt: "June 28, 2026",
    proposer: "0x3216832168321683216832168321683216832168",
    voted: null
  },
  {
    id: "BIP-002",
    title: "Ratify MetaMask CBN Delhi as Official Partnership",
    status: "passed",
    description: "Formalize the MetaMask Community Builder Night as a recurring quarterly event partnership with Consensys.",
    votesFor: 1203,
    votesAgainst: 89,
    votesAbstain: 67,
    endsAt: "June 10, 2026",
    proposer: "0x8888888888888888888888888888888888888888",
    voted: "for"
  }
];

const GovernanceTab = ({ addLog }) => {
  const { account, isConnected } = useWallet();
  const [proposals, setProposals] = useState(initialProposals);

  const handleVote = (proposalId, voteType) => {
    if (!isConnected) {
      if (addLog) addLog("Auth required: connect wallet to vote", "warning");
      return;
    }

    setProposals(prev => prev.map(p => {
      if (p.id === proposalId && p.status === 'active' && !p.voted) {
        if (addLog) {
          addLog(`Signed voting transaction for ${p.id}. Choice: ${voteType.toUpperCase()}`, "success");
          addLog(`[Base Sepolia Paymaster] sponsored signature log verified.`, "info");
        }
        
        return {
          ...p,
          voted: voteType,
          votesFor: voteType === 'for' ? p.votesFor + 100 : p.votesFor,
          votesAgainst: voteType === 'against' ? p.votesAgainst + 100 : p.votesAgainst,
          votesAbstain: voteType === 'abstain' ? p.votesAbstain + 100 : p.votesAbstain
        };
      }
      return p;
    }));
  };

  const getVotePercentages = (p) => {
    const total = p.votesFor + p.votesAgainst + p.votesAbstain;
    if (total === 0) return { for: 0, against: 0, abstain: 0 };
    return {
      for: Math.round((p.votesFor / total) * 100),
      against: Math.round((p.votesAgainst / total) * 100),
      abstain: Math.round((p.votesAbstain / total) * 100)
    };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      
      {/* Governance intro */}
      <div className="glass-panel" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <div style={{ display: 'flex', background: 'rgba(136, 78, 79, 0.08)', padding: '16px', borderRadius: '50%', color: 'var(--accent-lime)' }}>
          <Vote size={28} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-light)' }}>DAO Governance Sync</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
            Builder Base uses on-chain voting signatures to ratify ecosystem partnerships and allocate treasury resources. Cast your vote securely. Gas is sponsored by the DAO Paymaster.
          </p>
        </div>
      </div>

      {/* Proposals Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
        {proposals.map(p => {
          const pct = getVotePercentages(p);
          return (
            <div 
              key={p.id} 
              className="glass-panel" 
              style={{ 
                borderLeft: p.status === 'active' ? '4px solid var(--accent-lime)' : '4px solid var(--void-border-glass)',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
              }}
            >
              
              {/* Proposal Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontFamily: 'Space Mono, monospace', background: 'rgba(0,0,0,0.04)', color: 'var(--text-light)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                    {p.id}
                  </span>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: 'var(--text-light)' }}>{p.title}</h4>
                </div>
                
                <span 
                  style={{ 
                    fontSize: '0.7rem', 
                    fontWeight: 700, 
                    padding: '4px 10px', 
                    borderRadius: '8px', 
                    textTransform: 'uppercase',
                    background: p.status === 'active' ? 'rgba(136, 78, 79, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                    color: p.status === 'active' ? 'var(--accent-lime)' : 'var(--text-dim)',
                    border: p.status === 'active' ? '1px solid rgba(136, 78, 79, 0.15)' : '1px solid var(--void-border-glass)'
                  }}
                >
                  {p.status}
                </span>
              </div>

              {/* Proposer */}
              <div style={{ fontSize: '0.75rem', fontFamily: 'Space Mono, monospace', color: 'var(--text-dim)' }}>
                Proposer: {p.proposer} · Ends at: {p.endsAt}
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', lineHeight: 1.6 }}>{p.description}</p>

              {/* Vote split ratio bars */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '8px', fontFamily: 'Space Mono, monospace' }}>
                  <span>For: {p.votesFor} ({pct.for}%)</span>
                  <span>Against: {p.votesAgainst} ({pct.against}%)</span>
                  <span>Abstain: {p.votesAbstain} ({pct.abstain}%)</span>
                </div>
                <div className="vote-bar" style={{ height: '8px', borderRadius: '4px', overflow: 'hidden', display: 'flex', background: 'rgba(0,0,0,0.05)' }}>
                  <div className="vote-bar-for" style={{ width: `${pct.for}%`, background: 'var(--accent-lime)' }} />
                  <div className="vote-bar-against" style={{ width: `${pct.against}%`, background: '#ff4444' }} />
                  <div className="vote-bar-abstain" style={{ width: `${pct.abstain}%`, background: 'rgba(0,0,0,0.15)' }} />
                </div>
              </div>

              {/* Voting buttons */}
              {p.status === 'active' ? (
                p.voted ? (
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', background: 'rgba(136,78,79,0.04)', padding: '12px', border: '1px solid rgba(136,78,79,0.15)', borderRadius: '10px', width: 'fit-content' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--accent-lime)' }} />
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontFamily: 'Space Mono, monospace' }}>
                      Vote successfully broadcasted choice: <strong>{p.voted.toUpperCase()}</strong>
                    </span>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button 
                      onClick={() => handleVote(p.id, 'for')} 
                      className="btn-primary" 
                      style={{ padding: '8px 20px', fontSize: '0.75rem' }}
                    >
                      Vote For
                    </button>
                    <button 
                      onClick={() => handleVote(p.id, 'against')} 
                      className="btn-secondary" 
                      style={{ padding: '8px 20px', fontSize: '0.75rem', borderColor: '#ff4444', color: '#ff4444', background: 'transparent' }}
                    >
                      Vote Against
                    </button>
                    <button 
                      onClick={() => handleVote(p.id, 'abstain')} 
                      className="btn-secondary" 
                      style={{ padding: '8px 20px', fontSize: '0.75rem', background: 'transparent' }}
                    >
                      Abstain
                    </button>
                  </div>
                )
              ) : (
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--accent-lime)' }} />
                  <span>Proposal passed and finalized. Votes locked.</span>
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};

export default GovernanceTab;
