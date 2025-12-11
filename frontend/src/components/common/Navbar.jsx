import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold">
            NGO CMS
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="hover:text-blue-200">Home</Link>
            <Link to="/about" className="hover:text-blue-200">About</Link>
            <Link to="/projects" className="hover:text-blue-200">Projects</Link>
            <Link to="/blog" className="hover:text-blue-200">Blog</Link>
            <Link to="/media" className="hover:text-blue-200">Media</Link>
            <Link to="/contact" className="hover:text-blue-200">Contact</Link>
            <Link to="/donate" className="bg-yellow-500 text-blue-900 px-4 py-2 rounded hover:bg-yellow-400">
              Donate
            </Link>
            
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link to="/admin" className="hover:text-blue-200">Dashboard</Link>
                )}
                <button onClick={logout} className="hover:text-blue-200">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="hover:text-blue-200">Login</Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <Link to="/" className="block py-2 hover:text-blue-200">Home</Link>
            <Link to="/about" className="block py-2 hover:text-blue-200">About</Link>
            <Link to="/projects" className="block py-2 hover:text-blue-200">Projects</Link>
            <Link to="/blog" className="block py-2 hover:text-blue-200">Blog</Link>
            <Link to="/media" className="block py-2 hover:text-blue-200">Media</Link>
            <Link to="/contact" className="block py-2 hover:text-blue-200">Contact</Link>
            <Link to="/donate" className="block py-2 hover:text-blue-200">Donate</Link>
            
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link to="/admin" className="block py-2 hover:text-blue-200">Dashboard</Link>
                )}
                <button onClick={logout} className="block py-2 hover:text-blue-200">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="block py-2 hover:text-blue-200">Login</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;