import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed w-full z-50 bg-neutral-950/50 backdrop-blur-lg border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold tracking-widest text-white uppercase" onClick={() => setIsOpen(false)}>
              7 <span className="text-neutral-400 font-light">Wonders</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-neutral-300 hover:text-white transition-colors duration-300 text-sm tracking-widest uppercase">Home</Link>
            <Link to="/explore" className="text-neutral-300 hover:text-white transition-colors duration-300 text-sm tracking-widest uppercase">Explore</Link>
            <Link to="/about" className="text-neutral-300 hover:text-white transition-colors duration-300 text-sm tracking-widest uppercase">About</Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="relative w-10 h-10 focus:outline-none z-50 group"
              aria-label="Toggle menu"
            >
              <div className="absolute w-6 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                <span className={`absolute h-[2px] w-full bg-white transform transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45' : '-translate-y-2'}`}></span>
                <span className={`absolute h-[2px] w-full bg-white transform transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`absolute h-[2px] w-full bg-white transform transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45' : 'translate-y-2'}`}></span>
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`md:hidden absolute top-0 left-0 w-full h-screen bg-neutral-950/95 backdrop-blur-xl flex flex-col justify-center items-center space-y-8 transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      >
        <Link to="/" onClick={toggleMenu} className="text-3xl font-light text-white tracking-widest uppercase hover:scale-110 transition-transform duration-300">Home</Link>
        <Link to="/explore" onClick={toggleMenu} className="text-3xl font-light text-white tracking-widest uppercase hover:scale-110 transition-transform duration-300">Explore</Link>
        <Link to="/about" onClick={toggleMenu} className="text-3xl font-light text-white tracking-widest uppercase hover:scale-110 transition-transform duration-300">About</Link>
      </div>
    </nav>
  );
};

export default Navbar;