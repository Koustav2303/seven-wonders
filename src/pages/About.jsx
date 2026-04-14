import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Hero Text Masking Animation
      gsap.fromTo(".reveal-text",
        { y: "150%", rotateAngle: 5 },
        { y: "0%", rotateAngle: 0, duration: 1.2, stagger: 0.1, ease: "power4.out", delay: 0.2 }
      );

      // 2. Fade in the subtle elements
      gsap.fromTo(".fade-in-element",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out", delay: 0.8 }
      );

      // 3. Scroll-triggered glass cards
      gsap.utils.toArray('.glass-card').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50, backdropFilter: "blur(0px)" },
          {
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
            opacity: 1,
            y: 0,
            backdropFilter: "blur(16px)",
            duration: 1,
            ease: "power3.out",
            delay: i * 0.1
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-neutral-950 overflow-hidden pt-32 pb-24">
      
      {/* Background Ambience */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, transparent 20%, #0a0a0a 120%)' }}></div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-24">
          <p className="fade-in-element text-neutral-500 tracking-[0.4em] text-xs uppercase mb-6 ml-2 border-l border-white/20 pl-4">The Vision</p>
          <div className="overflow-hidden pb-4">
            <h1 className="reveal-text text-5xl md:text-7xl font-light tracking-tight text-white leading-tight">
              Bridging history with
            </h1>
          </div>
          <div className="overflow-hidden pb-4">
            <h1 className="reveal-text text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-400 to-neutral-600 uppercase">
              Modern Engineering.
            </h1>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          
          {/* Mission Card */}
          <div className="glass-card bg-white/[0.02] border border-white/5 p-10 rounded-3xl relative overflow-hidden group hover:bg-white/[0.04] transition-colors duration-500">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <h3 className="text-xl font-light text-white mb-6 uppercase tracking-widest">The Project</h3>
            <p className="text-neutral-400 leading-relaxed font-light text-sm">
              This interactive anthology was designed to bring the world's most breathtaking architectural marvels into the digital space. By leveraging cutting-edge web technologies, it transforms static history into an immersive, cinematic timeline.
            </p>
          </div>

          {/* Architect Card */}
          <div className="glass-card bg-white/[0.02] border border-white/5 p-10 rounded-3xl relative overflow-hidden group hover:bg-white/[0.04] transition-colors duration-500">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 delay-100"></div>
            <h3 className="text-xl font-light text-white mb-6 uppercase tracking-widest">The Architect</h3>
            <p className="text-neutral-400 leading-relaxed font-light text-sm mb-6">
              Concept, design, and frontend development engineered by Koustav Pan. Currently crafting high-end digital experiences from Bangalore, focusing on god-level UI/UX and seamless motion design.
            </p>
            <div className="inline-flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs tracking-widest text-neutral-500 uppercase">System Online</span>
            </div>
          </div>

        </div>

        {/* Tech Stack Section */}
        <div className="border-t border-white/10 pt-16 text-center">
          <p className="fade-in-element text-neutral-500 tracking-[0.3em] text-xs uppercase mb-10">Powered By</p>
          <div className="fade-in-element flex flex-wrap justify-center gap-12 items-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
             <span className="text-xl font-bold tracking-tighter text-white">React<span className="text-blue-400">.js</span></span>
             <span className="text-xl font-bold tracking-tighter text-white">Tailwind<span className="text-cyan-400">CSS</span></span>
             <span className="text-xl font-bold tracking-tighter text-white">GSAP<span className="text-green-400">3</span></span>
          </div>
        </div>

        {/* Subtle Dedication */}
        <div className="mt-32 text-center fade-in-element">
          <p className="text-[10px] tracking-[0.4em] text-neutral-700 uppercase">
            Crafted with respect for Didi.
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;