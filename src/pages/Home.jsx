import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const wondersData = [
  { id: "colosseum", name: "The Colosseum", location: "Rome, Italy", shortDesc: "An epic symbol of the Roman Empire's architectural prowess and engineering.", image: "images/colosseum.jpeg" },
  { id: "taj-mahal", name: "Taj Mahal", location: "Agra, India", shortDesc: "A breathtaking ivory-white marble mausoleum commissioned by Shah Jahan.", image: "images/taj-mahal.jpg" },
  { id: "great-wall", name: "Great Wall of China", location: "China", shortDesc: "A series of ancient fortifications stretching across the historical northern borders.", image: "images/great-wall.jpg" },
  { id: "petra", name: "Petra", location: "Ma'an, Jordan", shortDesc: "The Rose City, famous for its rock-cut architecture and water conduit system.", image: "images/petra.jpg" },
  { id: "chichen-itza", name: "Chichén Itzá", location: "Yucatán, Mexico", shortDesc: "A massive step pyramid known as El Castillo, built by the Maya people.", image: "images/chichen-itza.jpg" },
  { id: "machu-picchu", name: "Machu Picchu", location: "Cusco Region, Peru", shortDesc: "An Incan citadel set high in the Andes Mountains, built in the 15th century.", image: "images/machu-picchu.jpg" },
  { id: "christ-redeemer", name: "Christ the Redeemer", location: "Rio de Janeiro, Brazil", shortDesc: "A colossal Art Deco statue of Jesus Christ created by Paul Landowski.", image: "images/christ-redeemer.jpg" }
];

const Home = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Initial Hero Animation
      const tl = gsap.timeline();
      tl.fromTo(".mask-text", 
        { y: "100%", opacity: 0 }, 
        { y: "0%", opacity: 1, duration: 1, stagger: 0.1, ease: "power4.out" }
      ).fromTo(".hero-desc",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      );

      // 2. PERFORMANCE FIX: Use ScrollTrigger.batch for the grid
      // This is much lighter than a forEach loop
      ScrollTrigger.batch(".wonder-card", {
        start: "top 90%",
        onEnter: (batch) => gsap.fromTo(batch, 
          { opacity: 0, y: 60, scale: 0.98 }, 
          { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            stagger: 0.1, 
            duration: 0.8, 
            ease: "power3.out",
            overwrite: true 
          }
        ),
        // Forces GPU to keep the elements in memory for smoother scrolling
        onLeaveBack: (batch) => gsap.set(batch, { opacity: 0, y: 60, scale: 0.98 })
      });

    }, containerRef);

    return () => ctx.revert(); 
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen pb-24 overflow-hidden bg-neutral-950">
      
      {/* Background Ambience */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[20%] right-[-5%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, transparent 20%, #0a0a0a 120%)' }}></div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 pt-20">
        
        {/* Hero Section */}
        <div className="text-center mb-32 mt-10 flex flex-col items-center">
          <div className="overflow-hidden mb-2">
            <h1 className="mask-text text-5xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-neutral-300 to-neutral-700 uppercase">
              The Seven
            </h1>
          </div>
          <div className="overflow-hidden mb-8">
            <h1 className="mask-text text-5xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-neutral-300 to-neutral-700 uppercase">
              Wonders
            </h1>
          </div>
          <p className="hero-desc text-neutral-400 max-w-2xl mx-auto text-lg md:text-xl font-light tracking-widest uppercase text-sm">
            A visual anthology of human architectural mastery.
          </p>
        </div>

        {/* Wonders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {wondersData.map((wonder) => (
            <Link 
              to={`/wonder/${wonder.id}`} 
              key={wonder.id}
              /* will-change-transform tells the browser to optimize for movement */
              className="wonder-card group relative block h-[450px] overflow-hidden rounded-3xl bg-neutral-900 border border-white/5 hover:border-white/30 transition-all duration-500 will-change-transform transform-gpu"
            >
              
              <div className="absolute inset-0 bg-neutral-900 overflow-hidden">
                <img 
                  src={`${import.meta.env.BASE_URL}${wonder.image}`} 
                  alt={wonder.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100 will-change-transform"
                  loading="lazy"
                  /* Decodes the image off the main thread to prevent lag */
                  decoding="async" 
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-90"></div>

              <div className="absolute bottom-0 left-0 p-8 z-20 w-full transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <div className="overflow-hidden mb-2">
                  <p className="text-[10px] tracking-[0.3em] text-neutral-400 uppercase transform group-hover:text-white transition-colors duration-300">{wonder.location}</p>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-light text-white mb-4 tracking-wide">{wonder.name}</h2>
                
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-out">
                  <div className="overflow-hidden">
                    <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-light line-clamp-2">
                      {wonder.shortDesc}
                    </p>
                    
                    <div className="inline-flex items-center text-xs tracking-[0.2em] text-white uppercase border-b border-white/20 pb-1 group-hover:border-white transition-colors duration-300">
                      Uncover History 
                      <span className="ml-3 transform transition-transform duration-300 group-hover:translate-x-1">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;