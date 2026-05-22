const BuilderTools = () => {
  return (
    <section className="section ecosystem" style={{ backgroundColor: '#fff' }}>
      <h2 className="section-title">BUILDER TOOLS</h2>
      <div className="bento-grid">
        <div className="bento-item" style={{ background: 'var(--bg-secondary)' }}>
          <h3>Smart Contracts</h3>
          <p>Audited templates ready to deploy.</p>
        </div>
        <div className="bento-item" style={{ background: 'var(--bg-secondary)' }}>
          <h3>UI Kits</h3>
          <p>React, Vue, and Svelte components.</p>
        </div>
      </div>
    </section>
  );
};

export default BuilderTools;
