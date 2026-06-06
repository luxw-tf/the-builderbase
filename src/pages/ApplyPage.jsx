import React, { useState } from 'react';
import { Mail, Shield, CheckCircle2, Award, Users, FileText, Send } from 'lucide-react';

const ApplyPage = () => {
  const [activeTab, setActiveTab] = useState('join'); // join, chapter, partner, creator, lead, ambassador
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telegram, setTelegram] = useState('');
  const [details, setDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate sending email via Resend API
    console.log(`Sending application via Resend API:
      Type: ${activeTab.toUpperCase()}
      Name: ${name}
      Email: ${email}
      Telegram: ${telegram}
      Details: ${details}
    `);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setTelegram('');
    setDetails('');
    setSubmitted(false);
  };

  const tabs = [
    { id: 'join', label: 'Join BB', desc: 'Become a member of India\'s largest Web3 + AI builder community.' },
    { id: 'chapter', label: 'Open Chapter', desc: 'Establish a Builder Base node at your university or campus.' },
    { id: 'partner', label: 'Partner With Us', desc: 'For ecosystems/protocols wanting to co-organize events or sponsor tracks.' },
    { id: 'creator', label: 'Propulsion Labs', desc: 'Join the creator & content visibility program.' },
    { id: 'lead', label: 'Become Chapter Lead', desc: 'Apply to lead a regional or city-level builder node.' },
    { id: 'ambassador', label: 'Ambassador', desc: 'Become a student ambassador representing Builder Base.' }
  ];

  return (
    <div className="subpage-container" style={{ background: '#07070a', color: '#fff', minHeight: '100vh', padding: '120px 20px 80px 20px' }}>
      <div className="subpage-header" style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontFamily: 'var(--font-display)', color: '#fff', letterSpacing: '2px', marginBottom: '20px' }}>APPLICATIONS</h1>
        <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto', fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>
          Ready to build with us? Select your track below to apply or get community access.
        </p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', background: 'rgba(255,255,255,0.02)', padding: '6px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '35px' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSubmitted(false); }}
              style={{
                flex: '1 1 auto',
                background: activeTab === tab.id ? 'var(--accent-lime)' : 'transparent',
                color: activeTab === tab.id ? '#000' : 'rgba(255, 255, 255, 0.6)',
                border: 'none',
                padding: '10px 16px',
                borderRadius: '10px',
                fontWeight: 800,
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Panels */}
        <div style={{ background: 'rgba(18, 18, 22, 0.8)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '24px', padding: '40px', boxShadow: '0 15px 40px rgba(0,0,0,0.3)' }}>
          <h2 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '10px' }}>
            {tabs.find(t => t.id === activeTab).label}
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: '30px' }}>
            {tabs.find(t => t.id === activeTab).desc}
          </p>

          {activeTab === 'join' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', alignItems: 'center', textAlign: 'center', padding: '20px 0' }}>
              <div style={{ display: 'flex', background: 'rgba(182, 255, 64, 0.1)', padding: '24px', borderRadius: '50%', color: 'var(--accent-lime)' }}>
                <Users size={48} />
              </div>
              <h3 style={{ fontSize: '1.3rem' }}>Join the Builder Base Community</h3>
              <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', maxWidth: '500px', lineHeight: 1.6 }}>
                Builder Base coordinates community updates, developer guides, and event calendar updates directly inside our verified WhatsApp groups and Link3 channels. Connect with over 3,500 builders.
              </p>
              <a
                href="https://link3.to/builderbase"
                target="_blank"
                rel="noreferrer"
                style={{
                  background: 'var(--accent-lime)',
                  color: '#000',
                  padding: '14px 40px',
                  borderRadius: '30px',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  display: 'inline-block'
                }}
              >
                Access Builder Community
              </a>
            </div>
          ) : submitted ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', textAlign: 'center', padding: '40px 0' }}>
              <CheckCircle2 size={56} style={{ color: 'var(--accent-lime)' }} />
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px' }}>Application Dispatched</h3>
                <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)' }}>
                  Your details have been successfully sent to <strong>founder@builderbase.xyz</strong> via Resend API.
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--accent-lime)', marginTop: '5px', fontFamily: 'monospace' }}>
                  SIMULATED RESEND DISPATCH: SUCCESS
                </p>
              </div>
              <button
                onClick={handleReset}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                  padding: '8px 20px',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.8rem'
                }}
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Form Info Banner */}
              <div style={{ display: 'flex', background: 'rgba(182, 255, 64, 0.03)', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(182, 255, 64, 0.15)', gap: '10px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>
                <Mail size={16} style={{ color: 'var(--accent-lime)', flexShrink: 0 }} />
                <span>This application goes directly to Punit Pal (founder@builderbase.xyz) via the Resend API layer. Expect a response on Telegram within 48 hours.</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Punit Pal"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      color: '#fff',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. founder@builderbase.xyz"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      color: '#fff',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Telegram / Twitter Username</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. @its_punit05"
                  value={telegram}
                  onChange={e => setTelegram(e.target.value)}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Dynamic Labels / Textareas based on Active Tab */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
                  {activeTab === 'chapter' && "Chapter Details (University, City, Estimated Member Count)"}
                  {activeTab === 'partner' && "Partnership Proposal (Sponsorship goals, Co-hosting ideas)"}
                  {activeTab === 'creator' && "Propulsion Labs Pitch (Link to your content, portfolio details)"}
                  {activeTab === 'lead' && "Why do you want to lead your city chapter? (Prior experience)"}
                  {activeTab === 'ambassador' && "Ambassador Pitch (How you plan to onboard developers)"}
                </label>
                <textarea
                  required
                  rows="4"
                  placeholder="Outline your pitch, details, or experience here..."
                  value={details}
                  onChange={e => setDetails(e.target.value)}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '0.95rem',
                    outline: 'none',
                    lineHeight: 1.6,
                    resize: 'vertical'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                style={{
                  background: 'var(--accent-lime)',
                  color: '#000',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '10px',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => { e.currentTarget.style.boxShadow = '0 0 15px rgba(182, 255, 64, 0.4)'; }}
                onMouseOut={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
              >
                {submitting ? (
                  "Sending Application..."
                ) : (
                  <>
                    Submit Application <Send size={14} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplyPage;
