import React from 'react';
import { Mail, ArrowUpRight, BookOpen, ExternalLink, Calendar } from 'lucide-react';

const posts = [
  {
    title: "Builder Base Weekly Recap #12 — MetaMask Consensys Sync",
    desc: "Summary of our latest regional builder nights in Delhi NCR, MetaMask SDK snaps integration highlights, and list of upcoming campus nodes.",
    date: "June 4, 2026",
    link: "https://builderbase.substack.com"
  },
  {
    title: "Deep Dive: Writing Gas Optimized Smart Contracts on EVM",
    desc: "Technical walk-through of state variables, storage layouts, assembly loops, and memory caching structures to minimize Solidity transaction costs.",
    date: "May 28, 2026",
    link: "https://builderbase.substack.com"
  },
  {
    title: "Builder Spotlight: Translating Solidity to Rust with Sol2Rust",
    desc: "We interview our core hackathon team about writing transpiler tooling, translating AST nodes, and winning 1st place at Core Nexus.",
    date: "May 15, 2026",
    link: "https://builderbase.substack.com"
  }
];

const BlogPage = () => {
  return (
    <div className="subpage-container" style={{ background: '#07070a', color: '#fff', minHeight: '100vh', padding: '120px 20px 80px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '50px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontFamily: 'var(--font-display)', color: '#fff', letterSpacing: '2px', marginBottom: '20px' }}>NEWSLETTER</h1>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)', maxWidth: '500px', margin: '0 auto', fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>
            Ecosystem news, developer guides, and builder spotlight features.
          </p>
        </div>

        {/* Substack Spotlight Panel */}
        <div style={{ background: 'linear-gradient(135deg, rgba(182, 255, 64, 0.04) 0%, transparent 100%)', border: '1px solid rgba(182, 255, 64, 0.2)', borderRadius: '24px', padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', textAlign: 'center' }}>
          <div style={{ display: 'flex', background: 'rgba(182, 255, 64, 0.08)', padding: '16px', borderRadius: '50%', color: 'var(--accent-lime)' }}>
            <BookOpen size={36} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '8px' }}>Builder Base Substack</h3>
            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', maxWidth: '500px', lineHeight: 1.5 }}>
              Subscribe to get high-signal weekly newsletters covering Web3 events, smart contract guides, and developer directory highlights.
            </p>
          </div>
          <a
            href="https://builderbase.substack.com"
            target="_blank"
            rel="noreferrer"
            style={{
              background: 'var(--accent-lime)',
              color: '#000',
              padding: '14px 40px',
              borderRadius: '30px',
              fontWeight: 800,
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            Subscribe on Substack <ArrowUpRight size={16} />
          </a>
        </div>

        {/* Recent Posts Grid */}
        <div>
          <h2 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '25px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
            Recent Newsletter Archives
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {posts.map((post, idx) => (
              <a
                href={post.link}
                key={idx}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '16px',
                  padding: '24px',
                  display: 'block',
                  transition: 'all 0.2s',
                  color: 'inherit',
                  textDecoration: 'none'
                }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(182,255,64,0.2)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'rgba(255,255,255,0.01)'; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', gap: '20px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, lineHeight: 1.4 }}>{post.title}</h3>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={12} /> {post.date}
                  </span>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{post.desc}</p>
                <span style={{ fontSize: '0.78rem', color: 'var(--accent-lime)', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '12px', fontWeight: 600 }}>
                  Read Full Article <ExternalLink size={10} />
                </span>
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default BlogPage;
