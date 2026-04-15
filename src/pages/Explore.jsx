import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const wondersData = [
  { id: "colosseum", name: "The Colosseum", location: "Rome, Italy", year: "80 AD", image: "images/colosseum.jpeg", color: "#1a1212" },
  { id: "taj-mahal", name: "Taj Mahal", location: "Agra, India", year: "1653", image: "images/taj-mahal.jpg", color: "#121a1a" },
  { id: "great-wall", name: "Great Wall", location: "China", year: "7th C. BC", image: "images/great-wall.jpg", color: "#1a1a12" },
  { id: "petra", name: "Petra", location: "Jordan", year: "5th C. BC", image: "images/petra.jpg", color: "#1f1412" },
  { id: "chichen-itza", name: "Chichén Itzá", location: "Mexico", year: "600 AD", image: "images/chichen-itza.jpg", color: "#121a15" },
  { id: "machu-picchu", name: "Machu Picchu", location: "Peru", year: "1450 AD", image: "images/machu-picchu.jpg", color: "#14121a" },
  { id: "christ-redeemer", name: "Christ Redeemer", location: "Brazil", year: "1931", image: "images/christ-redeemer.jpg", color: "#121a12" }
];

const Explore = () => {
  const componentRef = useRef(null);
  const desktopContainerRef = useRef(null); // NEW: Dedicated pinning wrapper
  const sliderRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // ==========================================
      // DESKTOP & TABLET ANIMATIONS (> 768px)
      // ==========================================
      mm.add("(min-width: 768px)", () => {
        const panels = gsap.utils.toArray(".explore-panel");

        // 1. Horizontal Scroll Tween
        const scrollTween = gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: desktopContainerRef.current, // FIX: Pin the wrapper, not the slider itself
            pin: true,
            scrub: 1,
            snap: {
              snapTo: 1 / (panels.length - 1),
              duration: { min: 0.2, max: 0.6 },
              ease: "power1.inOut"
            },
            end: () => "+=" + sliderRef.current.offsetWidth,
            onUpdate: (self) => {
              // Real-time progress bar update
              gsap.to(progressBarRef.current, { scaleX: self.progress, duration: 0.1, ease: "none" });
            }
          },
        });

        panels.forEach((panel, i) => {
          // Text Reveal
          gsap.fromTo(panel.querySelectorAll(".explore-text"),
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: "left 75%",
                toggleActions: "play none none reverse",
              }
            }
          );

          // Image Parallax Depth
          gsap.fromTo(panel.querySelector(".explore-image"),
            { x: 100, scale: 1.2 },
            {
              x: 0,
              scale: 1,
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: "left right",
                end: "center center",
                scrub: true,
              }
            }
          );

          // Background Color Shift 
          gsap.to(".dynamic-bg", {
            backgroundColor: wondersData[i].color,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: "left center",
              end: "right center",
              scrub: true,
            }
          });
        });
      });

      // ==========================================
      // MOBILE ANIMATIONS (< 768px)
      // ==========================================
      mm.add("(max-width: 767px)", () => {
        const mobilePanels = gsap.utils.toArray(".mobile-panel");

        mobilePanels.forEach((panel, i) => {
          gsap.fromTo(panel, 
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                start: "top 80%",
              }
            }
          );

          // Image Parallax on Scroll
          gsap.fromTo(panel.querySelector(".mobile-image"),
            { y: -30, scale: 1.1 },
            {
              y: 30,
              scale: 1,
              scrollTrigger: {
                trigger: panel,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              }
            }
          );

          // Background Color Shift for Mobile
          gsap.to(".dynamic-bg", {
            backgroundColor: wondersData[i].color,
            scrollTrigger: {
              trigger: panel,
              start: "top center",
              end: "bottom center",
              scrub: true,
            }
          });
        });
      });

    }, componentRef);

    return () => ctx.revert();
  }, []);

  // 3D Tilt Effect Logic
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    gsap.to(e.currentTarget.querySelector('.explore-image-container'), {
      rotateX: ((y / rect.height) - 0.5) * -15,
      rotateY: ((x / rect.width) - 0.5) * 15,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget.querySelector('.explore-image-container'), {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "power2.out"
    });
  };

  return (
    // FIX: Changed 'overflow-hidden' to 'overflow-x-hidden'
    <div ref={componentRef} className="relative text-white overflow-x-hidden min-h-screen">

      {/* 🌌 DYNAMIC BACKGROUND */}
      <div className="dynamic-bg fixed inset-0 z-[-2] bg-neutral-950 transition-colors duration-300"></div>
      
      {/* 🌌 GLOBAL GLOW OVERLAY */}
      <div className="fixed inset-0 z-[-1] pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1), transparent 60%)' }}></div>
      <div className="fixed inset-0 z-[-1] pointer-events-none opacity-20 mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle, transparent 20%, #0a0a0a 120%)' }}></div>

      {/* 🚀 DESKTOP HORIZONTAL SCROLL (Hidden on Mobile) */}
      {/* FIX: Added dedicated desktopContainerRef with overflow-hidden restricted ONLY to this track */}
      <div ref={desktopContainerRef} className="hidden md:block h-screen w-full overflow-hidden">
        <div ref={sliderRef} className="flex w-[700vw] h-screen items-center">
          {wondersData.map((wonder, index) => (
            <div key={wonder.id} className="explore-panel w-screen h-full flex items-center justify-center relative px-8 lg:px-20">
              
              {/* Massive Background Number */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[30rem] font-black text-white/[0.03] select-none pointer-events-none z-0 tracking-tighter">
                0{index + 1}
              </div>

              <div className="relative z-10 flex items-center gap-12 lg:gap-20 max-w-7xl w-full">
                {/* 🖼 3D IMAGE CONTAINER */}
                <div 
                  className="w-1/2 h-[65vh] relative group cursor-crosshair"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="explore-image-container w-full h-full rounded-3xl overflow-hidden relative backdrop-blur-xl bg-white/5 border border-white/10 will-change-transform transform-gpu">
                    <img
                      src={`${import.meta.env.BASE_URL}${wonder.image}`}
                      alt={wonder.name}
                      className="explore-image w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
                  </div>
                </div>

                {/* 📝 TYPOGRAPHY & DATA */}
                <div className="w-1/2 flex flex-col justify-center">
                  <div className="overflow-hidden mb-4">
                    <p className="explore-text text-neutral-400 tracking-[0.4em] text-xs uppercase flex items-center gap-4">
                      <span className="w-8 h-[1px] bg-white/30"></span> {wonder.location} <span className="text-white/20">|</span> {wonder.year}
                    </p>
                  </div>

                  <div className="overflow-hidden mb-8">
                    <h2 className="explore-text text-5xl lg:text-7xl font-light text-white leading-tight tracking-tight">
                      {wonder.name}
                    </h2>
                  </div>

                  <div className="overflow-hidden">
                    <Link
                      to={`/wonder/${wonder.id}`}
                      className="explore-text inline-flex items-center gap-4 px-8 py-4 border border-white/20 rounded-full hover:bg-white/10 hover:border-white/40 transition-all duration-300 group backdrop-blur-md text-xs tracking-widest uppercase"
                    >
                      Enter Archive 
                      <span className="transform group-hover:translate-x-2 transition-transform duration-300">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 📊 REAL PROGRESS BAR */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[400px] h-[1px] bg-white/10 z-50">
          <div ref={progressBarRef} className="h-full bg-white w-full origin-left transform scale-x-0"></div>
        </div>

        {/* 🧭 FLOATING NAV DOTS */}
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-5">
          {wondersData.map((_, i) => (
            <button
              key={i}
              onClick={() => gsap.to(window, { scrollTo: i * window.innerWidth, duration: 1.2, ease: "power3.inOut" })}
              className="w-2 h-2 rounded-full border border-white/30 bg-transparent hover:bg-white hover:scale-150 transition-all duration-300"
              aria-label={`Scroll to wonder ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* 📱 MOBILE VERSION (Hidden on Desktop) */}
      <div className="md:hidden pt-32 pb-24 px-6 flex flex-col gap-24">
        <div className="text-center mb-8">
           <h1 className="text-4xl font-light tracking-widest uppercase">The Archive</h1>
           <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent mx-auto mt-6"></div>
        </div>

        {wondersData.map((wonder, index) => (
          <div key={wonder.id} className="mobile-panel flex flex-col relative">
            <div className="absolute -top-10 -left-4 text-[8rem] font-black text-white/[0.04] pointer-events-none z-0">
               0{index + 1}
            </div>
            
            <div className="w-full h-[50vh] rounded-2xl overflow-hidden relative border border-white/10 mb-6 z-10">
              <img
                src={`${import.meta.env.BASE_URL}${wonder.image}`}
                alt={wonder.name}
                className="mobile-image w-full h-full object-cover scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
            </div>

            <div className="z-20 relative px-2">
              <p className="text-[10px] text-neutral-400 tracking-[0.3em] uppercase mb-2">
                {wonder.location} | {wonder.year}
              </p>
              <h2 className="text-4xl font-light mb-6 tracking-tight leading-none">{wonder.name}</h2>
              <Link 
                to={`/wonder/${wonder.id}`} 
                className="inline-flex items-center gap-3 text-xs uppercase tracking-widest border-b border-white/30 pb-1"
              >
                Explore <span className="text-white/50">→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Explore;