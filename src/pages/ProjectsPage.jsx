import React, { useState } from 'react';
import { Search, Award, ExternalLink } from 'lucide-react';
import { Github } from '../components/Icons.jsx';

const BB_PROJECTS = [
  {
    name: "PyVax",
    builder: "Punit + MECH X4 Team",
    desc: "Python-to-EVM transpiler. Write Solidity smart contract logic directly in Python and compile to EVM bytecode. Optimizes gas usage by translating AST nodes to intermediate Yul instructions.",
    stack: ["Python", "EVM", "Avalanche"],
    github: "https://github.com/ShahiTechnovation/pyvax",
    award: "Top 100 · Avalanche Build Games 2026",
    awardColor: "#e84142"
  },
  {
    name: "Bloopa",
    builder: "Punit Pal",
    desc: "ARC-4 compliant on-chain credit scoring and credit issuance protocol for autonomous AI agents on Algorand. Features 9 ABI methods, 4 credit tiers, and an LLM-driven risk assessment oracle.",
    stack: ["Algorand", "ARC-4", "Python", "AI"],
    github: "https://github.com/ShahiTechnovation",
    award: "Algorand Testnet Live",
    awardColor: "#00d395"
  },
  {
    name: "RxGraph RAG",
    builder: "Punit Pal",
    desc: "Biomedical GraphRAG query and inference system using the DRKG (Drug Repurposing Knowledge Graph) dataset. Achieves 86% LLM token reduction and BERTScore F1 of 0.871. Built at TigerGraph hackathon.",
    stack: ["GraphRAG", "TigerGraph", "DRKG", "Python", "AI"],
    github: "https://github.com/ShahiTechnovation",
    award: "TigerGraph GraphRAG Inference Hackathon",
    awardColor: "#00c8ff"
  },
  {
    name: "Sol2Rust",
    builder: "Builder Base Team",
    desc: "Solana-to-Rust transpiler that reads Solidity source code, translates interface definitions, structures, and instruction logic into high-performance Anchor-based Rust code.",
    stack: ["Solana", "Rust"],
    github: null,
    award: "🏆 1st Place · Core Nexus",
    awardColor: "#ffd700"
  },
  {
    name: "FlowMon",
    builder: "Punit Pal",
    desc: "Visual multi-agent orchestration platform targeting Monad. Drag-and-drop builder to orchestrate and deploy autonomous on-chain agents with customized workflow rules.",
    stack: ["React", "Monad", "AI Agents", "AI"],
    github: "https://github.com/ShahiTechnovation",
    award: null,
    awardColor: null
  },
  {
    name: "NeuroFit",
    builder: "Builder Base Team",
    desc: "AI-powered computer-vision fitness coaching platform. Evaluates posture, tracks reps in real time, and logs milestones on-chain. Built at BrahmaX hackathon.",
    stack: ["AI", "Next.js"],
    github: null,
    award: "🥈 1st Runner-Up · BrahmaX",
    awardColor: "#c0c0c0"
  }
];

const ProjectsPage = () => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredProjects = BB_PROJECTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.builder.toLowerCase().includes(search.toLowerCase()) ||
                          p.desc.toLowerCase().includes(search.toLowerCase());
    
    const matchesStack = filter === 'All' || 
                         p.stack.includes(filter) ||
                         (filter === 'AI' && p.stack.some(s => s.match(/AI|Agent/)));

    return matchesSearch && matchesStack;
  });

  return (
    <div className="subpage-container" style={{ background: '#07070a', color: '#fff', minHeight: '100vh', padding: '120px 20px 80px 20px' }}>
      <div className="subpage-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontFamily: 'var(--font-display)', color: '#fff', letterSpacing: '2px', marginBottom: '20px' }}>PROJECTS SHOWCASE</h1>
        <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto', fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>
          Explore the tools, transpilers, ZK solutions, and AI agents built by Builder Base members at hackathons and open-source sprints.
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        {/* Search & Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
          {/* Search */}
          <div style={{ flex: '1 1 300px', position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '16px', top: '14px', color: 'rgba(255,255,255,0.4)' }} />
            <input
              type="text"
              placeholder="Search projects by name, builder, or stack..."
              value={search}
              onChange={e => setSearch(e.target.value)}
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

          {/* Stack Filters */}
          <div className="filter-pills" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            {['All', 'Python', 'AI', 'Rust', 'EVM', 'Algorand', 'Solana', 'Monad'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`filter-pill ${filter === cat ? 'active' : ''}`}
                style={{
                  background: filter === cat ? 'rgba(182, 255, 64, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  border: filter === cat ? '1px solid var(--accent-lime)' : '1px solid rgba(255, 255, 255, 0.1)',
                  color: filter === cat ? 'var(--accent-lime)' : 'rgba(255, 255, 255, 0.7)',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 600
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry-Style Grid */}
        {filteredProjects.length === 0 ? (
          <p style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '60px' }}>No projects match your search query or stack filters.</p>
        ) : (
          <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '30px' }}>
            {filteredProjects.map((p, idx) => (
              <div
                key={idx}
                className="project-card"
                style={{
                  background: 'rgba(18, 18, 22, 0.7)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '20px',
                  padding: '30px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '320px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(182, 255, 64, 0.25)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(182, 255, 64, 0.05)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div>
                  {/* Top strip with award details */}
                  {p.award && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: `rgba(${p.awardColor === '#ffd700' ? '255,215,0' : p.awardColor === '#e84142' ? '232,65,66' : '0,200,255'}, 0.08)`,
                        border: `1px solid ${p.awardColor}`,
                        color: p.awardColor,
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        width: 'fit-content',
                        marginBottom: '15px'
                      }}
                    >
                      <Award size={12} /> {p.award}
                    </div>
                  )}

                  <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '6px' }}>{p.name}</h3>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '16px' }}>
                    Built by: {p.builder}
                  </span>
                  <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '20px' }}>{p.desc}</p>
                </div>

                <div>
                  {/* Stack Chips */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                    {p.stack.map(s => (
                      <span
                        key={s}
                        style={{
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          color: 'rgba(255,255,255,0.5)',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: 600
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '15px', display: 'flex', gap: '15px' }}>
                    {p.github ? (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: 'var(--accent-lime)',
                          textDecoration: 'none'
                        }}
                      >
                        <Github size={14} /> Github Repository
                      </a>
                    ) : (
                      <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        Proprietary / Core Nexus Dev
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Submit project CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', marginTop: '60px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '50px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.5rem', color: '#fff' }}>Built something awesome?</h3>
          <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', maxWidth: '450px', lineHeight: 1.5 }}>
            Shaped a tool at a hackathon or deployed a protocol independently? Add your project to the public Builder Base showcase.
          </p>
          <a
            href="/apply"
            style={{
              background: 'var(--accent-lime)',
              color: '#000',
              padding: '10px 24px',
              borderRadius: '20px',
              fontWeight: 800,
              textTransform: 'uppercase',
              fontSize: '0.8rem',
              cursor: 'pointer',
              textDecoration: 'none'
            }}
          >
            Submit Project
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
