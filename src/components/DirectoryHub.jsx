import React, { useState, useEffect } from 'react';
import { useWallet } from '../context/WalletContext.jsx';
import { Web3Service } from '../services/web3Service.js';
import { Compass, ChevronUp, Plus, X, Globe, ExternalLink, ShieldAlert } from 'lucide-react';

const DirectoryHub = ({ addLog }) => {
  const { account } = useWallet();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Community Projects'); // Community Projects, Dev Tools, Grants
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [formName, setFormName] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formCategory, setFormCategory] = useState('Community Projects');
  const [formLink, setFormLink] = useState('');

  useEffect(() => {
    fetchDirectory();
  }, []);

  const fetchDirectory = async () => {
    setLoading(true);
    try {
      const data = await Web3Service.getDirectory();
      // Sort directory by upvotes (descending)
      const sorted = [...data].sort((a, b) => b.upvotes - a.upvotes);
      setItems(sorted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpvote = async (itemId) => {
    if (!account) return;

    try {
      const res = await Web3Service.upvoteDirectoryItem(itemId, account);
      const action = res.hasUpvoted ? 'Upvote cast' : 'Upvote retracted';
      addLog(`${action} for directory item #${itemId}. Total upvotes: ${res.upvotes}`, 'success');
      
      // Reload directory data
      fetchDirectory();
    } catch (err) {
      addLog(`Failed to cast vote: ${err.message}`, 'warning');
    }
  };

  const handleSubmitItem = async (e) => {
    e.preventDefault();
    if (!account) return;

    setSubmitting(true);
    addLog(`Registering new directory item "${formName}" onchain registry...`, 'info');
    
    try {
      const res = await Web3Service.addDirectoryItem(
        formName,
        formDesc,
        formCategory,
        formLink,
        account
      );
      
      addLog(`Ecosystem entry deployed! Hash: ${res.txHash.substring(0, 16)}...`, 'success');
      addLog(`Project "${formName}" added to the ${formCategory} registry list.`, 'success');

      // Reset
      setFormName('');
      setFormDesc('');
      setFormLink('');
      setIsModalOpen(false);

      // Reload
      fetchDirectory();
    } catch (err) {
      addLog(`Registration failed: ${err.message}`, 'warning');
    } finally {
      setSubmitting(false);
    }
  };

  // Filter items based on active sub-tab category
  const filteredItems = items.filter(item => item.category === activeTab);

  return (
    <div className="bounties-container">
      {/* Tab select and submission button row */}
      <div className="bounties-filters-row">
        <div className="directory-tabs">
          {['Community Projects', 'Dev Tools', 'Grants'].map(tab => (
            <button
              key={tab}
              className={`dir-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <button className="btn-create-event" onClick={() => setIsModalOpen(true)}>
          <Plus size={16} />
          Submit Project
        </button>
      </div>

      {/* Grid displays */}
      {loading ? (
        <div style={{ color: 'var(--text-dim)', textAlign: 'center', padding: '50px' }}>Syncing registry items...</div>
      ) : filteredItems.length === 0 ? (
        <div style={{ color: 'var(--text-dim)', textAlign: 'center', padding: '50px' }}>No items registered in this category. Be the first to submit!</div>
      ) : (
        <div className="directory-grid">
          {filteredItems.map(item => {
            const hasVoted = account && item.upvoters.includes(account.toLowerCase());
            return (
              <div key={item.id} className="glass-panel directory-card">
                <div className="directory-card-info">
                  <span className="directory-name">{item.name}</span>
                  <p className="directory-desc">{item.description}</p>
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="directory-link"
                  >
                    <ExternalLink size={12} />
                    Visit Project
                  </a>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '8px', fontFamily: 'monospace' }}>
                    Registered by: {item.creator.substring(0, 8)}...
                  </span>
                </div>

                <div className="upvote-container">
                  <button 
                    className={`btn-upvote ${hasVoted ? 'upvoted' : ''}`}
                    onClick={() => handleUpvote(item.id)}
                    title={hasVoted ? "Retract Vote" : "Upvote"}
                  >
                    <ChevronUp size={24} />
                  </button>
                  <span className="upvote-count">{item.upvotes}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SUBMIT PROJECT MODAL */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content">
            <div className="modal-header">
              <h3>Register Ecosystem Project</h3>
              <button className="btn-close-modal" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmitItem}>
              <div className="form-group">
                <label>Project / Resource Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Base Scanner Dashboard" 
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Brief Description</label>
                <textarea 
                  className="form-control" 
                  rows="3" 
                  placeholder="Describe the project, what it solves, and how users can interact..." 
                  maxLength="250"
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Registry Category</label>
                  <select 
                    className="form-control"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                  >
                    <option value="Community Projects">Community Projects // dApps</option>
                    <option value="Dev Tools">Dev Tools</option>
                    <option value="Grants">Grants</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Project URL</label>
                  <input 
                    type="url" 
                    className="form-control" 
                    placeholder="https://..." 
                    value={formLink}
                    onChange={(e) => setFormLink(e.target.value)}
                    required 
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={submitting}>
                  {submitting ? 'Registering...' : 'Register in DAO Registry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DirectoryHub;
