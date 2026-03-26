import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import PrivacyPolicy from './PrivacyPolicy';
import Generosity from './Generosity';
import TermsOfUse from './TermsOfUse';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/generosity" element={<Generosity />} />
        <Route path="/terms" element={<TermsOfUse />} />
      </Routes>
    </Router>
  );
}
