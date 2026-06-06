import React from 'react';
import { ExternalLink, HelpCircle, Code, Shield } from 'lucide-react';

const partners = [
  { name: "MetaMask", tier: "anchor", logo: "🦊", url: "https://metamask.io", desc: "Anchor Partner · Co-hosting builder nights, masterclasses, and integrating MetaMask SDK/Snaps." },
  { name: "Ethereum Foundation", tier: "anchor", logo: "⟠", url: "https://ethereum.org", desc: "Ecosystem Grant · Supporting on-chain builder onboarding and academic researcher tracks." },
  { name: "Arbitrum", tier: "ecosystem", logo: "🔵", url: "https://arbitrum.io", desc: "Ecosystem Partner · Focus on Arbitrum Stylus (Rust contract development) sessions." },
  { name: "Monad", tier: "ecosystem", logo: "🟣", url: "https://monad.xyz", desc: "Ecosystem Partner · Event Sponsor & Host for Monad Blitz hackathons in India." },
  { name: "BNB Chain", tier: "ecosystem", logo: "🟡", url: "https://www.bnbchain.org", desc: "Ecosystem Partner · Hackathon tracks and incubators for early-stage community dApps." },
  { name: "Shardeum", tier: "ecosystem", logo: "🔷", url: "https://shardeum.org", desc: "Ecosystem Partner · Supporting sharded network education and regional campus workshops." },
  { name: "Avalanche", tier: "ecosystem", logo: "🔺", url: "https://avax.network", desc: "Ecosystem Partner · Transpiler tooling development and Avalanche Build Games sponsorship." },
  { name: "Vara Network", tier: "ecosystem", logo: "⚡", url: "https://vara.network", desc: "Ecosystem Partner · Focus on Gear protocol and WASM smart contract workshops." }
];

const grants = [
  { name: "Ethereum Foundation ESP", amount: "Varies", desc: "Grants for open-source research and development, toolings, and community building.", link: "https://esp.ethereum.org" },
  { name: "Arbitrum Foundation Grants", amount: "Up to $15k", desc: "Funding for dApps, developer toolings, and educational resources built on Arbitrum.", link: "https://arbitrum.foundation/grants" },
  { name: "Monad Ecosystem Grants", amount: "Sponsored Pools", desc: "Early-stage backing for builders deploying scalable consumer applications on Monad.", link: "https://monad.xyz" },
  { name: "Avalanche Multiverse", amount: "Varies", desc: "Funding program focused on accelerating the adoption of custom subnet deployment.", link: "https://avax.network" },
  { name: "BNB Chain MVB Program", amount: "Incubator + Funding", desc: "Most Valuable Builder program offering accelerator tracks, mentorship, and investment.", link: "https://www.bnbchain.org" },
  { name: "Vara Network Grants Program", amount: "Up to $10k", desc: "Gas subsidies, technical mentorship, and financial resources for WASM developers.", link: "https://vara.network" }
];

const tools = [
  { name: "MetaMask Snaps SDK", cat: "Wallet Extension", desc: "Extend MetaMask wallet functionalities with custom API execution and ZK validations.", link: "https://metamask.io/snaps/" },
  { name: "Arbitrum Stylus Toolchain", cat: "Smart Contracts", desc: "Write smart contracts in Rust, C, and C++ that compile to WebAssembly alongside Solidity.", link: "https://arbitrum.io/stylus" },
  { name: "Monad Devnet Faucet", cat: "Faucets", desc: "Request testnet gas tokens to deploy and test high-throughput EVM smart contracts.", link: "https://monad.xyz" },
  { name: "Vara Gear Idea Platform", cat: "WASM Tooling", desc: "Web-based IDE to write, compile, deploy, and interact with WASM programs easily.", link: "https://idea.gear-tech.io/" }
];

const EcosystemPage = () => {
  return (
    <div className="subpage-container" style={{ background: '#07070a', color: '#fff', minHeight: '100vh', padding: '120px 20px 80px 20px' }}>
      <div className="subpage-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontFamily: 'var(--font-display)', color: '#fff', letterSpacing: '2px', marginBottom: '20px' }}>PARTNER NETWORK</h1>
        <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto', fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>
          Backed by the leading Web3 & AI ecosystems our builders are actively shipping on.
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '60px' }}>
        {/* Anchor Partners */}
        <div>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--accent-lime)', marginBottom: '25px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
            Anchor Partners
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '25px' }}>
            {partners.filter(p => p.tier === 'anchor').map(p => (
              <a
                href={p.url}
                key={p.name}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: 'rgba(182, 255, 64, 0.02)',
                  border: '1px solid rgba(182, 255, 64, 0.2)',
                  borderRadius: '20px',
                  padding: '40px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  color: 'inherit'
                }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--accent-lime)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(182, 255, 64, 0.2)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '3rem' }}>{p.logo}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--accent-lime)', background: 'rgba(182, 255, 64, 0.08)', border: '1px solid rgba(182, 255, 64, 0.2)', padding: '4px 12px', borderRadius: '20px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Anchor Partner
                  </span>
                </div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 900 }}>{p.name}</h3>
                <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{p.desc}</p>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-lime)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px' }}>
                  Visit Ecosystem Website <ExternalLink size={12} />
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Ecosystem Partners */}
        <div>
          <h2 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '25px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
            Ecosystem Partners
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {partners.filter(p => p.tier === 'ecosystem').map(p => (
              <a
                href={p.url}
                key={p.name}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '16px',
                  padding: '30px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none',
                  color: 'inherit'
                }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(182, 255, 64, 0.25)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <span style={{ fontSize: '2rem' }}>{p.logo}</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{p.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{p.desc}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Grants Section */}
        <div id="grants">
          <h2 style={{ fontSize: '1.8rem', color: 'var(--accent-lime)', marginBottom: '25px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
            Active Grant Programs
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '25px' }}>
            {grants.map(g => (
              <div
                key={g.name}
                style={{
                  background: 'rgba(18, 18, 22, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '200px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{g.name}</h3>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', background: 'rgba(182,255,64,0.08)', color: 'var(--accent-lime)' }}>
                      {g.amount}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: '20px' }}>{g.desc}</p>
                </div>
                <a
                  href={g.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'var(--accent-lime)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    textDecoration: 'none'
                  }}
                >
                  Apply for Funding <ExternalLink size={12} />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Developer Utilities / Tools */}
        <div>
          <h2 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '25px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
            Developer SDKs & Utilities
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {tools.map(t => (
              <a
                href={t.link}
                key={t.name}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  transition: 'all 0.2s ease',
                  color: 'inherit',
                  textDecoration: 'none'
                }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(182, 255, 64, 0.2)'; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800 }}>{t.name}</h4>
                  <span style={{ fontSize: '0.65rem', padding: '2px 6px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', color: 'rgba(255,255,255,0.4)' }}>
                    {t.cat}
                  </span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{t.desc}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Submit Resource CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', marginTop: '40px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '50px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.4rem' }}>Have a grant or tool to share?</h3>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', maxWidth: '450px', lineHeight: 1.5 }}>
            Help us keep the ecosystem directory high-signal. Submit new developer tools, faucets, or active grants.
          </p>
          <a
            href="mailto:founder@builderbase.xyz?subject=Ecosystem Resource Submission"
            style={{
              background: 'transparent',
              border: '1px solid rgba(182,255,64,0.4)',
              color: 'var(--accent-lime)',
              padding: '10px 24px',
              borderRadius: '20px',
              fontWeight: 700,
              textTransform: 'uppercase',
              fontSize: '0.8rem',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(182, 255, 64, 0.05)'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            Submit Resource
          </a>
        </div>
      </div>
    </div>
  );
};

export default EcosystemPage;
