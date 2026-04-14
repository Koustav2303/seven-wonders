import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // 1. Interactive Spotlight Effect for Glass Cards
    const handleMouseMove = (e) => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 2. GSAP God-Level Animations
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Hero Sequence
      tl.fromTo(".line-mask", 
        { width: "0%" }, 
        { width: "100%", duration: 1, ease: "power3.inOut", delay: 0.2 }
      )
      .fromTo(".reveal-text",
        { y: "150%", rotateX: -45, opacity: 0 },
        { y: "0%", rotateX: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out" },
        "-=0.5"
      )
      .fromTo(".fade-up-hero",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.8"
      );

      // Scroll-triggered Spotlight Cards
      gsap.utils.toArray('.spotlight-card-wrapper').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 100, scale: 0.95 },
          {
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "elastic.out(1, 0.75)",
            delay: i * 0.15
          }
        );
      });

      // Tech Stack Stagger
      gsap.fromTo(".tech-pill",
        { opacity: 0, scale: 0.8, y: 20 },
        {
          scrollTrigger: {
            trigger: ".tech-section",
            start: "top 90%"
          },
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)"
        }
      );

      // Parallax Background Grid
      gsap.to(".bg-grid", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

    }, containerRef);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ctx.revert();
    };
  }, []);

  // Helper to add refs to our array for the spotlight effect
  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-neutral-950 overflow-hidden pt-32 pb-24 selection:bg-white/20">
      
      {/* --- AMBIENCE & BACKGROUNDS --- */}
      {/* 1. Engineering Grid */}
      <div className="bg-grid absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}>
      </div>
      
      {/* 2. Cinematic Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-white/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-neutral-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      
      {/* 3. Film Grain */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle, transparent 20%, #0a0a0a 120%)' }}></div>


      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        
        {/* --- HERO SECTION --- */}
        <div className="mb-32 mt-12">
          <div className="flex items-center gap-4 mb-8 fade-up-hero">
            <div className="w-12 h-[1px] bg-white/30 line-mask"></div>
            <p className="text-neutral-500 tracking-[0.4em] text-xs uppercase font-medium">The Architecture</p>
          </div>
          
          <div className="overflow-hidden pb-2">
            <h1 className="reveal-text text-5xl md:text-[6rem] font-light tracking-tighter text-white leading-none">
              Bridging antiquity
            </h1>
          </div>
          <div className="overflow-hidden pb-6">
            <h1 className="reveal-text text-5xl md:text-[6rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-700 uppercase leading-none">
              with Modern Code.
            </h1>
          </div>
          
          <p className="fade-up-hero text-neutral-400 max-w-2xl text-lg md:text-xl font-light leading-relaxed mt-6">
            This interactive anthology transforms static history into an immersive, cinematic timeline, engineering a new way to experience human achievement.
          </p>
        </div>


        {/* --- SPOTLIGHT CARDS GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-32">
          
          {/* Card 1: The Project (Spans 7 columns) */}
          <div className="spotlight-card-wrapper lg:col-span-7 group relative rounded-3xl bg-neutral-900/50 border border-white/10 overflow-hidden">
            {/* The Mouse-Tracking Glow Layer */}
            <div 
              ref={addToRefs}
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%)`
              }}
            ></div>
            
            <div className="relative h-full p-10 md:p-14 backdrop-blur-md flex flex-col justify-between">
              <div className="mb-12">
                <svg className="w-8 h-8 text-white/50 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <h3 className="text-2xl font-light text-white mb-4 uppercase tracking-widest">The Project</h3>
                <p className="text-neutral-400 leading-relaxed font-light text-lg">
                  Designed to break away from standard Wikipedia-style layouts, this application leverages high-end glassmorphism, precise scroll-hijacking, and dynamic routing to curate a museum-grade digital exhibition.
                </p>
              </div>
              
              {/* Fake Engineering Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-white/10">
                <div>
                  <p className="text-white text-3xl font-light">07</p>
                  <p className="text-neutral-500 text-[10px] tracking-widest uppercase mt-1">Wonders Archived</p>
                </div>
                <div>
                  <p className="text-white text-3xl font-light">60<span className="text-lg text-neutral-500">fps</span></p>
                  <p className="text-neutral-500 text-[10px] tracking-widest uppercase mt-1">Render Target</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: The Architect (Spans 5 columns) */}
          <div className="spotlight-card-wrapper lg:col-span-5 group relative rounded-3xl bg-neutral-900/50 border border-white/10 overflow-hidden">
             {/* The Mouse-Tracking Glow Layer */}
             <div 
              ref={addToRefs}
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%)`
              }}
            ></div>

            <div className="relative h-full p-10 md:p-14 backdrop-blur-md flex flex-col justify-between bg-gradient-to-br from-transparent to-white/[0.02]">
              <div>
                <svg className="w-8 h-8 text-white/50 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <h3 className="text-2xl font-light text-white mb-4 uppercase tracking-widest">The Architect</h3>
                <p className="text-neutral-400 leading-relaxed font-light text-base mb-8">
                  Concept, design, and God-level frontend engineering by <strong className="text-white font-medium">Koustav Pan</strong>. 
                  Currently crafting premium digital experiences and seamless motion design from Bangalore.
                </p>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </div>
                  <span className="text-xs tracking-widest text-neutral-300 uppercase">System Online</span>
                </div>
                <span className="text-xs text-neutral-600 tracking-wider">BLR // IND</span>
              </div>
            </div>
          </div>

        </div>


        {/* --- TECH STACK PILLS --- */}
        <div className="tech-section border-t border-white/10 pt-20 pb-12 text-center">
          <p className="text-neutral-500 tracking-[0.4em] text-xs uppercase mb-12">Engineered With</p>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-3xl mx-auto">
            {['React.js', 'Tailwind CSS v3', 'GSAP ScrollTrigger', 'Vite', 'React Router', 'Glassmorphism UI'].map((tech, index) => (
              <div 
                key={index}
                className="tech-pill px-6 py-3 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-sm cursor-default"
              >
                <span className="text-sm tracking-widest text-neutral-300 uppercase font-light">{tech}</span>
              </div>
            ))}
          </div>
        </div>


        {/* --- DEDICATION --- */}
        <div className="mt-20 text-center pb-12">
          <p className="text-[10px] tracking-[0.5em] text-neutral-600 uppercase flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-neutral-800"></span>
            Crafted with respect for Didi.
            <span className="w-8 h-[1px] bg-neutral-800"></span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;