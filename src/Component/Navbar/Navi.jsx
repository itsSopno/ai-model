import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../Authcontext';
import './Navi.css';

const Navbar = ({ isMenuOpen, onMenuToggle }) => {
  const { user, logout, theme, setTheme } = useContext(AuthContext);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <nav className={`navbar-modern ${scrolled ? 'navbar-scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-text">AI</span>
          <span className="logo-subtext">VERSE</span>
        </Link>

        {/* Desktop Menu */}
        <div className="navbar-menu desktop-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/MODEL" className="nav-link">Models</Link>
          <Link to="/Privacy" className="nav-link">Privacy</Link>
          <Link to="/About" className="nav-link">About</Link>
          {user && (
            <>
              <Link to="/Profile" className="nav-link">Profile</Link>
              <Link to="/Dashboard" className="nav-link">Dashboard</Link>
            </>
          )}
        </div>

        {/* Right Actions */}
        <div className="navbar-actions">
          {user ? (
            <button onClick={handleLogout} className="btn-logout desktop-only">
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn-login desktop-only">
              Login
            </Link>
          )}
          
          <button onClick={toggleTheme} className="theme-toggle-btn">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Hamburger Menu */}
          <button 
            className={`hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={onMenuToggle}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
