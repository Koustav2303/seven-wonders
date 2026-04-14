import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const wondersData = [
  { id: "colosseum", name: "The Colosseum", location: "Rome, Italy", year: "80 AD" },
  { id: "taj-mahal", name: "Taj Mahal", location: "Agra, India", year: "1653" },
  { id: "great-wall", name: "Great Wall", location: "China", year: "7th C. BC" },
  { id: "petra", name: "Petra", location: "Jordan", year: "5th C. BC" },
  { id: "chichen-itza", name: "Chichén Itzá", location: "Mexico", year: "600 AD" },
  { id: "machu-picchu", name: "Machu Picchu", location: "Peru", year: "1450 AD" },
  { id: "christ-redeemer", name: "Christ Redeemer", location: "Brazil", year: "1931" }
];

const Explore = () => {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      let panels = gsap.utils.toArray(".explore-panel");

      // The God-Level Horizontal Scroll
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1, // Smooth scrubbing, takes 1 second to "catch up" to the scrollbar
          snap: {
            snapTo: 1 / (panels.length - 1),
            duration: { min: 0.2, max: 0.6 },
            delay: 0.1,
            ease: "power1.inOut"
          },
          // Base the total scroll length on the width of the container
          end: () => "+=" + sliderRef.current.offsetWidth
        }
      });

      // Animate text elements inside each panel as they come into view
      panels.forEach((panel) => {
        gsap.fromTo(panel.querySelectorAll(".explore-text"), 
          { opacity: 0, y: 50 },
          {
            opacity: 1, 
            y: 0, 
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: gsap.getById("horizontalScroll"), // Links this to the horizontal movement
              start: "left center", 
              toggleActions: "play none none reverse"
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-neutral-950 overflow-hidden">
      
      {/* Intro Text before the horizontal scroll begins */}
      <div className="h-[50vh] flex flex-col items-center justify-center border-b border-white/5">
        <p className="text-neutral-500 tracking-[0.5em] text-sm uppercase mb-4">Interactive Timeline</p>
        <h1 className="text-4xl md:text-6xl font-light text-white uppercase tracking-widest">Scroll to Explore</h1>
        <div className="w-[1px] h-24 bg-gradient-to-b from-white/20 to-transparent mt-12 animate-pulse"></div>
      </div>

      {/* The Horizontal Scroll Container */}
      <div ref={containerRef} className="explore-container h-screen flex flex-col justify-center overflow-hidden bg-neutral-950">
        <div ref={sliderRef} className="flex h-[70vh] w-[700vw]" id="horizontalScroll">
          
          {wondersData.map((wonder, index) => (
            <div 
              key={wonder.id} 
              className="explore-panel w-screen h-full flex items-center justify-center relative px-4 md:px-20"
            >
              {/* Massive Background Number */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[20rem] md:text-[30rem] font-black text-white/5 select-none pointer-events-none z-0">
                0{index + 1}
              </div>

              <div className="relative z-10 flex flex-col md:flex-row items-center w-full max-w-7xl gap-12">
                
                {/* Visual Placeholder for the wonder */}
                <div className="w-full md:w-1/2 h-[40vh] md:h-[60vh] bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/80 to-transparent z-10"></div>
                  <div className="w-full h-full bg-neutral-900 group-hover:scale-105 transition-transform duration-1000 flex items-center justify-center">
                    <span className="text-neutral-700 tracking-widest text-xs uppercase">{wonder.id}.jpg</span>
                  </div>
                </div>

                {/* Typography / Information */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <div className="explore-text overflow-hidden mb-2">
                    <p className="text-neutral-400 tracking-[0.3em] text-sm uppercase">{wonder.location} • {wonder.year}</p>
                  </div>
                  <div className="explore-text overflow-hidden mb-8">
                    <h2 className="text-5xl md:text-7xl font-light text-white leading-tight">{wonder.name}</h2>
                  </div>
                  
                  <div className="explore-text">
                    <Link 
                      to={`/wonder/${wonder.id}`}
                      className="group inline-flex items-center gap-4 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all duration-300 text-white text-xs tracking-widest uppercase"
                    >
                      <span>View Gallery</span>
                      <div className="w-8 h-[1px] bg-white group-hover:w-12 transition-all duration-300"></div>
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
};

export default Explore;