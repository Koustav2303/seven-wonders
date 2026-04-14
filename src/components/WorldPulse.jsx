import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const WorldPulse = () => {
  const mapRef = useRef(null);
  const [activeWonder, setActiveWonder] = useState(null);

  const wonders = [
    { id: 'colosseum', x: '49%', y: '32%', name: 'Colosseum', country: 'Italy', fact: '100 Days of Games' },
    { id: 'taj', x: '71%', y: '46%', name: 'Taj Mahal', country: 'India', fact: 'Architectural Symmetry' },
    { id: 'wall', x: '82%', y: '33%', name: 'Great Wall', country: 'China', fact: 'Sticky Rice Mortar' },
    { id: 'petra', x: '58%', y: '40%', name: 'Petra', country: 'Jordan', fact: 'The Rose City' },
    { id: 'chichen', x: '23%', y: '46%', name: 'Chichén Itzá', country: 'Mexico', fact: 'Equinox Serpent' },
    { id: 'machu', x: '28%', y: '68%', name: 'Machu Picchu', country: 'Peru', fact: 'Andean Engineering' },
    { id: 'christ', x: '35%', y: '72%', name: 'Christ Redeemer', country: 'Brazil', fact: 'Art Deco Mastery' },
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Scanning Line Animation
      gsap.fromTo(".scan-line", 
        { top: "-10%" }, 
        { top: "110%", duration: 4, repeat: -1, ease: "none" }
      );

      // 2. Pulse Animation for Points
      gsap.to(".pulse-ring", {
        scale: 2.5,
        opacity: 0,
        duration: 2,
        repeat: -1,
        stagger: 0.2,
        ease: "power2.out"
      });

      // 3. Float the labels slightly
      gsap.to(".map-label", {
        y: -5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // 4. Reveal the Didi Connection (Bangalore to WB)
      gsap.fromTo(".connection-arc", 
        { strokeDashoffset: 500, opacity: 0 }, 
        { strokeDashoffset: 0, opacity: 0.4, duration: 3, ease: "power2.inOut", delay: 1 }
      );

    }, mapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={mapRef} className="relative py-40 bg-neutral-950 overflow-hidden border-t border-white/5 selection:bg-white/20">
      
      {/* Cinematic Overlays */}
      <div className="scan-line absolute left-0 w-full h-[2px] bg-white/[0.03] z-10 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0a0a0a_80%)] z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-20">
        
        {/* Header Content */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="text-left">
            <p className="text-neutral-500 tracking-[0.5em] text-[10px] uppercase mb-4">Global Signal</p>
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
              Geographic <br /> <span className="text-neutral-600 font-light">Distribution</span>
            </h2>
          </div>
          
          <div className="hidden md:block text-right">
            <div className="text-white text-3xl font-light tracking-tighter">
              {activeWonder ? activeWonder.name : "System Idle"}
            </div>
            <p className="text-neutral-500 text-[10px] tracking-[0.3em] uppercase mt-2">
              {activeWonder ? `${activeWonder.country} // ${activeWonder.fact}` : "Select a Coordinate"}
            </p>
          </div>
        </div>

        {/* The Map Interface */}
        <div className="relative aspect-video w-full bg-neutral-900/20 rounded-3xl border border-white/5 backdrop-blur-sm overflow-hidden group">
          
          {/* Subtle Grid Pattern inside the map */}
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

          {/* SVG Connection Layer */}
          <svg viewBox="0 0 1000 500" className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {/* Dedication Arc: Bangalore to West Bengal (Approx coordinates) */}
            <path 
              className="connection-arc stroke-white stroke-[1] fill-none" 
              d="M710,380 Q725,350 740,360" 
              strokeDasharray="500"
            />
          </svg>

          {/* Wonder Markers */}
          {wonders.map((point) => (
            <div 
              key={point.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30"
              style={{ left: point.x, top: point.y }}
              onMouseEnter={() => setActiveWonder(point)}
              onMouseLeave={() => setActiveWonder(null)}
            >
              {/* Pulse Rings */}
              <div className="pulse-ring absolute inset-[-10px] w-8 h-8 border border-white/30 rounded-full"></div>
              <div className="pulse-ring absolute inset-[-20px] w-12 h-12 border border-white/10 rounded-full"></div>
              
              {/* Main Point */}
              <div className="relative w-3 h-3 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.6)] group-hover:scale-125 transition-transform duration-300"></div>
              
              {/* Floating Label (Desktop Only) */}
              <div className="map-label absolute top-[-30px] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                <p className="text-[10px] text-white tracking-[0.3em] uppercase bg-black/80 border border-white/10 px-3 py-1 rounded-full whitespace-nowrap backdrop-blur-md">
                  {point.name}
                </p>
              </div>
            </div>
          ))}

          {/* Dedication Markers (Bangalore & WB) */}
          <div className="absolute left-[71%] top-[76%] z-20"> {/* Bangalore approx */}
             <div className="w-1 h-1 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]"></div>
             <p className="text-[8px] text-blue-500/50 uppercase tracking-widest mt-2 ml-[-10px]">BLR_UNIT</p>
          </div>
          <div className="absolute left-[74%] top-[72%] z-20"> {/* WB approx */}
             <div className="w-1 h-1 bg-red-500 rounded-full shadow-[0_0_10px_#ef4444]"></div>
             <p className="text-[8px] text-red-500/50 uppercase tracking-widest mt-2 ml-[-10px]">WB_NODE</p>
          </div>
        </div>

        {/* Footer Stats Bar */}
        <div className="mt-12 flex flex-wrap justify-center md:justify-start gap-12 border-t border-white/5 pt-8">
           <div className="flex flex-col gap-1">
             <span className="text-neutral-600 text-[10px] uppercase tracking-widest">Active Nodes</span>
             <span className="text-white font-light text-xl">07 / 07</span>
           </div>
           <div className="flex flex-col gap-1">
             <span className="text-neutral-600 text-[10px] uppercase tracking-widest">Data Latency</span>
             <span className="text-white font-light text-xl">14ms</span>
           </div>
           <div className="flex flex-col gap-1">
             <span className="text-neutral-600 text-[10px] uppercase tracking-widest">Status</span>
             <span className="text-green-500 font-light text-xl tracking-tighter uppercase">Synchronized</span>
           </div>
        </div>

      </div>
    </section>
  );
};

export default WorldPulse;