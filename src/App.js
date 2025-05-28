import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';

// Home component
const Home = () => {
  return (
    <div className="min-h-screen bg-[#0B0B1E] pt-24 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">
          <span className="text-white">Your Strategy</span><br/>
          <span className="gradient-text">Made Effortless</span><br/>
          <span className="text-white">In Minutes</span>
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-8">
          Transform your trading ideas into automated strategies with the simplest bot builder. 
          No coding required, just your trading knowledge.
        </p>
      </div>
    </div>
  );
};

// Main App component
function App() {
  return (
    <Auth0Provider
      domain="dev-nqri4nz4x4oogsjx.us.auth0.com"
      clientId="Yq3CJuF67GyOygYVl7XAkjvJTGUdT9oK"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <Router>
        <div className="min-h-screen text-white overflow-x-hidden antialiased">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </Auth0Provider>
  );
}

export default App; 