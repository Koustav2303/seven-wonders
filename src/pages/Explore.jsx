import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Enriched data with EXACT image paths (Note the .jpeg for Colosseum)
const wondersData = [
  { id: "colosseum", name: "The Colosseum", location: "Rome, Italy", year: "80 AD", image: "images/colosseum.jpeg" },
  { id: "taj-mahal", name: "Taj Mahal", location: "Agra, India", year: "1653", image: "images/taj-mahal.jpg" },
  { id: "great-wall", name: "Great Wall", location: "China", year: "7th C. BC", image: "images/great-wall.jpg" },
  { id: "petra", name: "Petra", location: "Jordan", year: "5th C. BC", image: "images/petra.jpg" },
  { id: "chichen-itza", name: "Chichén Itzá", location: "Mexico", year: "600 AD", image: "images/chichen-itza.jpg" },
  { id: "machu-picchu", name: "Machu Picchu", location: "Peru", year: "1450 AD", image: "images/machu-picchu.jpg" },
  { id: "christ-redeemer", name: "Christ Redeemer", location: "Brazil", year: "1931", image: "images/christ-redeemer.jpg" }
];

const Explore = () => {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      let panels = gsap.utils.toArray(".explore-panel");

      // 1. The God-Level Horizontal Scroll
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1, // Smooth scrubbing
          snap: {
            snapTo: 1 / (panels.length - 1),
            duration: { min: 0.2, max: 0.6 },
            delay: 0.1,
            ease: "power1.inOut"
          },
          end: () => "+=" + sliderRef.current.offsetWidth
        }
      });

      // 2. Animate elements inside each panel as they come into view
      panels.forEach((panel) => {
        // Animate the text
        gsap.fromTo(panel.querySelectorAll(".explore-text"), 
          { opacity: 0, y: 50 },
          {
            opacity: 1, 
            y: 0, 
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: gsap.getById("horizontalScroll"), 
              start: "left 75%", 
              toggleActions: "play none none reverse"
            }
          }
        );

        // Animate the image wrapper for a cinematic reveal
        gsap.fromTo(panel.querySelector(".explore-image-wrapper"),
          { opacity: 0, scale: 0.9, rotateY: 15 },
          {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: gsap.getById("horizontalScroll"),
              start: "left 75%",
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
      <div className="h-[50vh] flex flex-col items-center justify-center border-b border-white/5 relative">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, transparent 20%, #0a0a0a 120%)' }}></div>
        <p className="text-neutral-500 tracking-[0.5em] text-xs md:text-sm uppercase mb-4 z-10">Interactive Timeline</p>
        <h1 className="text-3xl md:text-6xl font-light text-white uppercase tracking-widest z-10 text-center px-4">Scroll to Explore</h1>
        <div className="w-[1px] h-16 md:h-24 bg-gradient-to-b from-white/20 to-transparent mt-8 md:mt-12 animate-pulse z-10"></div>
      </div>

      {/* The Horizontal Scroll Container */}
      <div ref={containerRef} className="explore-container h-screen flex flex-col justify-center overflow-hidden bg-neutral-950 relative">
        
        {/* Progress Guide Line */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 z-0 hidden md:block"></div>

        <div ref={sliderRef} className="flex h-[85vh] md:h-[75vh] w-[700vw] items-center" id="horizontalScroll">
          
          {wondersData.map((wonder, index) => (
            <div 
              key={wonder.id} 
              className="explore-panel w-screen h-full flex items-center justify-center relative px-6 md:px-20"
            >
              {/* Massive Background Number - Scaled for mobile */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[12rem] md:text-[30rem] font-black text-white/[0.03] select-none pointer-events-none z-0 tracking-tighter">
                0{index + 1}
              </div>

              {/* Main Content Layout */}
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full max-w-7xl gap-8 md:gap-16">
                
                {/* Image Section */}
                <div className="explore-image-wrapper w-full md:w-1/2 h-[40vh] md:h-[60vh] bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden relative group shadow-2xl perspective-1000">
                  {/* Dynamic Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/20 to-transparent z-10 pointer-events-none transition-opacity duration-700 group-hover:opacity-40"></div>
                  
                  {/* Actual Image Injection */}
                  <img 
                    src={`${import.meta.env.BASE_URL}${wonder.image}`} 
                    alt={wonder.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] grayscale-[30%] group-hover:grayscale-0"
                    loading="lazy"
                  />
                </div>

                {/* Typography / Information Section */}
                <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left mt-4 md:mt-0">
                  <div className="explore-text overflow-hidden mb-2 md:mb-4">
                    <p className="text-neutral-400 tracking-[0.3em] text-[10px] md:text-xs uppercase">
                      {wonder.location} <span className="mx-2 text-white/30">|</span> {wonder.year}
                    </p>
                  </div>
                  
                  <div className="explore-text overflow-hidden mb-8 md:mb-10">
                    <h2 className="text-4xl sm:text-5xl md:text-7xl font-light text-white leading-tight tracking-tight">
                      {wonder.name}
                    </h2>
                  </div>
                  
                  <div className="explore-text">
                    <Link 
                      to={`/wonder/${wonder.id}`}
                      className="group inline-flex items-center justify-center md:justify-start gap-4 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all duration-500 text-white text-[10px] md:text-xs tracking-widest uppercase backdrop-blur-md"
                    >
                      <span>Enter Archive</span>
                      <div className="w-6 md:w-8 h-[1px] bg-white group-hover:w-12 transition-all duration-500"></div>
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