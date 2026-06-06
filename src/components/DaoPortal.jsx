import React, { useState, useEffect } from 'react';
import { useWallet } from '../context/WalletContext.jsx';
import CalendarHub from './CalendarHub.jsx';
import BountyHub from './BountyHub.jsx';
import DirectoryHub from './DirectoryHub.jsx';
import DashboardTab from './DashboardTab.jsx';
import GovernanceTab from './GovernanceTab.jsx';
import TreasuryTab from './TreasuryTab.jsx';
import PortalBackground from './PortalBackground.jsx';
import { Web3Service } from '../services/web3Service.js';
import { LayoutDashboard, Calendar, Award, Compass, Vote, Gem, Terminal, Wallet, User, X, LogOut, ChevronRight, ChevronLeft } from 'lucide-react';
import '../styles/Web3Hub.css';

const DaoPortal = ({ onClose, initialTab = 'home' }) => {
  const { account, isConnected, isConnecting, connectWallet, disconnectWallet } = useWallet();
  const [activeTab, setActiveTab] = useState(initialTab); // home, events, bounties, directory, governance, treasury
  const [txLogs, setTxLogs] = useState([]);
  const [blockNumber, setBlockNumber] = useState(12456231);
  const [terminalCollapsed, setTerminalCollapsed] = useState(false);

  // Member registry & profile configuration states
  const [member, setMember] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  
  // Unified Profile Fields
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');
  const [profession, setProfession] = useState('');
  const [country, setCountry] = useState('');
  const [skills, setSkills] = useState('');
  
  const [savingProfile, setSavingProfile] = useState(false);

  // Sync prop changes (e.g. browser back/forward) to active tab state
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Sync activeTab changes to pathname if on DAO subdomain
  useEffect(() => {
    const isDao = window.location.hostname.startsWith('dao.') || 
                  new URLSearchParams(window.location.search).get('subdomain') === 'dao' || 
                  new URLSearchParams(window.location.search).get('dao') === 'true';
                  
    if (isDao) {
      const pathMap = {
        home: '/',
        events: '/events',
        bounties: '/bounties',
        directory: '/directory',
        governance: '/governance',
        treasury: '/treasury'
      };
      
      const newPath = pathMap[activeTab] || '/';
      if (window.location.pathname !== newPath) {
        window.history.pushState({}, '', newPath);
      }
    }
  }, [activeTab]);

  // Block counter simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setBlockNumber(prev => prev + Math.floor(Math.random() * 3 + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Log transaction events in the simulation terminal
  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setTxLogs(prev => [{ time: timestamp, text: message, type }, ...prev].slice(0, 15));
  };

  useEffect(() => {
    if (isConnected && account) {
      addLog(`Wallet connected: ${account.substring(0, 6)}...${account.substring(account.length - 4)}`, 'success');
      addLog('Contract verification complete: Base Sepolia node connected.', 'info');
      verifyAndRegisterMember();
    } else {
      addLog('Wallet disconnected. Waiting for connection...', 'warning');
      setMember(null);
    }
  }, [isConnected, account]);

  // Read member data and split IPFS metadata fields
  useEffect(() => {
    if (member) {
      try {
        const data = JSON.parse(member.profileIpfsHash || '{}');
        setDisplayName(data.displayName || '');
        setUsername(data.username || '');
        setBio(data.bio || '');
        setWebsite(data.website || '');
        setLocation(data.location || '');
        setProfession(data.profession || '');
        setCountry(data.country || '');
        setSkills(data.skills || '');
      } catch (e) {
        console.error("Error parsing profile metadata json:", e);
      }
    }
  }, [member]);

  const verifyAndRegisterMember = async () => {
    setIsRegistering(true);
    addLog(`Checking Builder Base DAO registration status for ${account.substring(0, 8)}...`, 'info');
    try {
      let currentMember = await Web3Service.getMember(account);
      if (!currentMember) {
        addLog(`Wallet not registered. Initiating sponsored membership transaction...`, 'info');
        addLog(`[Base Sepolia Paymaster] Gas sponsorship approved. Signing delegation...`, 'info');
        const res = await Web3Service.registerMember(account);
        currentMember = res.member;
        addLog(`Onchain registration confirmed! Tx Hash: ${res.txHash.substring(0, 16)}...`, 'success');
        addLog(`Welcome to Builder Base DAO! Identity established onchain.`, 'success');
      } else {
        addLog(`Onchain member verified. Welcome back!`, 'success');
      }
      setMember(currentMember);
    } catch (err) {
      addLog(`Registration failed: ${err.message}`, 'warning');
    } finally {
      setIsRegistering(false);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!account) return;

    setSavingProfile(true);
    addLog(`Initiating profile update transaction...`, 'info');
    addLog(`[Base Sepolia Paymaster] Gas fee sponsored. Sending payload...`, 'info');

    const profileDataPayload = {
      displayName,
      username,
      bio,
      website,
      location,
      profession,
      country,
      skills
    };

    try {
      const res = await Web3Service.updateProfile(account, profileDataPayload);
      setMember(res.member);
      addLog(`DAO Profile updated onchain! Tx Hash: ${res.txHash.substring(0, 16)}...`, 'success');
      setIsProfileModalOpen(false);
    } catch (err) {
      addLog(`Failed to update profile: ${err.message}`, 'warning');
    } finally {
      setSavingProfile(false);
    }
  };

  // Helper check to see if profile has actual details configured
  const hasProfileSet = () => {
    if (!member) return false;
    try {
      const data = JSON.parse(member.profileIpfsHash || '{}');
      return !!(data.username || data.displayName);
    } catch (e) {
      return false;
    }
  };

  // Returns verified brand-based header name
  const getProfileBadgeText = () => {
    if (!member) return "Setup Profile";
    try {
      const data = JSON.parse(member.profileIpfsHash || '{}');
      if (data.username) {
        return `@${data.username.replace('@', '')}`;
      } else if (data.displayName) {
        return data.displayName;
      }
    } catch (e) {
      console.error(e);
    }
    return "Setup Profile";
  };

  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  const sidebarItems = [
    { id: 'home', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { id: 'events', icon: <Calendar size={20} />, label: 'Events' },
    { id: 'bounties', icon: <Award size={20} />, label: 'Bounty Hub' },
    { id: 'directory', icon: <Compass size={20} />, label: 'Ecosystem' },
    { id: 'governance', icon: <Vote size={20} />, label: 'Governance' },
    { id: 'treasury', icon: <Gem size={20} />, label: 'Treasury' }
  ];

  return (
    <div className="dao-portal-v2" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 100, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Background Particle Network & CRT Scanline Overlay */}
      <PortalBackground />
      <div className="portal-scanlines" />

      {/* Slim Top Status Bar */}
      <header className="portal-status-bar" style={{ position: 'relative', zIndex: 10 }}>
        <div className="psb-left">
          <span className="psb-logo">◈ BUILDER BASE DAO</span>
          <span className="psb-network">Base Sepolia</span>
          <span className="psb-block">
            <span className="psb-dot" />
            BLOCK: {blockNumber}
          </span>
        </div>
        <div className="psb-right">
          {isConnected && member && (
            <button className="psb-wallet connected" style={{ marginRight: '10px' }} onClick={() => setIsProfileModalOpen(true)}>
              <User size={12} style={{ color: hasProfileSet() ? 'var(--accent-lime)' : 'inherit' }} />
              {getProfileBadgeText()}
            </button>
          )}

          {isConnected ? (
            <button className="psb-wallet connected" onClick={disconnectWallet}>
              <span className="dot-connected" />
              {formatAddress(account)}
            </button>
          ) : (
            <button className="psb-wallet" onClick={connectWallet}>
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </button>
          )}
          <button className="psb-close" onClick={onClose}>✕ EXIT</button>
        </div>
      </header>

      {/* Main Panel Body */}
      <div className="portal-body" style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative', zIndex: 10 }}>
        
        {/* Left Sidebar Nav */}
        <aside className="portal-sidebar">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`sidebar-icon-btn ${activeTab === item.id ? 'active' : ''}`}
              data-label={item.label}
            >
              {item.icon}
            </button>
          ))}
        </aside>

        {/* Main Content Area */}
        <main className="portal-main" style={{ flex: 1, overflowY: 'auto', padding: '30px' }}>
          {isRegistering ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column', gap: '20px', textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', border: '3px solid rgba(182, 255, 64, 0.15)', borderTopColor: 'var(--accent-lime)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-light)' }}>Establishing Onchain Identity</h3>
              <p style={{ color: 'var(--text-dim)', maxWidth: '440px', fontSize: '0.9rem', lineHeight: 1.5 }}>
                Registering your wallet in the Builder Base DAO registry on Base Sepolia. 
                <span style={{ display: 'block', color: 'var(--accent-lime)', marginTop: '8px', fontWeight: 600 }}>Gas fee is fully sponsored by the DAO Paymaster</span>
              </p>
            </div>
          ) : (
            <>
              {/* Complete Profile Reminder Alert */}
              {isConnected && member && !hasProfileSet() && (
                <div className="glass-panel" style={{ border: '1px solid rgba(182, 255, 64, 0.3)', background: 'linear-gradient(135deg, rgba(182, 255, 64, 0.05) 0%, transparent 100%)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', padding: '20px 30px', flexWrap: 'wrap', gap: '15px' }}>
                  <div>
                    <h4 style={{ color: 'var(--text-light)', fontWeight: 800, fontSize: '1.1rem', marginBottom: '4px' }}>Complete Your Builder Social Identity</h4>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Setup your onchain builder profile details to unlock exclusive DAO hackathons, developer gigs, and grant payouts.</p>
                  </div>
                  <button className="btn-primary" onClick={() => setIsProfileModalOpen(true)} style={{ padding: '8px 20px', fontSize: '0.8rem' }}>
                    Setup Profile
                  </button>
                </div>
              )}

              {/* Render Selected Tab */}
              {activeTab === 'home' && <DashboardTab member={member} setActiveTab={setActiveTab} onEditProfile={() => setIsProfileModalOpen(true)} />}
              {activeTab === 'events' && <CalendarHub addLog={addLog} member={member} />}
              {activeTab === 'bounties' && <BountyHub addLog={addLog} />}
              {activeTab === 'directory' && <DirectoryHub addLog={addLog} />}
              {activeTab === 'governance' && <GovernanceTab addLog={addLog} />}
              {activeTab === 'treasury' && <TreasuryTab addLog={addLog} />}
            </>
          )}
        </main>

        {/* Live Monospace Terminal Panel (Right sidebar) */}
        <aside className={`portal-terminal ${terminalCollapsed ? 'collapsed' : ''}`} style={{ width: terminalCollapsed ? '48px' : '280px', transition: 'width 0.2s', display: 'flex', flexDirection: 'column' }}>
          <div className="terminal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px' }}>
            {!terminalCollapsed && <span>◈ Live Event Stream</span>}
            <button 
              onClick={() => setTerminalCollapsed(!terminalCollapsed)}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: 0 }}
            >
              {terminalCollapsed ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
          </div>
          
          {!terminalCollapsed && (
            <div className="terminal-body" style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
              {txLogs.length === 0 ? (
                <div className="terminal-entry info">
                  <span className="terminal-time">[{new Date().toLocaleTimeString()}]</span>
                  Listening for RPC logs...
                </div>
              ) : (
                txLogs.map((log, i) => (
                  <div key={i} className={`terminal-entry ${log.type}`}>
                    <span className="terminal-time">[{log.time}]</span>
                    {log.text}
                  </div>
                ))
              )}
            </div>
          )}
        </aside>
      </div>

      {/* PROFILE SETUP MODAL */}
      {isProfileModalOpen && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content" style={{ maxWidth: '600px', background: '#ffffff', border: '1px solid var(--void-border-glass)' }}>
            <div className="modal-header" style={{ marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.4rem' }}>DAO Profile Setup</h3>
              <button className="btn-close-modal" onClick={() => setIsProfileModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSaveProfile}>
              <div style={{ display: 'flex', background: 'rgba(182, 255, 64, 0.03)', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--void-border-glass)', marginBottom: '18px', gap: '10px', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                <Wallet size={14} className="text-lime" style={{ flexShrink: 0, color: 'var(--accent-lime)' }} />
                <div>
                  <strong style={{ color: 'var(--text-light)', display: 'block' }}>Sponsored Meta-Transaction</strong>
                  Profile updates are logged onchain on Base Sepolia. Gas is sponsored by the BB DAO paymaster contract.
                </div>
              </div>

              <div style={{ animation: 'modal-enter 0.2s ease-out', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="form-row">
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)' }}>Full Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g. Punit Pal" 
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)' }}>Username</label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '16px', top: '10px', color: 'var(--text-dim)' }}>@</span>
                      <input 
                        type="text" 
                        className="form-control" 
                        style={{ paddingLeft: '32px', width: '100%' }}
                        placeholder="its_punit05" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)' }}>Profession / Role</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g. Lead Solidity Developer / Founder" 
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)' }}>Bio & Experience Summary</label>
                  <textarea 
                    className="form-control" 
                    rows="3" 
                    placeholder="Tell us briefly about your experience, contributions, or projects..." 
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)' }}>Website / Portfolio URL</label>
                    <input 
                      type="url" 
                      className="form-control" 
                      placeholder="https://link3.to/..." 
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)' }}>Location / Country</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g. India" 
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)' }}>Skills & Expertise</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g. Solidity, React, Rust, CSS (comma separated)" 
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-footer" style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="button" className="btn-secondary" onClick={() => setIsProfileModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={savingProfile}>
                  {savingProfile ? 'Updating registry...' : 'Save Social Identity'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DaoPortal;
