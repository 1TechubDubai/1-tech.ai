import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx'; // Ensure this points to your Services.jsx file
import Contact from './pages/Contact.jsx';
import Partners from './pages/Partners.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        
        {/* --- THE FIX IS HERE --- */}
        {/* We use ":slug" to tell React "capture whatever is at the end of the URL" */}
        <Route path="/services/:slug" element={<Services />} />

        {/* Redirect base /services to a specific one (e.g., custom-ai-solutions) */}
        <Route path="/services" element={<Navigate to="/services/custom-ai-solutions" replace />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/partners' element={<Partners/>} />
        
        {/* Catch-all route: redirect any invalid route to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter> 
  );
}

export default App;