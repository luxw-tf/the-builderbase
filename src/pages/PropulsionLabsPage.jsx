import React from 'react';
import { Eye, Award, Sparkles, Send, Megaphone } from 'lucide-react';
import Link from '../components/Link.jsx';

const PropulsionLabsPage = () => {
  return (
    <div className="subpage-container" style={{ background: '#07070a', color: '#fff', minHeight: '100vh', padding: '120px 20px 80px 20px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '60px' }}>
        
        {/* Hero */}
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontFamily: 'var(--font-display)', color: '#fff', letterSpacing: '2px', marginBottom: '20px' }}>PROPULSION LABS</h1>
          <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--accent-lime)', maxWidth: '800px', margin: '0 auto', lineHeight: 1.4 }}>
            "Where Builder Base builders go to build their personal brand."
          </h2>
        </div>

        {/* Tracks Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
          {/* Visibility Track */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '24px', padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', background: 'rgba(0, 200, 255, 0.08)', padding: '12px', borderRadius: '50%', width: 'fit-content', color: '#00c8ff' }}>
              <Eye size={28} />
            </div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 900 }}>Visibility Track</h3>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '3px 8px', borderRadius: '5px', background: 'rgba(0, 200, 255, 0.1)', color: '#00c8ff', width: 'fit-content', textTransform: 'uppercase' }}>
              Free Access
            </span>
            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
              We amplify your Web3 & AI content across Builder Base distribution networks, feature your project updates, and publish builder spotlight interviews to over 3,500 builders.
            </p>
            <ul style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>• Twitter/Telegram reposts and amplification</li>
              <li>• Builder Spotlight feature posts</li>
              <li>• Ecosystem project directory showcasing</li>
            </ul>
          </div>

          {/* Campaign Track */}
          <div style={{ background: 'rgba(182, 255, 64, 0.02)', border: '1px solid rgba(182, 255, 64, 0.2)', borderRadius: '24px', padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', background: 'rgba(182, 255, 64, 0.08)', padding: '12px', borderRadius: '50%', width: 'fit-content', color: 'var(--accent-lime)' }}>
              <Award size={28} />
            </div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 900 }}>Campaign Track</h3>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '3px 8px', borderRadius: '5px', background: 'rgba(182, 255, 64, 0.1)', color: 'var(--accent-lime)', width: 'fit-content', textTransform: 'uppercase' }}>
              Sponsored Partnerships
            </span>
            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
              Get paid to create high-signal developer content. Ecosystem partners (MetaMask, Monad, etc.) sponsor tutorial campaigns, contract deployment guides, and video walk-throughs.
            </p>
            <ul style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>• Paid developer guide commissions</li>
              <li>• Direct grants for tutorial series</li>
              <li>• Fast-tracked access to partner marketing campaigns</li>
            </ul>
          </div>
        </div>

        {/* How It Works */}
        <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '24px', padding: '40px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-display)', marginBottom: '35px' }}>HOW IT WORKS</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '25px' }}>
            <div>
              <span style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent-lime)', display: 'block', marginBottom: '10px' }}>01</span>
              <strong style={{ display: 'block', fontSize: '1rem', marginBottom: '8px' }}>Apply</strong>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>Email your pitch or apply through our portal detailing your content background.</p>
            </div>
            <div>
              <span style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent-lime)', display: 'block', marginBottom: '10px' }}>02</span>
              <strong style={{ display: 'block', fontSize: '1rem', marginBottom: '8px' }}>Create</strong>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>Write guides, document smart contract architectures, or record video tutorials.</p>
            </div>
            <div>
              <span style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent-lime)', display: 'block', marginBottom: '10px' }}>03</span>
              <strong style={{ display: 'block', fontSize: '1rem', marginBottom: '8px' }}>Amplify</strong>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>We publish to our network of developers and unlock sponsored payout payouts.</p>
            </div>
          </div>
        </div>

        {/* Who it's for */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '16px' }}>Who is this program for?</h3>
            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
              Whether you are a Web3 developer looking to document your code transitions, a technical writer explaining ZK scalability, or a developer advocate teaching SDKs, Propulsion Labs is designed to amplify your personal brand.
            </p>
          </div>
          <div style={{ background: 'rgba(182,255,64,0.02)', border: '1px solid rgba(182, 255, 64, 0.15)', borderRadius: '20px', padding: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Apply for Propulsion Labs</h4>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
              Ready to submit your application? Connect with Punit Pal via email or fill out our quick forms.
            </p>
            <Link
              to="/apply"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: 'var(--accent-lime)',
                color: '#000',
                padding: '12px',
                borderRadius: '10px',
                fontWeight: 800,
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              Submit Application Form <Send size={14} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PropulsionLabsPage;
