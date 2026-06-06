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
          WE BUILD ON ETH • WE BUILD ON MONAD • WE BUILD ON AVAX • WE BUILD ON BNB • INDIA'S WEB3 ARMY • 3,500 BUILDERS STRONG • DELHI NCR • MUMBAI • BENGALURU • HACKATHONS • BUILDER NIGHTS • WORKSHOPS • Metamask • Web3 Backed • JOIN BUILDER BASE • BUILDING THE FUTURE FROM INDIA •
        </h2>
      </div>
    </section>
  );
};

export default Manifesto;
