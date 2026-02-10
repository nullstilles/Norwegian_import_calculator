import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import TollCalculator from './pages/TollCalculator';
import JsonConverter from './pages/JsonConverter';
import ExcelGenerator from './pages/ExcelGenerator';
import Stromstotte from './pages/Stromstotte';
import Bilavgift from './pages/Bilavgift';
import Prosent from './pages/Prosent';
import Ukenummer from './pages/Ukenummer';
import Valuta from './pages/Valuta';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/toll" element={<TollCalculator />} />
            <Route path="/json-csv" element={<JsonConverter />} />
            <Route path="/excel-ai" element={<ExcelGenerator />} />
            <Route path="/strom" element={<Stromstotte />} />
            <Route path="/bilavgift" element={<Bilavgift />} />
            <Route path="/prosent" element={<Prosent />} />
            <Route path="/uke" element={<Ukenummer />} />
            <Route path="/valuta" element={<Valuta />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
