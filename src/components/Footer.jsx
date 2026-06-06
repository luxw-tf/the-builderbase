import React from 'react';
import Link from './Link.jsx';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-grid">
        {/* Brand column */}
        <div className="footer-brand">
          <span className="footer-logo">BUILDER BASE</span>
          <p>
            India's Web3 + AI builder community.
            <br />
            Building the future from campus to mainnet.
          </p>
          <div className="footer-socials">
            <a href="https://twitter.com/theBuilder_base" target="_blank" rel="noreferrer">Twitter ↗</a>
            <a href="https://link3.to/builderbase" target="_blank" rel="noreferrer">Community ↗</a>
            <a href="mailto:founder@builderbase.xyz">Contact ↗</a>
          </div>
        </div>

        {/* Community column */}
        <div className="footer-col">
          <h5>COMMUNITY</h5>
          <Link to="/events">Events</Link>
          <Link to="/builders">Builder Directory</Link>
          <Link to="/chapters">University Chapters</Link>
          <Link to="/projects">Projects Showcase</Link>
        </div>

        {/* Programs column */}
        <div className="footer-col">
          <h5>PROGRAMS</h5>
          <Link to="/propulsion-labs">Propulsion Labs</Link>
          <Link to="/bounties">Bounty Hub</Link>
          <Link to="/apply">Apply to BB</Link>
          <a href="https://link3.to/builderbase" target="_blank" rel="noreferrer">Join Community</a>
        </div>

        {/* Ecosystem column */}
        <div className="footer-col">
          <h5>ECOSYSTEM</h5>
          <Link to="/ecosystem">Partners</Link>
          <Link to="/ecosystem#grants">Grants & Resources</Link>
          <Link to="/about">About</Link>
          <a href="mailto:founder@builderbase.xyz">Partner With Us</a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2025–2026 Builder Base. All rights reserved.</span>
        <span>Built with ⚡ in India</span>
      </div>
    </footer>
  );
};

export default Footer;
