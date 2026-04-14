import { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// The God-Level Enriched Data Payload
const wondersData = [
  {
    id: "colosseum",
    name: "The Colosseum",
    location: "Rome, Italy",
    year: "80 AD",
    coordinates: "41.8902° N, 12.4922° E",
    shortDesc: "An epic symbol of the Roman Empire's architectural prowess and a masterclass in ancient crowd control.",
    fullHistory: `The Colosseum, originally known as the Flavian Amphitheatre, was commissioned around 70-72 AD by Emperor Vespasian of the Flavian dynasty as a gift to the Roman people. Built on the site of Nero's grand palace to distance the new regime from the previous tyrant, it was completed in 80 AD by his son, Titus, with 100 days of inaugural games. 

    For over four centuries, it stood as the beating heart of Roman public life. It hosted brutal gladiatorial combats, wild animal hunts featuring exotic beasts imported from across the empire, public executions, and even spectacular mock sea battles (naumachiae) before the basement was completely built out. 
    
    After the fall of the Western Roman Empire, the amphitheatre ceased to be used for large-scale entertainment. It was later repurposed for housing, workshops, a fortress, a quarry, and a Christian shrine. Today, despite being ruined by earthquakes and stone-robbers, it remains an iconic global symbol of Imperial Rome.`,
    architecturalDetails: `Measuring 189 meters long and 156 meters wide, the Colosseum is the largest ancient amphitheatre ever built. Unlike earlier Greek theatres built into hillsides, it is a freestanding structure made of travertine limestone, volcanic tuff, and brick-faced concrete. 

    Its brilliant elliptical design and complex vaulting system allowed it to comfortably seat between 50,000 to 80,000 spectators. The seating was strictly divided by social class, with the emperor and senators at the bottom, and the lower classes at the top. 

    Perhaps its most impressive engineering feat was the hypogeum, added by Emperor Domitian. This was a two-level subterranean network of tunnels and 32 animal pens beneath the arena floor. It featured 80 vertical shafts providing instant access to the arena for caged animals and scenery pieces, operated by a complex system of wooden elevators and pulleys worked by hundreds of slaves.`
  },
  {
    id: "taj-mahal",
    name: "Taj Mahal",
    location: "Agra, India",
    year: "1653",
    coordinates: "27.1751° N, 78.0421° E",
    shortDesc: "A breathtaking ivory-white marble mausoleum that stands as the ultimate testament to love and Mughal symmetry.",
    fullHistory: `Commissioned in 1632 by the Mughal emperor Shah Jahan, the Taj Mahal was built to house the tomb of his favorite wife, Mumtaz Mahal, who died during childbirth. The project was a massive undertaking that drew upon the vast wealth of the Mughal Empire, requiring a workforce of over 20,000 artisans, architects, and laborers drawn from across India, Persia, the Ottoman Empire, and Europe.

    Construction of the mausoleum was essentially completed in 1643, but work continued on other phases of the project for another 10 years. The Taj Mahal complex is believed to have been completed in its entirety in 1653 at a cost estimated at the time to be around 32 million rupees.
    
    Tragically, shortly after its completion, Shah Jahan was deposed by his son Aurangzeb and put under house arrest at the nearby Agra Fort. Upon his death, he was buried next to his wife inside the Taj Mahal, the only asymmetrical element in the entire complex.`,
    architecturalDetails: `The Taj Mahal represents the pinnacle of Mughal architecture, a style that seamlessly combines Indian, Persian, and Islamic influences. The central focus is the tomb itself, a symmetrical, white marble structure standing on a square plinth, topped by a massive, 35-meter tall onion dome and a lotus finial.

    The exterior decorations are widely considered to be among the finest in Mughal architecture. The exquisite pietra dura inlay work features semi-precious stones like lapis lazuli, jade, and crystal embedded into the marble to form intricate geometric patterns, calligraphy of Quranic verses, and floral motifs.

    Engineering genius is evident throughout the complex. The four minarets framing the tomb were intentionally constructed to tilt slightly outward; in the event of an earthquake, they would fall away from the tomb rather than crash into it. Furthermore, the optical illusions engineered into the structure—such as the Arabic calligraphy increasing in size as it gets higher so it appears uniform from the ground—showcase a profound understanding of perspective.`
  },
  {
    id: "great-wall",
    name: "Great Wall of China",
    location: "Northern China",
    year: "7th C. BC - 1644 AD",
    coordinates: "40.4319° N, 116.5704° E",
    shortDesc: "A sprawling series of ancient fortifications stretching across historical borders, representing sheer human endurance.",
    fullHistory: `The Great Wall of China is not a single, continuous wall, but rather a complex network of walls, trenches, and fortifications built by various Chinese imperial dynasties over two millennia. The earliest walls date back to the 7th century BC, built by ancient Chinese states to defend their territories against nomadic incursions from the Eurasian Steppe.

    When Qin Shi Huang unified China in 221 BC to become its first emperor, he ordered the destruction of walls dividing his empire and the connection of northern walls to form a united defense against the Xiongnu people. Little of this original Qin wall remains today. 
    
    The most famous and best-preserved sections of the wall were built much later during the Ming dynasty (1368–1644). The Ming heavily reinforced the wall following their defeat by the Oirats in the Battle of Tumu. Driven by the constant threat of Mongol invasions, they utilized advanced construction techniques to create the formidable stone and brick barrier that characterizes the wall today.`,
    architecturalDetails: `Measuring an astonishing official length of 21,196 kilometers (13,170 miles), the Great Wall is a masterclass in military architecture adapted to extreme terrain. Before the use of bricks, the wall was mainly built from rammed earth, stones, and wood. During the Ming dynasty, however, bricks and massive stone blocks were used, significantly increasing the structural integrity and longevity.

    The wall was a highly sophisticated military defense system. It incorporated thousands of watchtowers, troop barracks, garrison stations, and signaling capabilities. 
    
    Communication was handled through a highly efficient smoke and fire signaling system. A signal fire lit on one tower could be relayed across hundreds of miles in a matter of hours, alerting the capital to troop movements faster than any rider on horseback. The height and width of the wall varied significantly depending on the terrain, but in key areas, it was wide enough to allow five horses to ride abreast.`
  },
  {
    id: "petra",
    name: "Petra",
    location: "Ma'an, Jordan",
    year: "c. 5th C. BC",
    coordinates: "30.3285° N, 35.4414° E",
    shortDesc: "The Rose City, a half-built, half-carved archaeological marvel hidden deep within a narrow desert gorge.",
    fullHistory: `Nestled among the rugged desert canyons and mountains of southern Jordan, Petra was the thriving capital of the Nabataean Kingdom from the 4th century BC to the 1st century AD. The Nabataeans were nomadic Arabs who leveraged Petra's proximity to major incense, silk, and spice trade routes to amass incredible wealth and regional power.

    The city's fortunes began to decline after the Roman Empire annexed the kingdom in 106 AD and shifted the trade routes to sea lanes. A massive earthquake in 363 AD destroyed many of the city's structures and critically damaged its vital water management system, accelerating its abandonment.
    
    By the Islamic era, Petra had essentially become a lost city, known only to local Bedouin tribes. It remained hidden from the Western world until 1812, when Swiss explorer Johann Ludwig Burckhardt disguised himself as an Arab scholar to infiltrate the heavily guarded area and reintroduce the "Rose City" to Europe.`,
    architecturalDetails: `Petra is globally famous for its rock-cut architecture, where massive, elaborate structures were carved directly into the sheer, rose-red sandstone cliff faces. The most iconic of these is Al-Khazneh (The Treasury). Standing nearly 40 meters high, its intricately detailed Hellenistic facade was carved top-down out of a single rock face to serve as a mausoleum for a Nabataean king.

    However, the true engineering marvel of Petra was its highly advanced hydrological system. Located in a harsh, arid environment that received only a few inches of rain annually, the Nabataeans engineered a complex network of dams, cisterns, and rock-carved water conduits (channels). 

    This system not only controlled the deadly flash floods that plagued the narrow Siq (the main canyon entrance), but it also stored the water and distributed it throughout the city, allowing a population of over 20,000 people to thrive in a barren desert and even maintain lush, decorative gardens. `
  },
  {
    id: "chichen-itza",
    name: "Chichén Itzá",
    location: "Yucatán, Mexico",
    year: "c. 600 AD",
    coordinates: "20.6843° N, 88.5678° W",
    shortDesc: "A sprawling pre-Columbian city built by the Maya people, renowned for its astronomical alignment and acoustic engineering.",
    fullHistory: `Chichén Itzá was a massive, densely populated Mesoamerican city and a major economic power in the northern Maya lowlands. Rising to prominence toward the end of the Early Classic period (c. 600 AD), it became a diverse cultural hub, heavily influencing the architectural styles found throughout the region.

    The city's location was highly strategic, centered around two large, natural sinkholes known as cenotes. These provided a vital, year-round water supply in a region devoid of above-ground rivers. The Sacred Cenote, in particular, was a site of religious pilgrimage where the Maya offered precious artifacts and human sacrifices to the rain god, Chaac.
    
    The city experienced a mysterious decline in the 13th century, long before the arrival of the Spanish. While it was never completely abandoned, its political and economic dominance fell away. Today, it stands as one of the most thoroughly excavated and deeply studied archaeological sites in the Americas.`,
    architecturalDetails: `The architectural crown jewel of Chichén Itzá is the Temple of Kukulcán, often referred to as El Castillo. This 30-meter high step pyramid is a physical manifestation of the Mayan calendar. It features four stairways, each with 91 steps, which, when added to the top platform, equals 365—the number of days in the solar year.

    El Castillo is globally famous for an astronomical phenomenon engineered into its design. During the spring and autumn equinoxes, the late afternoon sun casts a series of triangular shadows against the northwest balustrade, creating the illusion of a massive feathered serpent slithering down the pyramid to join the stone serpent head at the base.

    The site also boasts the largest Mesoamerican ballcourt ever discovered, measuring 166 by 68 meters. The acoustics of the court are so finely tuned that a whisper at one end can be clearly heard at the other, an engineering feat that still puzzles modern acoustical experts.`
  },
  {
    id: "machu-picchu",
    name: "Machu Picchu",
    location: "Cusco Region, Peru",
    year: "c. 1450 AD",
    coordinates: "13.1631° S, 72.5450° W",
    shortDesc: "An awe-inspiring Incan citadel set high in the Andes Mountains, built entirely without the use of mortar or wheels.",
    fullHistory: `Constructed around 1450 AD during the height of the Inca Empire, Machu Picchu was built as a royal estate for the Inca emperor Pachacuti. It was not a conventional city, but rather a private retreat and religious sanctuary for Incan nobility and their servants, housing an estimated maximum population of about 750 people.

    The site was only used for about 80 years before it was mysteriously abandoned, coincidentally around the time of the Spanish Conquest in the 1530s. Because the Spanish never found Machu Picchu, it was largely spared the destruction and plundering that befell other Incan sites.
    
    Over the centuries, the surrounding jungle aggressively reclaimed the citadel, hiding it from the outside world. It wasn't until 1911 that American historian Hiram Bingham, led by local indigenous farmers, brought the spectacular ruins to international attention.`,
    architecturalDetails: `Machu Picchu represents the absolute zenith of Incan engineering. Built on a precarious mountain ridge 2,430 meters above sea level, the site sits atop two fault lines. To combat the frequent earthquakes, the Incas used a dry-stone technique called ashlar. The massive granite stones were cut and polished to fit together so tightly that not even a blade of grass can fit between them. 

    When an earthquake hits, the stones of Machu Picchu are designed to "dance"—they bounce through the tremors and then settle perfectly back into their original places. Furthermore, doors and windows are trapezoidal (tilting inward at the top) to provide incredible structural stability.

    Equally impressive is what lies beneath the surface. Over 60% of the construction effort at Machu Picchu was dedicated to underground site preparation. The Incas built hundreds of terraces reinforced with stone and layered with gravel and topsoil. This engineering masterstroke prevented the entire city from sliding off the mountain during heavy torrential rains, filtering the water harmlessly down the slopes.`
  },
  {
    id: "christ-redeemer",
    name: "Christ the Redeemer",
    location: "Rio de Janeiro, Brazil",
    year: "1931",
    coordinates: "22.9519° S, 43.2105° W",
    shortDesc: "A colossal Art Deco statue of Jesus Christ overlooking Rio de Janeiro, symbolizing peace and cultural identity.",
    fullHistory: `The idea of placing a massive Christian monument on top of Corcovado mountain was first suggested in the 1850s by a Vincentian priest, but it wasn't until 1920 that the Catholic Circle of Rio successfully petitioned for its construction. The campaign was driven by a desire to reclaim the city's religious identity in the wake of advancing secularism in Brazil.

    The statue was designed by Brazilian engineer Heitor da Silva Costa and French sculptor Paul Landowski. Construction began in 1922 to commemorate the centenary of Brazil's independence from Portugal. The massive project took nine years to complete, with all the necessary materials and workers transported up the steep, 700-meter high mountain via a small cog railway.
    
    Funded almost entirely by donations from the Brazilian Catholic community, the monument was officially opened on October 12, 1931. Today, it is not only a profound religious symbol but a cultural icon deeply woven into the identity of Rio de Janeiro and Brazil as a whole.`,
    architecturalDetails: `Standing 30 meters (98 feet) tall, not including its 8-meter pedestal, and with its arms stretching 28 meters wide, Christ the Redeemer is the largest Art Deco statue in the world. 

    The original design called for a bronze statue, but engineer da Silva Costa realized that a reinforced concrete core was absolutely necessary to support the massive, outstretched arms and to withstand the brutal winds and frequent lightning strikes at the summit of Corcovado.

    Because bare concrete was considered too rough and unrefined for the aesthetic vision, the exterior is clad in over 6 million triangular soapstone tiles. Soapstone was specifically chosen for its enduring resistance to extreme weather and its beautiful, pale color. The tiles were meticulously glued to the concrete frame by groups of women in local parishes, many of whom wrote the names of their loved ones on the back of the tiles before they were sealed in place forever.`
  }
];

const WonderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  
  // Safely find the wonder, fallback to the first one just in case a bad URL is entered
  const wonder = wondersData.find(w => w.id === id) || wondersData[0];

  useEffect(() => {
    // Reset scroll position on route change
    window.scrollTo(0, 0);

    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Hero Entry Animation
      tl.fromTo(".hero-bg", 
        { scale: 1.1, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 1.5, ease: "power3.out" }
      )
      .fromTo(".hero-data", 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power2.out" },
        "-=1"
      )
      .fromTo(".hero-title", 
        { y: "100%" }, 
        { y: "0%", duration: 1.2, ease: "expo.out" },
        "-=0.8"
      );

      // Hero Parallax Scroll
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

      // Text Reveal on Scroll
      gsap.utils.toArray('.reveal-paragraph').forEach(p => {
        gsap.fromTo(p, 
          { opacity: 0, y: 30 },
          {
            scrollTrigger: {
              trigger: p,
              start: "top 85%",
            },
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out"
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, [id]);

  // Helper function to render line breaks perfectly in React
  const renderTextWithParagraphs = (text) => {
    return text.split('\n\n').map((paragraph, index) => (
      <p key={index} className="text-lg md:text-xl text-neutral-400 leading-relaxed font-light mb-6">
        {paragraph.trim()}
      </p>
    ));
  };

  return (
    <div ref={containerRef} className="bg-neutral-950 min-h-screen text-neutral-50 selection:bg-white/20">
      
      {/* 1. HERO SECTION (100vh) */}
      <div className="hero-section relative h-screen w-full overflow-hidden flex flex-col justify-end pb-16 md:pb-24 px-4 sm:px-6 lg:px-12 pt-20">
        
        {/* Dynamic Image Layer */}
        <div className="hero-bg absolute inset-0 bg-neutral-900 border-b border-white/10 z-0 flex items-center justify-center">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, transparent 20%, #0a0a0a 120%)' }}></div>
          <div className="text-center">
             <p className="text-neutral-700 tracking-[0.5em] text-xs uppercase mb-2">High Resolution Asset Required</p>
             <p className="text-neutral-600 font-bold text-xl md:text-2xl">{wonder.id}-hero.jpg</p>
          </div>
        </div>

        {/* Text Readability Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-transparent z-10"></div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-8">
          
          <div className="w-full md:w-3/4">
            <button 
              onClick={() => navigate(-1)}
              className="hero-data group inline-flex items-center gap-4 text-neutral-400 hover:text-white transition-colors duration-300 text-xs tracking-[0.2em] uppercase mb-8 md:mb-12"
            >
              <span className="transform group-hover:-translate-x-2 transition-transform duration-300">←</span>
              Back
            </button>
            
            <div className="hero-data flex flex-wrap gap-3 md:gap-6 mb-4 md:mb-6 text-[10px] md:text-xs tracking-[0.3em] uppercase text-neutral-400">
              <span className="border border-white/10 px-4 py-2 rounded-full backdrop-blur-md bg-black/30">{wonder.location}</span>
              <span className="border border-white/10 px-4 py-2 rounded-full backdrop-blur-md bg-black/30">Era: {wonder.year}</span>
            </div>
            
            <div className="overflow-hidden pb-2 md:pb-4">
              <h1 className="hero-title text-5xl sm:text-7xl md:text-[8rem] font-light tracking-tighter leading-none text-white">
                {wonder.name}
              </h1>
            </div>
          </div>

          {/* Coordinates */}
          <div className="hero-data w-full md:w-1/4 md:text-right hidden sm:block">
            <p className="text-neutral-500 text-[10px] tracking-widest uppercase mb-2">Coordinates</p>
            <p className="text-sm md:text-lg font-light tracking-widest">{wonder.coordinates}</p>
          </div>
        </div>
      </div>


      {/* 2. EDITORIAL CONTENT SECTION */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        
        {/* Intro */}
        <div className="mb-20 md:mb-32">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-neutral-200 leading-tight md:leading-relaxed reveal-paragraph border-l-2 border-white/20 pl-6 md:pl-10">
            {wonder.shortDesc}
          </h2>
        </div>

        {/* Chapter 1: History */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-8 md:gap-16 mb-20 md:mb-32 border-t border-white/10 pt-16">
          <div>
            <h3 className="text-xs tracking-[0.3em] uppercase text-neutral-500 md:sticky md:top-32 mb-6 md:mb-0">01 / The History</h3>
          </div>
          <div className="reveal-paragraph">
            {/* Renders the massive text string beautifully with paragraph tags */}
            {renderTextWithParagraphs(wonder.fullHistory)}
          </div>
        </div>

        {/* Full Width Image Break */}
        <div className="w-full h-[30vh] md:h-[60vh] bg-neutral-900 border border-white/5 rounded-2xl mb-20 md:mb-32 flex items-center justify-center reveal-paragraph overflow-hidden group">
           <div className="text-neutral-700 tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs uppercase group-hover:scale-110 transition-transform duration-1000">Architectural Diagram Placeholder</div>
        </div>

        {/* Chapter 2: Engineering */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-8 md:gap-16 mb-20 md:mb-32 border-t border-white/10 pt-16">
          <div>
            <h3 className="text-xs tracking-[0.3em] uppercase text-neutral-500 md:sticky md:top-32 mb-6 md:mb-0">02 / Engineering</h3>
          </div>
          <div className="reveal-paragraph">
            {renderTextWithParagraphs(wonder.architecturalDetails)}
          </div>
        </div>

      </div>

    </div>
  );
};

export default WonderDetail;