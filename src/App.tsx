import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Question from './pages/Question';
import Analysis from './pages/Analysis';
import Advice from './pages/Advice';
import Premium from './pages/Premium';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/question" element={<Question />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/advice" element={<Advice />} />
        <Route path="/premium" element={<Premium />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
