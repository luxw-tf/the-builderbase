import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import Hero from './components/Hero';
import Lore from './components/Lore';
import Manifesto from './components/Manifesto';
import Factions from './components/Factions';
import Ecosystem from './components/Ecosystem';
import Avatars from './components/Avatars';
import Roadmap from './components/Roadmap';
import Tokenomics from './components/Tokenomics';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import DaoPortal from './components/DaoPortal';
import Navbar from './components/Navbar';

// Pages
import EventsPage from './pages/EventsPage';
import BuildersPage from './pages/BuildersPage';
import EcosystemPage from './pages/EcosystemPage';
import ChaptersPage from './pages/ChaptersPage';
import ProjectsPage from './pages/ProjectsPage';
import ApplyPage from './pages/ApplyPage';
import AboutPage from './pages/AboutPage';
import PropulsionLabsPage from './pages/PropulsionLabsPage';
import BlogPage from './pages/BlogPage';
import HackathonsPage from './pages/HackathonsPage';

// Styles
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [showPortal, setShowPortal] = useState(false);
  const [portalTab, setPortalTab] = useState('home');
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  
  const manifestoRef = useRef(null);
  const manifestoTextRef = useRef(null);
  
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const navRef = useRef(null);
  const builderRef = useRef(null);
  const baseRef = useRef(null);
  const bottomTextRef = useRef(null);

  // Custom client-side router popstate listener
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      
      // Special routing to open DAO Portal at Bounties tab directly
      if (path === '/bounties') {
        setPortalTab('bounties');
        setShowPortal(true);
        window.history.replaceState({}, '', '/');
        setCurrentPath('/');
      } else {
        setCurrentPath(path);
      }
    };
    
    window.addEventListener('popstate', handleLocationChange);
    // Trigger on first render to capture /bounties or other deep links
    handleLocationChange();
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Reset scroll position on route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPath]);

  // Freeze scroll when DAO portal is open
  useEffect(() => {
    if (showPortal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showPortal]);

  // GSAP ScrollTrigger and Lenis smooth scrolling (Homepage only)
  useEffect(() => {
    if (showPortal || currentPath !== '/') {
      return;
    }

    // 1. Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // 2. Hero Parallax and Text Stacking Scroll Animation
    const heroCtx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=100%", // Pin for one full viewport height of scrolling
          pin: true,
          scrub: true,
          invalidateOnRefresh: true, // Recalculate functional values on resize/font-load
        }
      });

      tl.to(builderRef.current, {
        x: () => baseRef.current.offsetWidth / 2, // Functional value for recalculation
        ease: "power1.inOut"
      }, 0)
      .to(baseRef.current, {
        x: () => -builderRef.current.offsetWidth / 2, // Functional value for recalculation
        y: "0.7em", // Shift up slightly to overlap with 'BUILDER'
        ease: "power1.inOut"
      }, 0)
      .fromTo(bgRef.current, 
        {
          xPercent: -50,
          yPercent: -50,
          scale: 1.1,
          filter: "blur(6px)"
        },
        {
          xPercent: -50,
          yPercent: -42, // Shifts up slightly on scroll (-50% + 8%)
          scale: 1.25,
          filter: "blur(0px)", // Fade out the blur on scroll
          ease: "power1.inOut"
        },
        0
      )
      .to(navRef.current, {
        opacity: 0,
        y: -30,
        ease: "power1.inOut"
      }, 0)
      .to(bottomTextRef.current, {
        opacity: 0,
        y: 30,
        ease: "power1.inOut"
      }, 0);

      // Lore Background Parallax
      gsap.to(".lore-bg", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: ".lore",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    });

    // 3. GSAP Horizontal Scroll and Image Transitions for Manifesto
    const pinContext = gsap.context(() => {
      let textWidth = manifestoTextRef.current.offsetWidth;
      let windowWidth = window.innerWidth;
      
      // Initialize Layer 4 off-screen below the viewport with fully opaque status
      gsap.set(".manifesto-bg-layer.layer-4", { yPercent: 100, opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: manifestoRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => "+=" + textWidth,
        }
      });

      // Horizontal text scrolling animation (duration 3)
      tl.to(manifestoTextRef.current, {
        x: () => -(textWidth - windowWidth + 80),
        ease: "none",
        duration: 3
      }, 0);

      // Parallax zoom and fade transitions for the layered backgrounds
      // Layer 1 slow zoom
      tl.to(".manifesto-bg-layer.layer-1", {
        scale: 1.08,
        ease: "none",
        duration: 1
      }, 0);

      // Transition to Layer 2 (Fade in & Scale)
      tl.to(".manifesto-bg-layer.layer-2", {
        opacity: 1,
        scale: 1.08,
        ease: "power1.inOut",
        duration: 0.8
      }, 0.5);

      // Transition to Layer 3 (Fade in & Scale)
      tl.to(".manifesto-bg-layer.layer-3", {
        opacity: 1,
        scale: 1.08,
        ease: "power1.inOut",
        duration: 0.8
      }, 1.3);

      // Transition to Layer 4 (Slide up from bottom on top of Layer 3)
      tl.to(".manifesto-bg-layer.layer-4", {
        yPercent: 0,
        opacity: 1,
        ease: "power1.inOut",
        duration: 0.8
      }, 2.1);
    });

    // 4. Refresh ScrollTrigger after custom fonts load to ensure offsetWidth calculations are accurate
    let isMounted = true;
    document.fonts.ready.then(() => {
      if (isMounted) {
        ScrollTrigger.refresh();
      }
    });

    // Cleanup functions
    return () => {
      isMounted = false;
      cancelAnimationFrame(rafId);
      lenis.destroy();
      heroCtx.revert();
      pinContext.revert();
    };
  }, [showPortal, currentPath]);

  // Main page content router switch
  const renderPageContent = () => {
    switch (currentPath) {
      case '/':
        return (
          <>
            <Hero
              heroRef={heroRef}
              bgRef={bgRef}
              navRef={navRef}
              builderRef={builderRef}
              baseRef={baseRef}
              bottomTextRef={bottomTextRef}
              onEnterPortal={() => { setPortalTab('home'); setShowPortal(true); }}
            />
            <Lore />
            <Manifesto
              manifestoRef={manifestoRef}
              manifestoTextRef={manifestoTextRef}
            />
            <Factions />
            <Ecosystem />
            <Avatars />
            <Roadmap />
            <Tokenomics />
            <FAQ />
            <Footer />
          </>
        );
      case '/events':
        return <EventsPage />;
      case '/builders':
        return <BuildersPage onEnterPortal={() => { setPortalTab('home'); setShowPortal(true); }} />;
      case '/ecosystem':
        return <EcosystemPage />;
      case '/chapters':
        return <ChaptersPage />;
      case '/projects':
        return <ProjectsPage />;
      case '/apply':
        return <ApplyPage />;
      case '/about':
        return <AboutPage />;
      case '/propulsion-labs':
        return <PropulsionLabsPage />;
      case '/blog':
        return <BlogPage />;
      case '/hackathons':
        return <HackathonsPage />;
      default:
        // Fallback to home page
        return (
          <>
            <Hero
              heroRef={heroRef}
              bgRef={bgRef}
              navRef={navRef}
              builderRef={builderRef}
              baseRef={baseRef}
              bottomTextRef={bottomTextRef}
              onEnterPortal={() => { setPortalTab('home'); setShowPortal(true); }}
            />
            <Lore />
            <Manifesto
              manifestoRef={manifestoRef}
              manifestoTextRef={manifestoTextRef}
            />
            <Factions />
            <Ecosystem />
            <Avatars />
            <Roadmap />
            <Tokenomics />
            <FAQ />
            <Footer />
          </>
        );
    }
  };

  return (
    <div className="app">
      {/* Sticky nav for subpages */}
      {currentPath !== '/' && <Navbar onEnterPortal={() => { setPortalTab('home'); setShowPortal(true); }} />}
      
      {renderPageContent()}

      {showPortal && (
        <DaoPortal 
          initialTab={portalTab}
          onClose={() => setShowPortal(false)} 
        />
      )}
    </div>
  );
}

export default App;
