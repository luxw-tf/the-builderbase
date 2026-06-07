const Manifesto = ({ manifestoRef, manifestoTextRef }) => {
  return (
    <section className="section manifesto" ref={manifestoRef}>
      {/* Scroll-Reactive Layered Backgrounds */}
      <div className="manifesto-bg-container">
        <div className="manifesto-bg-layer layer-1"></div>
        <div className="manifesto-bg-layer layer-2"></div>
        <div className="manifesto-bg-layer layer-3"></div>
        <div className="manifesto-bg-layer layer-4"></div>
      </div>

      <div className="manifesto-scroll" ref={manifestoTextRef}>
        <h2 className="manifesto-text">
          WE BUILD • WE CREATE • WE DISRUPT • WE INNOVATE • WE ARE THE BUILDER BASE • JOIN THE MOVEMENT
        </h2>
      </div>
    </section>
  );
};

export default Manifesto;
