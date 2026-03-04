import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../Authcontext';
import './Nav.css';

const Nav = () => {
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

  const linkClasses = "relative font-semibold uppercase tracking-wide transition-all duration-300 hover:text-indigo-400 hover:scale-105 group";
  const activeLinkClasses = "after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-indigo-400 after:to-purple-500 after:transition-all after:duration-300 group-hover:after:w-full";

  return (
    <nav className={`navbar-custom fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? "navbar-scrolled backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 shadow-lg border-b border-white/20" 
        : "bg-transparent"
    }`}>
      
      {/* Navbar Start: Logo + Mobile Dropdown */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden hover:bg-white/10 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-4 shadow-xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl w-64 border border-white/20"
          >
            <li><Link to="/" className="rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors">Home</Link></li>
            <li><Link to="/MODEL" className="rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors">Models</Link></li>
            <li><Link to="/Privacy" className="rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors">Privacy</Link></li>
            <li><Link to="/About" className="rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors">About</Link></li>
            {user ? (
              <>
                <li><Link to="/Profile" className="rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors">Profile</Link></li>
                <li><Link to="/Dashboard" className="rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors">Dashboard</Link></li>
                <li>
                  <button onClick={handleLogout} className="text-red-500 font-bold w-full text-left rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors">
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <li><Link to="/login" className="rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors">Login</Link></li>
            )}
            <li>
              <button onClick={toggleTheme} className="w-full text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                Switch to {theme === 'dark' ? 'Light' : 'Dark'}
              </button>
            </li>
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="logo-container flex items-center gap-2 ml-2 group">
          <div className="logo-icon">
            <span className="text-3xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              AI
            </span>
          </div>
          <span className="text-xl font-semibold tracking-wider group-hover:text-indigo-400 transition-colors duration-300">
            VERSE
          </span>
        </Link>
      </div>

      {/* Navbar Center: Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-8">
          <li>
            <Link to="/" className={`${linkClasses} ${activeLinkClasses}`}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/MODEL" className={`${linkClasses} ${activeLinkClasses}`}>
              Models
            </Link>
          </li>
          <li>
            <Link to="/Privacy" className={`${linkClasses} ${activeLinkClasses}`}>
              Privacy
            </Link>
          </li>
          <li>
            <Link to="/About" className={`${linkClasses} ${activeLinkClasses}`}>
              About
            </Link>
          </li>
          {user && (
            <>
              <li>
                <Link to="/Profile" className={`${linkClasses} ${activeLinkClasses}`}>
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/Dashboard" className={`${linkClasses} ${activeLinkClasses}`}>
                  Dashboard
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Navbar End: Actions */}
      <div className="navbar-end flex items-center gap-3">
        {user ? (
          <button 
            onClick={handleLogout} 
            className="btn-custom btn-outline-error hidden lg:flex items-center gap-2 px-4 py-2 rounded-full border-2 border-red-400 text-red-400 hover:bg-red-400 hover:text-white transition-all duration-300 font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        ) : (
          <Link 
            to="/login" 
            className="btn-custom btn-primary hidden lg:flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Login
          </Link>
        )}
        
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme} 
          className="theme-toggle p-2 rounded-full bg-white/10 hover:bg-white/20 dark:bg-gray-800/50 dark:hover:bg-gray-700/50 transition-all duration-300 backdrop-blur-sm border border-white/20"
        >
          <div className="relative w-6 h-6">
            {theme === 'dark' ? (
              <svg className="w-6 h-6 text-yellow-400 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Nav;
