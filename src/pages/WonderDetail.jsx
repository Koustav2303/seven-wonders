import { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// The God-Level Enriched Data Payload (Images + Massive Details)
const wondersData = [
  {
    id: "colosseum",
    name: "The Colosseum",
    location: "Rome, Italy",
    year: "80 AD",
    coordinates: "41.8902° N, 12.4922° E",
    image: "images/colosseum.jpeg",
    shortDesc: "An epic symbol of the Roman Empire's architectural prowess and a masterclass in ancient crowd control.",
    fullHistory: `The Colosseum, originally known as the Flavian Amphitheatre, was commissioned around 70-72 AD by Emperor Vespasian as a political gift to the Roman people. Built on the site of the tyrannical Emperor Nero's grand palace, it was a symbolic gesture of returning the heart of Rome to its citizens. It was completed in 80 AD by his son, Titus, inaugurated with 100 days of games that saw the slaughter of over 9,000 wild animals.

    For over four centuries, it stood as the ultimate theater of Roman power. It hosted brutal gladiatorial combats, dramatic executions, and elaborate hunts featuring exotic beasts like rhinos, hippos, and elephants imported from the farthest reaches of the empire. Remarkably, in its early years, the arena was completely flooded to stage 'naumachiae'—full-scale naval battles with real ships and lethal combat.
    
    The amphitheater's decline began with the fall of the Western Roman Empire. A series of massive earthquakes in the 5th and 9th centuries caused severe structural damage. It was eventually abandoned as an entertainment venue and repurposed as a fortress, a quarry for building materials (which built parts of the Vatican), and a Christian shrine. Today, it stands as the ultimate testament to Imperial Rome's grandeur and brutality.`,
    architecturalDetails: `Measuring 189 meters long, 156 meters wide, and 50 meters high, the Colosseum is the largest ancient amphitheater ever built. Unlike Greek theaters carved into hillsides, this was a freestanding marvel constructed from 100,000 cubic meters of travertine limestone, volcanic tuff, and a revolutionary Roman invention: brick-faced concrete.

    Its brilliant elliptical design and 80 numbered arched entrances allowed a capacity crowd of up to 80,000 spectators to evacuate in under 15 minutes—a feat modern stadiums still study today. Above the seating, sailors from the Roman fleet operated the 'Velarium', a massive retractable canvas awning system that protected the crowd from the blistering Mediterranean sun.

    Beneath the wooden arena floor lay the true engineering miracle: the Hypogeum. Added by Emperor Domitian, this was a claustrophobic, two-level subterranean network of tunnels and 32 animal pens. It featured 80 vertical shafts with counter-weighted elevators operated by hundreds of slaves. This system allowed gladiators, exotic beasts, and massive stage sets to instantly "magically" appear in the arena above, creating unparalleled theatrical shock and awe.`
  },
  {
    id: "taj-mahal",
    name: "Taj Mahal",
    location: "Agra, India",
    year: "1653",
    coordinates: "27.1751° N, 78.0421° E",
    image: "images/taj-mahal.jpg",
    shortDesc: "A breathtaking ivory-white marble mausoleum that stands as the ultimate testament to love and Mughal symmetry.",
    fullHistory: `Commissioned in 1632 by the Mughal Emperor Shah Jahan, the Taj Mahal is a monument born of profound grief. It was built to house the tomb of his favorite wife, Mumtaz Mahal, who died giving birth to their 14th child. To realize his vision of heaven on earth, Shah Jahan mobilized the vast wealth of the Mughal Empire, assembling a workforce of over 20,000 master artisans, stonemasons, and calligraphers from across India, Persia, the Ottoman Empire, and Europe.

    Construction of the primary mausoleum took roughly 11 years, but the surrounding complex—including the mosque, the guest house, and the main gateway—took another decade to perfect. The total cost was estimated at 32 million rupees, an astronomical sum that nearly bankrupted the empire's treasury.
    
    The story concludes in tragedy. Shortly after its completion, Shah Jahan fell ill and a vicious war of succession broke out among his sons. The victor, Aurangzeb, deposed his father and imprisoned him in the nearby Agra Fort. For the last eight years of his life, Shah Jahan could only gaze at his masterpiece through a barred window. Upon his death, he was buried next to Mumtaz, creating the only asymmetrical element in the entire complex.`,
    architecturalDetails: `The Taj Mahal represents the absolute zenith of Mughal architecture, blending Indian, Persian, and Islamic styles into perfect harmony. The central structure is built of shimmering Makrana marble that changes color depending on the time of day—glowing pink at dawn, blinding white at noon, and golden silver under the moonlight.

    The engineering required to build this massive structure on the soft, shifting banks of the Yamuna River was revolutionary. The architects dug deep wells, filled them with rocks, rubble, and timber, creating a highly stable foundation that has protected the monument from collapsing into the river for nearly 400 years. The timber remains strong to this day because it is kept constantly wet by the river water, preventing rot.

    The optical illusions engineered into the design are mind-bending. The four minarets framing the tomb lean slightly outward, so that in the event of a catastrophic earthquake, they will fall away from the main dome. Furthermore, the Quranic calligraphy inlaid around the main archways gradually increases in size as it goes higher, tricking the human eye into perceiving the text as perfectly uniform from the ground.`
  },
  {
    id: "great-wall",
    name: "Great Wall of China",
    location: "Northern China",
    year: "7th C. BC - 1644 AD",
    coordinates: "40.4319° N, 116.5704° E",
    image: "images/great-wall.jpg",
    shortDesc: "A sprawling series of ancient fortifications stretching across historical borders, representing sheer human endurance.",
    fullHistory: `The Great Wall is the longest man-made structure in human history, born not of a single unified effort, but from two millennia of war, fear, and sheer will. It began in the 7th century BC when various warring Chinese states built scattered earthen walls to defend their borders. When Emperor Qin Shi Huang unified China in 221 BC, he ordered the destruction of internal walls and the massive connection of the northern walls to hold back the fierce nomadic horsemen of the Eurasian Steppe.

    However, the iconic, winding stone dragon we envision today was primarily constructed during the Ming Dynasty (1368–1644). After a humiliating defeat by the Mongols, the Ming emperors launched an unprecedented building campaign. Millions of peasants, soldiers, and prisoners were conscripted into brutal labor conditions. The human cost was staggering; it is often grimly referred to as the "longest cemetery on earth" due to the countless workers who died and were allegedly buried within its foundations.
    
    Despite its massive scale, the wall was never completely impenetrable. It was ultimately breached in 1644, not by a frontal assault, but through betrayal, when a Ming general opened the gates at Shanhai Pass to the Manchus, leading to the fall of the Ming Dynasty and the rise of the Qing.`,
    architecturalDetails: `Stretching an incomprehensible 21,196 kilometers (13,170 miles) across deserts, grasslands, and treacherous mountain ridges, the Great Wall is a triumph of topographical engineering. While early sections were made of rammed earth and wood, the Ming Dynasty upgraded the construction to kiln-fired bricks and massive granite blocks.

    The secret to the wall's longevity lies in a bizarre but brilliant chemical innovation: sticky rice mortar. Builders mixed amylopectin (the complex carbohydrate found in sticky rice) with slaked lime. This organic-inorganic composite mortar bound the bricks together so tightly that, in many places, weeds still cannot grow between them after 600 years.

    The wall functioned as a hyper-advanced military highway and communication network. It featured thousands of watchtowers equipped with a highly sophisticated smoke and fire signaling system. A threat detected at the border could be signaled using wolf dung smoke (which burned dense and straight) from tower to tower, relaying military intelligence across a thousand miles back to the capital in a matter of hours.`
  },
  {
    id: "petra",
    name: "Petra",
    location: "Ma'an, Jordan",
    year: "c. 5th C. BC",
    coordinates: "30.3285° N, 35.4414° E",
    image: "images/petra.jpg",
    shortDesc: "The Rose City, a half-built, half-carved archaeological marvel hidden deep within a narrow desert gorge.",
    fullHistory: `Hidden deep within the unforgiving deserts of southern Jordan lies Petra, the ancient capital of the Nabataean Kingdom. The Nabataeans were originally nomadic Bedouins who recognized the strategic value of this hidden valley. By the 1st century BC, they had transformed it into an obscenely wealthy desert metropolis by taxing and controlling the vital incense, myrrh, and spice trade routes connecting Arabia, Egypt, and the Mediterranean.

    To enter the city, traders had to traverse the 'Siq'—a claustrophobic, winding, 1.2-kilometer-long gorge flanked by sheer cliffs towering 80 meters high. At the end of this dark passage, the gorge suddenly opens to reveal the breathtaking, sunlit facade of Al-Khazneh (The Treasury), designed specifically to awe exhausted travelers.
    
    Petra's dominance was absorbed by the Roman Empire in 106 AD, and the city began a slow decline as sea trade routes bypassed the desert. A catastrophic earthquake in 363 AD destroyed its vital water infrastructure, sounding the death knell for the city. It was abandoned and forgotten by the Western world for centuries, known only to local Bedouins, until a disguised Swiss explorer "rediscovered" it in 1812.`,
    architecturalDetails: `Petra is a masterclass in subtractive architecture. Instead of building from the ground up, the Nabataeans carved their massive temples, tombs, and amphitheaters directly into the living, rose-red sandstone mountains. The facades blend ancient Assyrian, Egyptian, Hellenistic, and Roman architectural styles, reflecting the city's cosmopolitan status as a global trade hub.

    But Petra's true miracle wasn't stone—it was water. The city is located in a hyper-arid region prone to deadly flash floods. The Nabataeans engineered an incredibly complex hydrological system to survive. They built a massive diversion dam at the entrance of the Siq to completely reroute floodwaters into a separate tunnel. 

    They then carved miles of intricate channels into the canyon walls, lined with waterproof cement and utilizing standardized, interlocking terracotta pipes. This gravity-fed pressure system collected mountain spring water and distributed it to hundreds of underground cisterns, providing fresh water for 30,000 citizens and even allowing them to maintain lush, decorative oasis gardens in the middle of a barren desert.`
  },
  {
    id: "chichen-itza",
    name: "Chichén Itzá",
    location: "Yucatán, Mexico",
    year: "c. 600 AD",
    coordinates: "20.6843° N, 88.5678° W",
    image: "images/chichen-itza.jpg",
    shortDesc: "A sprawling pre-Columbian city built by the Maya people, renowned for its astronomical alignment and acoustic engineering.",
    fullHistory: `Rising from the dense jungles of the Yucatán Peninsula, Chichén Itzá was one of the largest and most powerful cities of the ancient Maya civilization. Its name roughly translates to "At the mouth of the well of the Itza," referencing the massive natural sinkholes (cenotes) that provided the city's only source of fresh water and served as the spiritual center of the metropolis.

    At its peak, it was a thriving, diverse economic powerhouse that controlled the trade of salt, gold, and obsidian. The city's architecture reflects a fascinating fusion of classic Maya construction and the militaristic styles of the Toltec civilization from central Mexico, indicating either a massive cultural exchange or a dramatic conquest.
    
    The Sacred Cenote was the dark heart of Chichén Itzá's religious life. During times of severe drought, the Maya believed the rain god, Chaac, resided deep within its waters. To appease him, priests hurled vast quantities of jade, gold, incense, and living human sacrifices—including men, women, and children—into the 60-foot-deep abyss. The city mysteriously collapsed and was largely abandoned by the 13th century, long before the Spanish conquistadors arrived.`,
    architecturalDetails: `The centerpiece of the city is El Castillo (The Temple of Kukulcan), a 30-meter high step pyramid that functions as a massive, three-dimensional stone calendar. It possesses exactly 365 steps—one for every day of the solar year. Furthermore, it is perfectly aligned to the sun. During the spring and autumn equinoxes, the setting sun casts a series of triangular shadows down the northwest balustrade, creating the terrifying illusion of a massive, 120-foot feathered serpent slithering down from the heavens to the earth.

    Just as impressive is the Great Ball Court, the largest in the Americas, measuring larger than a modern football field. It was the site of the Mesoamerican ballgame, a brutal, high-stakes ritual sport where the losing team's captain was often decapitated. 

    The acoustics of the ball court are famously bewildering. If a person stands at one temple end and claps their hands, it produces exactly nine distinct echoes. Furthermore, a normal conversation spoken at one end of the 545-foot court can be heard perfectly clearly at the opposite end, a feat of acoustic engineering that modern sound architects still struggle to fully explain without the use of electronic amplification.`
  },
  {
    id: "machu-picchu",
    name: "Machu Picchu",
    location: "Cusco Region, Peru",
    year: "c. 1450 AD",
    coordinates: "13.1631° S, 72.5450° W",
    image: "images/machu-picchu.jpg",
    shortDesc: "An awe-inspiring Incan citadel set high in the Andes Mountains, built entirely without the use of mortar, iron, or wheels.",
    fullHistory: `Hovering in the clouds 2,430 meters high on a razor-thin mountain ridge, Machu Picchu is the crowning achievement of the Inca Empire. It was commissioned in the mid-15th century by Emperor Pachacuti not as a standard city, but as an exclusive royal estate, a religious sanctuary, and a heavily guarded retreat for Incan nobility. At its peak, it housed fewer than 1,000 residents, mostly priests, nobles, and the specialized artisans required to maintain the estate.

    The site was active for less than 100 years. As the Spanish conquistadors swept through South America, decimating the Inca Empire with steel and smallpox, Machu Picchu was abruptly abandoned. The exact reason remains a mystery, though historians speculate the residents may have succumbed to a localized epidemic or fled to join the final Incan resistance.
    
    Because the citadel was so remote and invisible from the valley below, the Spanish never found it. It was spared the rampant destruction and looting that erased other Incan cities. The dense Andean jungle quickly swallowed the stone structures, guarding the secret until 1911, when American historian Hiram Bingham was led up the treacherous mountain by an 11-year-old local farm boy.`,
    architecturalDetails: `Machu Picchu was built without the use of iron tools, mortar, draft animals, or the wheel. The Incas utilized an advanced dry-stone masonry technique called 'ashlar'. Granite blocks, some weighing over 50 tons, were cut and ground against each other with such microscopic precision that not even a credit card can be wedged between them today.

    This mortar-less construction was crucial for survival. Peru is highly seismically active, and Machu Picchu sits atop two fault lines. When an earthquake strikes, the lack of rigid mortar allows the stones to literally "dance" and bounce through the tremors, naturally resettling back into their exact original positions once the shaking stops. Doors and windows were built with inward-tilting trapezoidal shapes to further increase structural stability.

    However, the true marvel is entirely invisible. The mountain receives nearly 80 inches of torrential rain annually. Without advanced drainage, the entire city would have slid off the cliff centuries ago. The Incas excavated deep into the mountain, creating hundreds of agricultural terraces layered with large stones, gravel, and topsoil. This acts as a massive underground filtration system, safely routing millions of gallons of water away from the foundations and preserving the citadel against the forces of nature.`
  },
  {
    id: "christ-redeemer",
    name: "Christ the Redeemer",
    location: "Rio de Janeiro, Brazil",
    year: "1931",
    coordinates: "22.9519° S, 43.2105° W",
    image: "images/christ-redeemer.jpg",
    shortDesc: "A colossal Art Deco statue of Jesus Christ overlooking Rio de Janeiro, symbolizing peace and cultural identity.",
    fullHistory: `Perched dramatically at the summit of the 700-meter-high Corcovado mountain, Christ the Redeemer watches over the vibrant chaos of Rio de Janeiro. The idea of a massive hilltop monument was first proposed in the 1850s, but it was dismissed when Brazil became a secular republic. The project was revived in 1920 by the Catholic Circle of Rio, who viewed the growing secularism in the city as a "tide of godlessness" and crowdsourced the funding almost entirely from the Brazilian Catholic community.

    Designed by Brazilian engineer Heitor da Silva Costa and sculpted by French-Polish artisan Paul Landowski, the monument was a monumental logistical nightmare. Every piece of the statue had to be transported up the nearly vertical jungle mountain using a small, rickety cog railway. 
    
    The statue's face, projecting a calm and serene demeanor, was created by Romanian sculptor Gheorghe Leonida. After nine years of grueling labor in extreme weather conditions, the 30-meter-tall statue was inaugurated on October 12, 1931. Today, it transcends its religious origins, standing as a global icon of welcoming warmth and the enduring spirit of the Brazilian people.`,
    architecturalDetails: `Christ the Redeemer is the largest Art Deco statue in the world, stretching 28 meters wide from fingertip to fingertip. The original design called for the statue to be made of bronze, but da Silva Costa realized that the brutal Atlantic winds and frequent, violent lightning strikes at the mountain's peak would quickly destroy a metal structure.

    Instead, he pivoted to the newly invented medium of reinforced concrete. A massive concrete cross forms the skeleton of the statue. However, da Silva Costa found raw concrete to be ugly and unbefitting of a divine monument. His solution was both brilliant and beautiful: soapstone. 

    The entire exterior of the concrete shell is mosaic-clad in over six million triangular tiles of pale, durable soapstone, chosen for its high resistance to extreme weather. These millions of tiles were meticulously glued onto fabric mesh by groups of local women in Rio's parishes. In a beautiful hidden detail, many of these women wrote the names of their children, husbands, and loved ones on the back of the tiles before sealing them onto the statue, embedding the prayers of a city into the very skin of the monument.`
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
      tl.fromTo(".hero-bg-img", 
        { scale: 1.1, opacity: 0 }, 
        { scale: 1, opacity: 0.5, duration: 1.5, ease: "power3.out" } // Opacity 0.5 makes text readable
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
      gsap.to(".hero-bg-img", {
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
        
        {/* Dynamic Image Layer via Vite BASE_URL */}
        <div className="absolute inset-0 bg-neutral-950 border-b border-white/10 z-0 overflow-hidden flex items-center justify-center">
          <img 
            className="hero-bg-img w-full h-full object-cover opacity-0" // Starts at 0, GSAP animates to 0.5
            src={`${import.meta.env.BASE_URL}${wonder.image}`} 
            alt={wonder.name}
          />
          {/* Subtle noise texture over the image */}
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle, transparent 20%, #0a0a0a 120%)' }}></div>
        </div>

        {/* Text Readability Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent z-10 pointer-events-none"></div>

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

        {/* Full Width Parallax Image Break */}
        {/* We reuse the main image here, but strip the color until hover for a cool 'archival' effect */}
        <div className="w-full h-[30vh] md:h-[60vh] bg-neutral-900 border border-white/5 rounded-2xl mb-20 md:mb-32 flex items-center justify-center reveal-paragraph overflow-hidden group relative">
           <img 
            src={`${import.meta.env.BASE_URL}${wonder.image}`} 
            alt={`${wonder.name} detail`}
            className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100"
           />
           <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000 pointer-events-none"></div>
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