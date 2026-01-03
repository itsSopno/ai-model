import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../Authcontext';

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

  const linkClasses = "font-semibold uppercase transition-colors hover:text-indigo-500";

  return (
    <div className={`navbar px-6 md:px-12 fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? " backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"}`}>
      
      {/* Navbar Start: Logo + Mobile Dropdown */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><Link to="/">Home</Link></li>
            <li><Link to="/MODEL">Models</Link></li>
            <li><Link to="/Privacy">Privacy</Link></li>
            <li><Link to="/About">About</Link></li>
            {user ? (
              <>
                <li><Link to="/Dashboard">Dashboard</Link></li>
                <li><Link to="/Profile">Profile</Link></li>
                <li>
                  <button onClick={handleLogout} className="text-red-500 font-bold w-full text-left">
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <li><Link to="/login">Login</Link></li>
            )}
            <li>
              <button onClick={toggleTheme} className="w-full text-left">
                Switch to {theme === 'dark' ? 'Light' : 'Dark'}
              </button>
            </li>
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="btn btn-ghost normal-case text-xl ml-2 flex items-center gap-1">
          <span className="text-indigo-500 italic font-light">AI</span>
          <span>VERSE</span>
        </Link>
      </div>

      {/* Navbar Center: Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-6">
          <li><Link to="/" className={linkClasses}>Home</Link></li>
          <li><Link to="/MODEL" className={linkClasses}>Models</Link></li>
          <li><Link to="/Privacy" className={linkClasses}>Privacy</Link></li>
          <li><Link to="/About" className={linkClasses}>About</Link></li>
          {user && <li><Link to="/Profile" className={linkClasses}>Profile</Link></li>}
        </ul>
      </div>

      {/* Navbar End: Actions */}
      <div className="navbar-end flex items-center gap-2">
        {user ? (
          <button onClick={handleLogout} className="btn btn-sm btn-outline btn-error hidden lg:block">
            Logout
          </button>
        ) : (
          <Link to="/login" className="btn btn-sm btn-primary hidden lg:block">
            Login
          </Link>
        )}
        <button onClick={toggleTheme} className="btn btn-sm btn-ghost">
          {theme === 'dark' ? '☼' : '☾'}
        </button>
      </div>
    </div>
  );
};

export default Nav;
