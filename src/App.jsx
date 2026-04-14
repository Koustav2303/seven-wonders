import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Explore from '@/pages/Explore';
import About from '@/pages/About'; // <-- Import the new About page
import WonderDetail from '@/pages/WonderDetail';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-neutral-950 text-neutral-50 selection:bg-white/20">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/about" element={<About />} /> {/* <-- Add the Route */}
            <Route path="/wonder/:id" element={<WonderDetail />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;