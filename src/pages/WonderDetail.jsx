import { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Enriched data with deep-dive content
const wondersData = [
  {
    id: "colosseum",
    name: "The Colosseum",
    location: "Rome, Italy",
    year: "80 AD",
    coordinates: "41.8902° N, 12.4922° E",
    shortDesc: "An epic symbol of the Roman Empire's architectural prowess.",
    fullHistory: "The Colosseum, originally known as the Flavian Amphitheatre, is an oval amphitheatre in the centre of the city of Rome, Italy. Just east of the Roman Forum, it is the largest ancient amphitheatre ever built, and is still the largest standing amphitheatre in the world today, despite its age. Construction began under the emperor Vespasian (r. 69–79 AD) in 72 and was completed in 80 AD under his successor and heir, Titus.",
    architecturalDetails: "Built of travertine limestone, tuff (volcanic rock), and brick-faced concrete, it could hold an estimated 50,000 to 80,000 spectators at various points in its history over the centuries, having an average audience of some 65,000; it was used for gladiatorial contests and public spectacles including animal hunts, executions, re-enactments of famous battles, and dramas based on Roman mythology."
  },
  // We'll use a dynamic fallback for the other 6 so the code isn't 10,000 lines long here
];

// Fallback data generator for the other 6 wonders so the page always works
const getWonderData = (id) => {
  const found = wondersData.find(w => w.id === id);
  if (found) return found;
  
  // Fallback structure for wonders we haven't written the massive paragraphs for yet
  return {
    id: id,
    name: id.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    location: "Global Coordinates",
    year: "Unknown Antiquity",
    coordinates: "Data Pending...",
    fullHistory: "History is currently being archived. Check back soon for the complete documentary experience regarding this architectural marvel. The sheer scale of human ingenuity required to construct this remains one of the great triumphs of the ancient world.",
    architecturalDetails: "Engineering schematics and material breakdowns are currently being verified by our historical team. The structural integrity and design methodologies utilized in this era continue to baffle modern architectural scholars."
  };
};

const WonderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  
  const wonder = getWonderData(id);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Hero Reveal Parallax
      tl.fromTo(".hero-bg", 
        { scale: 1.2, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 2, ease: "power3.out" }
      )
      .fromTo(".hero-data", 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power2.out" },
        "-=1.5"
      )
      .fromTo(".hero-title", 
        { y: "100%" }, 
        { y: "0%", duration: 1.2, ease: "expo.out" },
        "-=1.2"
      );

      // 2. Parallax Scroll Effect on Hero Image
      gsap.to(".hero-bg", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // 3. Editorial Text Reveal on Scroll
      gsap.utils.toArray('.reveal-paragraph').forEach(p => {
        gsap.fromTo(p, 
          { opacity: 0, y: 40 },
          {
            scrollTrigger: {
              trigger: p,
              start: "top 85%",
            },
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out"
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, [id]);

  return (
    <div ref={containerRef} className="bg-neutral-950 min-h-screen text-neutral-50 selection:bg-white/20">
      
      {/* 1. HERO SECTION (100vh) */}
      <div className="hero-section relative h-screen w-full overflow-hidden flex flex-col justify-end pb-24 px-4 sm:px-6 lg:px-12 pt-20">
        
        {/* Dynamic Image Layer */}
        <div className="hero-bg absolute inset-0 bg-neutral-900 border-b border-white/10 z-0 flex items-center justify-center">
          {/* Subtle noise texture */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, transparent 20%, #0a0a0a 120%)' }}></div>
          {/* Placeholder text for the image */}
          <div className="text-center">
             <p className="text-neutral-700 tracking-[0.5em] text-xs uppercase mb-2">Cinematic establishing shot</p>
             <p className="text-neutral-600 font-bold text-2xl">{wonder.id}-hero.jpg</p>
          </div>
        </div>

        {/* Heavy dark gradient so text is always readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent z-10"></div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-8">
          
          <div className="w-full md:w-2/3">
            <button 
              onClick={() => navigate(-1)}
              className="hero-data group inline-flex items-center gap-4 text-neutral-400 hover:text-white transition-colors duration-300 text-xs tracking-[0.2em] uppercase mb-12"
            >
              <span className="transform group-hover:-translate-x-2 transition-transform duration-300">←</span>
              Back to Archive
            </button>
            
            <div className="hero-data flex flex-wrap gap-4 md:gap-8 mb-6 text-xs tracking-[0.3em] uppercase text-neutral-400">
              <span className="border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm bg-black/20">{wonder.location}</span>
              <span className="border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm bg-black/20">Constructed: {wonder.year}</span>
            </div>
            
            <div className="overflow-hidden pb-4">
              <h1 className="hero-title text-6xl md:text-[8rem] font-light tracking-tighter leading-none text-white">
                {wonder.name}
              </h1>
            </div>
          </div>

          {/* Coordinates Block */}
          <div className="hero-data w-full md:w-1/3 md:text-right hidden md:block">
            <p className="text-neutral-500 text-xs tracking-widest uppercase mb-2">Coordinates</p>
            <p className="text-xl font-light tracking-widest">{wonder.coordinates}</p>
          </div>
        </div>
      </div>


      {/* 2. EDITORIAL CONTENT SECTION */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        
        {/* Intro */}
        <div className="mb-32">
          <p className="text-2xl md:text-4xl font-light text-neutral-300 leading-relaxed reveal-paragraph">
            {wonder.shortDesc}
          </p>
        </div>

        {/* Chapter 1: History */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-12 mb-32 border-t border-white/10 pt-16">
          <div>
            <h3 className="text-xs tracking-[0.3em] uppercase text-neutral-500 sticky top-32">01 / The History</h3>
          </div>
          <div>
            <p className="text-lg md:text-xl text-neutral-400 leading-relaxed font-light reveal-paragraph">
              {wonder.fullHistory}
            </p>
          </div>
        </div>

        {/* Full Width Image Break */}
        <div className="w-full h-[50vh] bg-neutral-900 border border-white/5 rounded-2xl mb-32 flex items-center justify-center reveal-paragraph overflow-hidden group">
           <div className="text-neutral-700 tracking-[0.3em] text-xs uppercase group-hover:scale-110 transition-transform duration-1000">Architectural Diagram Placeholder</div>
        </div>

        {/* Chapter 2: Engineering */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-12 mb-32 border-t border-white/10 pt-16">
          <div>
            <h3 className="text-xs tracking-[0.3em] uppercase text-neutral-500 sticky top-32">02 / Engineering</h3>
          </div>
          <div>
            <p className="text-lg md:text-xl text-neutral-400 leading-relaxed font-light reveal-paragraph">
              {wonder.architecturalDetails}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default WonderDetail;