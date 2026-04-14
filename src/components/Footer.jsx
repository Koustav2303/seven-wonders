import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative border-t border-white/10 bg-neutral-950 pt-24 pb-10 overflow-hidden">
      
      {/* Ambient Floor Glow */}
      <div className="absolute bottom-[-20%] left-1/2 transform -translate-x-1/2 w-[800px] h-[400px] bg-white/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
      
      {/* Film Grain Texture */}
      <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, transparent 20%, #0a0a0a 120%)' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Massive Background Typography */}
        <div className="flex justify-center mb-16 lg:mb-24 pointer-events-none select-none">
          <h2 className="text-[12vw] sm:text-[10vw] leading-none font-black text-white/[0.02] tracking-tighter uppercase text-center w-full">
            The Archive
          </h2>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Brand & Status Column (Spans 5 cols) */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <Link to="/" className="text-2xl font-bold tracking-widest text-white uppercase inline-block mb-6">
                7 <span className="text-neutral-500 font-light">Wonders</span>
              </Link>
              <p className="text-neutral-400 text-sm font-light leading-relaxed max-w-sm mb-8">
                A cinematic digital exhibition exploring the zenith of ancient human engineering. Transforming static history into an immersive digital timeline.
              </p>
            </div>
            
            <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 px-4 py-3 rounded-full w-fit backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] tracking-widest text-neutral-400 uppercase">System Online // BLR, IND</span>
            </div>
          </div>

          {/* Navigation Column (Spans 3 cols) */}
          <div className="md:col-span-3 md:col-start-7 flex flex-col gap-4">
            <h4 className="text-[10px] text-white/30 tracking-[0.4em] uppercase mb-4 border-b border-white/10 pb-4">Index</h4>
            
            <Link to="/" className="text-xs text-neutral-400 hover:text-white transition-colors uppercase tracking-widest w-fit group flex items-center">
              <span className="inline-block w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-4 group-hover:mr-3 opacity-0 group-hover:opacity-100"></span>
              Home
            </Link>
            
            <Link to="/explore" className="text-xs text-neutral-400 hover:text-white transition-colors uppercase tracking-widest w-fit group flex items-center">
              <span className="inline-block w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-4 group-hover:mr-3 opacity-0 group-hover:opacity-100"></span>
              Explore
            </Link>
            
            <Link to="/about" className="text-xs text-neutral-400 hover:text-white transition-colors uppercase tracking-widest w-fit group flex items-center">
              <span className="inline-block w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-4 group-hover:mr-3 opacity-0 group-hover:opacity-100"></span>
              About
            </Link>
          </div>

          {/* Connect Column (Spans 3 cols) */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="text-[10px] text-white/30 tracking-[0.4em] uppercase mb-4 border-b border-white/10 pb-4">Connect</h4>
            
            {/* Replace '#' with your actual links */}
            <a href="https://github.com/Koustav2303" target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-400 hover:text-white transition-colors uppercase tracking-widest w-fit group flex items-center">
              GitHub
              <span className="transform -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 ml-1">↗</span>
            </a>
            
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-400 hover:text-white transition-colors uppercase tracking-widest w-fit group flex items-center">
              LinkedIn
              <span className="transform -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 ml-1">↗</span>
            </a>
          </div>

        </div>

        {/* Bottom Copyright & Signature Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8 gap-6 md:gap-0">
          <p className="text-neutral-500 text-[10px] tracking-widest uppercase">
            © {new Date().getFullYear()} Engineered by Koustav Pan.
          </p>
          
          <div className="flex gap-4 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <span className="text-[10px] font-bold tracking-tighter text-white">React</span>
            <span className="text-[10px] font-bold tracking-tighter text-white">Tailwind</span>
            <span className="text-[10px] font-bold tracking-tighter text-white">GSAP</span>
          </div>

          <p className="text-neutral-600 text-[9px] tracking-[0.4em] uppercase hidden md:block">
            Crafted with respect for Didi.
          </p>
        </div>

        {/* Mobile-only signature so it stacks nicely */}
        <p className="text-neutral-600 text-[9px] tracking-[0.4em] uppercase text-center mt-6 block md:hidden">
            Crafted with respect for Didi.
        </p>

      </div>
    </footer>
  );
};

export default Footer;