import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Legal from './components/Legal';
import RegistrationForm from './components/RegistrationForm';
import './App.css';
import './playin-scope.css';

function ExternalApp() {
  return (
    <div className="ExternalApp" id="playin-react-app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register/:cityId" element={<RegistrationForm />} />
        <Route path="/legal" element={<Legal />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default ExternalApp;
