import React, { useState, useEffect } from 'react';
import { Web3Service } from '../services/web3Service.js';
import { useWallet } from '../context/WalletContext.jsx';
import { Search, MapPin, Briefcase, Award } from 'lucide-react';
import { Github, Twitter } from '../components/Icons.jsx';

const BuildersPage = ({ onEnterPortal }) => {
  const { isConnected } = useWallet();
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      try {
        const data = await Web3Service.getMembers();
        const memberList = Object.values(data || {}).map(m => {
          let parsedProfile = {};
          try {
            parsedProfile = JSON.parse(m.profileIpfsHash || '{}');
          } catch (e) {
            console.error('Error parsing member profile:', e);
          }
          return {
            ...m,
            profile: parsedProfile
          };
        });
        
        // Filter out members that have empty profile names or usernames (incomplete profiles)
        const validMembers = memberList.filter(m => m.profile.displayName || m.profile.username);
        setMembers(validMembers);
      } catch (err) {
        console.error('Error loading members directory:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  // Filter builders based on search, city, and role
  const filteredBuilders = members.filter(builder => {
    const p = builder.profile;
    const nameMatch = (p.displayName || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                      (p.username || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                      (p.skills || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    const cityMatch = cityFilter === 'All' || 
                      (p.location || '').toLowerCase().includes(cityFilter.toLowerCase()) ||
                      (p.country || '').toLowerCase().includes(cityFilter.toLowerCase());

    const roleMatch = roleFilter === 'All' || 
                      (p.profession || '').toLowerCase().includes(roleFilter.toLowerCase()) ||
                      (roleFilter === 'Dev' && (p.profession || '').toLowerCase().match(/dev|solidity|engineer|architect|back|front|smart/)) ||
                      (roleFilter === 'Designer' && (p.profession || '').toLowerCase().match(/design|ux|ui|product/)) ||
                      (roleFilter === 'Researcher' && (p.profession || '').toLowerCase().match(/research|zk|academic|cryptograph/)) ||
                      (roleFilter === 'Organizer' && (p.profession || '').toLowerCase().match(/organ|lead|chapter|commu/));

    return nameMatch && cityMatch && roleMatch;
  });

  return (
    <div className="subpage-container" style={{ background: '#07070a', color: '#fff', minHeight: '100vh', padding: '120px 20px 80px 20px' }}>
      <div className="subpage-header" style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontFamily: 'var(--font-display)', color: '#fff', letterSpacing: '2px', marginBottom: '20px' }}>THE BUILDERS</h1>
        <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto', fontFamily: 'var(--font-body)' }}>
          Meet the builders, engineers, hackathon veterans, and chapter leads shaping the future of Web3 in India.
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        {/* Search and Filters panel */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
          {/* Search */}
          <div style={{ flex: '1 1 300px', position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '16px', top: '14px', color: 'rgba(255,255,255,0.4)' }} />
            <input
              type="text"
              placeholder="Search by name, handle, or skills..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '12px 16px 12px 45px',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '0.9rem',
                outline: 'none',
                fontFamily: 'var(--font-body)'
              }}
            />
          </div>

          {/* City Filter */}
          <div style={{ flex: '1 1 180px' }}>
            <select
              value={cityFilter}
              onChange={e => setCityFilter(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '12px 16px',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '0.9rem',
                outline: 'none',
                fontFamily: 'var(--font-body)',
                cursor: 'pointer'
              }}
            >
              <option value="All" style={{ background: '#0d0d10' }}>All Cities</option>
              <option value="Delhi" style={{ background: '#0d0d10' }}>Delhi NCR</option>
              <option value="Mumbai" style={{ background: '#0d0d10' }}>Mumbai</option>
              <option value="Bengaluru" style={{ background: '#0d0d10' }}>Bengaluru</option>
              <option value="Kolkata" style={{ background: '#0d0d10' }}>Kolkata</option>
              <option value="Indore" style={{ background: '#0d0d10' }}>Indore</option>
              <option value="Bhopal" style={{ background: '#0d0d10' }}>Bhopal</option>
            </select>
          </div>

          {/* Role Filter */}
          <div style={{ flex: '1 1 180px' }}>
            <select
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '12px 16px',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '0.9rem',
                outline: 'none',
                fontFamily: 'var(--font-body)',
                cursor: 'pointer'
              }}
            >
              <option value="All" style={{ background: '#0d0d10' }}>All Roles</option>
              <option value="Dev" style={{ background: '#0d0d10' }}>Developers</option>
              <option value="Designer" style={{ background: '#0d0d10' }}>Designers</option>
              <option value="Researcher" style={{ background: '#0d0d10' }}>Researchers</option>
              <option value="Organizer" style={{ background: '#0d0d10' }}>Organizers</option>
            </select>
          </div>
        </div>

        {/* Directory Grid */}
        {loading ? (
          <div style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '60px' }}>Loading registry...</div>
        ) : filteredBuilders.length === 0 ? (
          <div style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '60px' }}>No builders match your search filters.</div>
        ) : (
          <div className="builders-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
            {filteredBuilders.map(b => (
              <div
                key={b.wallet}
                className="builder-card"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(182, 255, 64, 0.25)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  {/* Avatar generator */}
                  <div
                    className="builder-avatar"
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, #b6ff40, #00c8ff)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.4rem',
                      fontWeight: 900,
                      color: '#000',
                      textTransform: 'uppercase'
                    }}
                  >
                    {b.profile.username ? b.profile.username.substring(0, 2) : b.profile.displayName.substring(0, 2)}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>{b.profile.displayName}</h3>
                    <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>@{b.profile.username}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', flexGrow: 1 }}>
                  {b.profile.profession && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Briefcase size={12} style={{ color: 'var(--accent-lime)' }} />
                      <span>{b.profile.profession}</span>
                    </div>
                  )}
                  {b.profile.location && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={12} />
                      <span>{b.profile.location}</span>
                    </div>
                  )}
                  {b.profile.bio && (
                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, marginTop: '5px' }}>
                      {b.profile.bio}
                    </p>
                  )}
                </div>

                {/* Skills as chips */}
                {b.profile.skills && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {b.profile.skills.split(',').slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        style={{
                          background: 'rgba(182, 255, 64, 0.08)',
                          border: '1px solid rgba(182, 255, 64, 0.15)',
                          color: 'var(--accent-lime)',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          textTransform: 'uppercase'
                        }}
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                )}

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.65rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.3)' }}>
                    {b.wallet.substring(0, 6)}...{b.wallet.substring(b.wallet.length - 4)}
                  </span>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <a href={b.profile.website || `https://github.com`} target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      <Github size={14} />
                    </a>
                    <a href={`https://twitter.com`} target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      <Twitter size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, rgba(182, 255, 64, 0.03) 0%, transparent 100%)', border: '1px solid rgba(182, 255, 64, 0.15)', borderRadius: '20px', padding: '40px', textAlign: 'center', marginTop: '60px' }}>
          <h3 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '12px' }}>Are you a Builder?</h3>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.6)', maxWidth: '500px', margin: '0 auto 24px auto', lineHeight: 1.6 }}>
            Connect your wallet to join the on-chain Builder Base registry, list your skills, and showcase your profile publicly.
          </p>
          <button
            onClick={onEnterPortal}
            style={{
              background: 'var(--accent-lime)',
              color: '#000',
              border: 'none',
              padding: '12px 30px',
              borderRadius: '30px',
              fontWeight: 800,
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => { e.currentTarget.style.boxShadow = '0 0 20px rgba(182, 255, 64, 0.4)'; }}
            onMouseOut={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
          >
            Create Your On-Chain Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuildersPage;
