import React, { useState, useEffect } from 'react';
import { useWallet } from '../context/WalletContext.jsx';
import { Web3Service } from '../services/web3Service.js';
import { Award, ShieldAlert, CheckCircle, ExternalLink, Send, ArrowRight, Plus, X, User } from 'lucide-react';

const BountyHub = ({ addLog }) => {
  const { account } = useWallet();
  const [bounties, setBounties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All'); // All, Open, InProgress, Submitted, Completed
  const [selectedBounty, setSelectedBounty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form states for new bounty
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formReward, setFormReward] = useState('0.1');
  const [formDifficulty, setFormDifficulty] = useState('Intermediate');
  const [formCategory, setFormCategory] = useState('Development');

  // Application/Submission form states
  const [pitchText, setPitchText] = useState('');
  const [submissionLink, setSubmissionLink] = useState('');

  useEffect(() => {
    fetchBounties();
  }, []);

  const fetchBounties = async () => {
    setLoading(true);
    try {
      const data = await Web3Service.getBounties();
      setBounties(data);
      // Synchronize drawer details if active
      if (selectedBounty) {
        const freshBounty = data.find(b => b.id === selectedBounty.id);
        setSelectedBounty(freshBounty);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBounty = async (e) => {
    e.preventDefault();
    if (!account) return;

    setSubmitting(true);
    addLog(`Deploying Gig Escrow contract: "${formTitle}"...`, 'info');
    addLog(`Escrow funding target: ${formReward} ETH. Initializing transaction...`, 'info');
    
    try {
      const res = await Web3Service.createBounty(
        formTitle,
        formDesc,
        formReward,
        formDifficulty,
        formCategory,
        'address(0)', // Native ETH
        account
      );
      
      addLog(`Escrow contract deployed on Base Sepolia! Hash: ${res.txHash.substring(0, 16)}...`, 'success');
      addLog(`Locked ${formReward} ETH in escrow. Bounty #${res.bounty.id} is now OPEN.`, 'success');
      
      // Reset form
      setFormTitle('');
      setFormDesc('');
      setFormReward('0.1');
      setIsModalOpen(false);
      
      // Reload lists
      fetchBounties();
    } catch (err) {
      addLog(`Contract deployment failed: ${err.message}`, 'warning');
    } finally {
      setSubmitting(false);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (!account || !selectedBounty) return;

    addLog(`Submitting applicant signature for Bounty #${selectedBounty.id}...`, 'info');
    try {
      const res = await Web3Service.applyForBounty(selectedBounty.id, pitchText, account);
      addLog(`Application successfully registered onchain! Tx: ${res.txHash.substring(0, 16)}...`, 'success');
      setPitchText('');
      fetchBounties();
    } catch (err) {
      addLog(`Application failed: ${err.message}`, 'warning');
    }
  };

  const handleAssign = async (hunterAddress) => {
    if (!account || !selectedBounty) return;

    addLog(`Assigning gig worker ${hunterAddress.substring(0, 8)}... to Bounty #${selectedBounty.id}...`, 'info');
    addLog(`Executing assignBounty smart contract transaction...`, 'info');
    try {
      const res = await Web3Service.assignBounty(selectedBounty.id, hunterAddress, account);
      addLog(`Bounty assigned onchain! Escrow status: IN PROGRESS. Tx: ${res.txHash.substring(0, 16)}...`, 'success');
      fetchBounties();
    } catch (err) {
      addLog(`Assignment failed: ${err.message}`, 'warning');
    }
  };

  const handleSubmitDeliverable = async (e) => {
    e.preventDefault();
    if (!account || !selectedBounty) return;

    addLog(`Submitting deliverables for Bounty #${selectedBounty.id}...`, 'info');
    try {
      const res = await Web3Service.submitWork(selectedBounty.id, submissionLink, account);
      addLog(`Deliverables registered. Escrow status: SUBMITTED. Review pending. Tx: ${res.txHash.substring(0, 16)}...`, 'success');
      setSubmissionLink('');
      fetchBounties();
    } catch (err) {
      addLog(`Submission failed: ${err.message}`, 'warning');
    }
  };

  const handleApproveBounty = async () => {
    if (!account || !selectedBounty) return;

    addLog(`Approving work deliverables for Bounty #${selectedBounty.id}...`, 'info');
    addLog(`Releasing ${selectedBounty.rewardAmount} ETH from Escrow contract to ${selectedBounty.hunter.substring(0, 8)}...`, 'info');
    try {
      const res = await Web3Service.approveSubmission(selectedBounty.id, account);
      addLog(`Escrow payout completed! Payout confirmed on Base Sepolia. Tx: ${res.txHash.substring(0, 16)}...`, 'success');
      fetchBounties();
    } catch (err) {
      addLog(`Payout approval failed: ${err.message}`, 'warning');
    }
  };

  const handleCancelBounty = async () => {
    if (!account || !selectedBounty) return;

    addLog(`Cancelling Bounty #${selectedBounty.id}...`, 'info');
    addLog(`Refunding locked ${selectedBounty.rewardAmount} ETH escrow to issuer ${selectedBounty.issuer.substring(0, 8)}...`, 'info');
    try {
      const res = await Web3Service.cancelBounty(selectedBounty.id, account);
      addLog(`Bounty cancelled. Escrow refund completed. Tx: ${res.txHash.substring(0, 16)}...`, 'success');
      fetchBounties();
    } catch (err) {
      addLog(`Cancellation failed: ${err.message}`, 'warning');
    }
  };

  // Filter logic
  const filteredBounties = bounties.filter(b => {
    if (statusFilter === 'All') return true;
    return b.status.toLowerCase() === statusFilter.toLowerCase();
  });

  const isIssuer = selectedBounty && account && selectedBounty.issuer.toLowerCase() === account.toLowerCase();
  const isHunter = selectedBounty && account && selectedBounty.hunter && selectedBounty.hunter.toLowerCase() === account.toLowerCase();
  const hasApplied = selectedBounty && account && selectedBounty.applicants.some(a => a.wallet.toLowerCase() === account.toLowerCase());

  return (
    <div className="bounties-container">
      {/* Filters & Actions row */}
      <div className="bounties-filters-row">
        <div className="filter-pills">
          {['All', 'Open', 'InProgress', 'Submitted', 'Completed'].map(status => (
            <button
              key={status}
              className={`filter-pill ${statusFilter === status ? 'active' : ''}`}
              onClick={() => setStatusFilter(status)}
            >
              {status === 'InProgress' ? 'In Progress' : status}
            </button>
          ))}
        </div>

        <button className="btn-create-event" onClick={() => setIsModalOpen(true)}>
          <Plus size={16} />
          Create Bounty
        </button>
      </div>

      {/* Grid of Bounties */}
      {loading ? (
        <div style={{ color: 'var(--text-dim)', textAlign: 'center', padding: '50px' }}>Loading escrow metrics...</div>
      ) : filteredBounties.length === 0 ? (
        <div style={{ color: 'var(--text-dim)', textAlign: 'center', padding: '50px' }}>No gigs found in this category.</div>
      ) : (
        <div className="bounties-grid">
          {filteredBounties.map(b => (
            <div key={b.id} className="glass-panel bounty-card">
              <div>
                <div className="bounty-badge-row">
                  <span className="reward-tag">
                    {b.rewardAmount} ETH
                  </span>
                  <span className={`bounty-status-tag ${b.status.toLowerCase()}`}>
                    {b.status === 'InProgress' ? 'In Progress' : b.status}
                  </span>
                </div>

                <h4 className="bounty-title">{b.title}</h4>
                <p className="bounty-description">{b.description.substring(0, 120)}...</p>
              </div>

              <div className="bounty-footer-stats">
                <div className="meta-pills-row">
                  <span className="meta-pill">{b.category}</span>
                  <span className="meta-pill">{b.difficulty}</span>
                </div>
                <button 
                  className="btn-bounty-action"
                  onClick={() => setSelectedBounty(b)}
                >
                  View Gig
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE BOUNTY MODAL */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content">
            <div className="modal-header">
              <h3>Deploy Gig Escrow</h3>
              <button className="btn-close-modal" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateBounty}>
              <div className="form-group">
                <label>Gig Title</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Build Solidity indexing subgraph" 
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Job Requirements & Deliverables</label>
                <textarea 
                  className="form-control" 
                  rows="4" 
                  placeholder="Clearly outline deliverable specs, testing requirements, and timelines..." 
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Reward Pool (ETH)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    className="form-control"
                    value={formReward}
                    onChange={(e) => setFormReward(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Difficulty</label>
                  <select 
                    className="form-control"
                    value={formDifficulty}
                    onChange={(e) => setFormDifficulty(e.target.value)}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Category</label>
                <select 
                  className="form-control"
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                >
                  <option value="Development">Development // Smart Contracts</option>
                  <option value="Design">Design // UI & UX</option>
                  <option value="Writing">Writing // Documentation</option>
                  <option value="Security">Security // Smart Contract Audits</option>
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={submitting}>
                  {submitting ? 'Locking escrow funds...' : 'Lock Funds & Deploy'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DETAIL DRAWER */}
      {selectedBounty && (
        <div className="drawer-overlay" onClick={() => setSelectedBounty(null)}>
          <div className="drawer-content" onClick={e => e.stopPropagation()}>
            <div className="drawer-header">
              <span className={`bounty-status-tag ${selectedBounty.status.toLowerCase()}`}>
                {selectedBounty.status === 'InProgress' ? 'In Progress' : selectedBounty.status}
              </span>
              <button className="drawer-close" onClick={() => setSelectedBounty(null)}>
                <X size={24} />
              </button>
            </div>

            <h3 style={{ fontSize: '1.6rem', fontWeight: 800 }}>{selectedBounty.title}</h3>

            <div className="bounty-details-grid">
              <div className="bounty-meta-grid">
                <div>
                  <span className="stat-label">Reward locked</span>
                  <span className="stat-value" style={{ color: 'var(--accent-lime)', fontSize: '1.3rem', display: 'block', textShadow: 'var(--glow-lime)' }}>{selectedBounty.rewardAmount} ETH</span>
                </div>
                <div>
                  <span className="stat-label">Category</span>
                  <span className="stat-value" style={{ display: 'block' }}>{selectedBounty.category}</span>
                </div>
                <div>
                  <span className="stat-label">Difficulty</span>
                  <span className="stat-value" style={{ display: 'block' }}>{selectedBounty.difficulty}</span>
                </div>
                <div>
                  <span className="stat-label">Escrow Contract</span>
                  <span className="stat-value" style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'monospace' }}>BaseSepolia // {selectedBounty.tokenAddress}</span>
                </div>
              </div>

              <div>
                <h5 className="stat-label" style={{ marginBottom: '6px' }}>Escrow Issuer</h5>
                <span className="stat-value" style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{selectedBounty.issuer}</span>
              </div>

              {selectedBounty.hunter && (
                <div>
                  <h5 className="stat-label" style={{ marginBottom: '6px' }}>Assigned Hunter</h5>
                  <span className="stat-value" style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--accent-lime)' }}>{selectedBounty.hunter}</span>
                </div>
              )}

              <div>
                <h5 className="stat-label" style={{ marginBottom: '6px' }}>Gig Description</h5>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.6 }}>{selectedBounty.description}</p>
              </div>

              {/* DYNAMIC FORMS BASED ON WALLET / BOUNTY RELATION */}

              {/* 1. APPLY (Non-issuer, status Open, hasn't applied) */}
              {!isIssuer && selectedBounty.status === 'Open' && !hasApplied && (
                <form onSubmit={handleApply} style={{ marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px' }}>Apply for this Gig</h4>
                  <div className="form-group">
                    <label>Application Pitch</label>
                    <textarea 
                      className="form-control"
                      rows="3"
                      placeholder="Outline your background, relevant works, and estimated completion time..."
                      value={pitchText}
                      onChange={e => setPitchText(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Send size={14} /> Submit Pitch
                  </button>
                </form>
              )}

              {/* Has applied notice */}
              {!isIssuer && selectedBounty.status === 'Open' && hasApplied && (
                <div className="glass-panel" style={{ background: 'rgba(182, 255, 64, 0.04)', display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <CheckCircle size={20} className="text-lime" />
                  <div style={{ fontSize: '0.85rem' }}>
                    <strong style={{ display: 'block', color: 'var(--text-light)' }}>Application Registered</strong>
                    <span style={{ color: 'var(--text-dim)' }}>You have pitched for this gig. Waiting for the issuer to assign.</span>
                  </div>
                </div>
              )}

              {/* 2. ASSIGN WORKER (Issuer, status Open) */}
              {isIssuer && selectedBounty.status === 'Open' && (
                <div style={{ marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Applicants ({selectedBounty.applicants.length})</h4>
                    <button onClick={handleCancelBounty} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem', borderColor: '#ff6347', color: '#ff6347', background: 'transparent' }}>
                      Cancel Escrow
                    </button>
                  </div>
                  
                  {selectedBounty.applicants.length === 0 ? (
                    <div style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Waiting for applicants to pitch...</div>
                  ) : (
                    <div className="applicant-list">
                      {selectedBounty.applicants.map((app, idx) => (
                        <div key={idx} className="applicant-card">
                          <div className="applicant-wallet">
                            <span>{app.wallet.substring(0, 10)}...{app.wallet.substring(app.wallet.length - 8)}</span>
                            <button className="btn-assign-hunter" onClick={() => handleAssign(app.wallet)}>Assign Builder</button>
                          </div>
                          <p className="applicant-pitch">"{app.pitch}"</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* 3. SUBMIT DELIVERABLES (Hunter, status InProgress) */}
              {isHunter && selectedBounty.status === 'InProgress' && (
                <form onSubmit={handleSubmitDeliverable} style={{ marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px' }}>Submit Completed Deliverables</h4>
                  <div className="form-group">
                    <label>Github Pull Request or Deliverable Link</label>
                    <input 
                      type="url"
                      className="form-control"
                      placeholder="https://github.com/..."
                      value={submissionLink}
                      onChange={e => setSubmissionLink(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ArrowRight size={14} /> Submit Work
                  </button>
                </form>
              )}

              {/* Submitted status, waiting for review */}
              {isHunter && selectedBounty.status === 'Submitted' && (
                <div className="glass-panel" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <CheckCircle size={20} className="text-lime" />
                  <div style={{ fontSize: '0.85rem' }}>
                    <strong style={{ display: 'block', color: 'var(--text-light)' }}>Work Submitted</strong>
                    <span style={{ color: 'var(--text-dim)' }}>Deliverable link: <a href={selectedBounty.submissionLink} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-lime)' }}>{selectedBounty.submissionLink}</a>. Waiting for issuer to release funds.</span>
                  </div>
                </div>
              )}

              {/* 4. APPROVE WORK & RELEASE ESCROW (Issuer, status Submitted) */}
              {isIssuer && selectedBounty.status === 'Submitted' && (
                <div className="glass-panel" style={{ border: '1px solid rgba(182,255,64,0.4)', marginTop: '20px' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>Review Submission</h4>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '15px' }}>
                    The hunter has submitted the work. Review deliverables here:
                    <a href={selectedBounty.submissionLink} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-lime)', marginTop: '6px', fontSize: '0.9rem', fontWeight: 700 }}>
                      <ExternalLink size={14} /> View Deliverables
                    </a>
                  </div>
                  <button onClick={handleApproveBounty} className="btn-primary" style={{ width: '100%' }}>
                    Approve & Release {selectedBounty.rewardAmount} ETH Payout
                  </button>
                </div>
              )}

              {/* Completed status banner */}
              {selectedBounty.status === 'Completed' && (
                <div className="glass-panel" style={{ background: 'rgba(57, 255, 20, 0.04)', border: '1px solid rgba(57, 255, 20, 0.2)', display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <CheckCircle size={20} style={{ color: '#39ff14' }} />
                  <div style={{ fontSize: '0.85rem' }}>
                    <strong style={{ display: 'block', color: 'var(--text-light)' }}>Escrow Payout Complete</strong>
                    <span style={{ color: 'var(--text-dim)' }}>
                      Completed work verified by issuer. Payout of {selectedBounty.rewardAmount} ETH sent to hunter: <span style={{ fontFamily: 'monospace' }}>{selectedBounty.hunter.substring(0, 10)}...</span>.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BountyHub;
