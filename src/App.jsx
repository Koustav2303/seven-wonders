import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Explore from '@/pages/Explore';
import About from '@/pages/About';
import WonderDetail from '@/pages/WonderDetail';

// Importing the new creative section
import WorldPulse from '@/components/WorldPulse';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-neutral-950 text-neutral-50 selection:bg-white/20">
        
        {/* Navigation - persistent across all routes */}
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <>
                <Home />
                {/* We place WorldPulse here so it appears right after 
                   the main grid on the home page for a 'God-level' transition 
                */}
                <WorldPulse />
              </>
            } />
            
            <Route path="/explore" element={<Explore />} />
            
            <Route path="/about" element={<About />} />
            
            <Route path="/wonder/:id" element={<WonderDetail />} />
          </Routes>
        </main>

        {/* Footer - persistent across all routes */}
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;