import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <nav className="fixed w-full z-50 bg-[#0B0B1E]/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 relative logo-wrapper">
              <span className="text-2xl logo-text gradient-text relative" style={{ zIndex: 1 }}>Cryptotech X</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link text-gray-300 hover:text-white transition-colors font-medium">Home</Link>
            <Link to="/features" className="nav-link text-gray-300 hover:text-white transition-colors font-medium">Features</Link>
            <Link to="/shop" className="nav-link text-gray-300 hover:text-white transition-colors font-medium">Pricing</Link>
            <Link to="/contact" className="nav-link text-gray-300 hover:text-white transition-colors font-medium">Contact</Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="nav-link text-gray-300 hover:text-white transition-colors font-medium">Dashboard</Link>
                <button
                  onClick={() => logout({ returnTo: window.location.origin })}
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => loginWithRedirect()}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 