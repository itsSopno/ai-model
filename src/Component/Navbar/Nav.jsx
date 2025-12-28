import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from '../../Authcontext';

const Nav = () => {
  const { user, logout, theme, setTheme, modelData } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme logic remains the same
  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === "dark" ? "light" : "dark");
  const handleLogout = async () => { await logout(); navigate('/'); };

  const hasMyModel = user && modelData?.some(model => model.createdBy === user.email);

  // Link Hover Animation logic
  const linkClasses = `text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:text-indigo-500`;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full  z-[100] transition-all duration-500 px-6 md:px-12 py-4 ${
        scrolled 
          ? "bg-white/5 backdrop-blur-xl border-b border-white/10 py-3" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        
        {/* LEFT: DESKTOP MENU */}
        <div className="hidden lg:flex items-center gap-8">
          {user && (
            <>
              <Link to="Profile" className={linkClasses}>Profile</Link>
              <Link to="Publish" className={linkClasses}>Publish</Link>
              <Link to="buyer-app" className={linkClasses}>Library</Link>
            </>
          )}
        </div>

        {/* CENTER: LOGO */}
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-black tracking-tighter flex items-center gap-1 group">
            <span className="group-hover:italic transition-all">AI</span>
            <span className="text-indigo-500 italic font-light">VERSE</span>
          </Link>
        </div>

        {/* RIGHT: ACTIONS */}
        <div className="hidden lg:flex items-center gap-8">
          {user ? (
            <>
              <Link to="MODEL" className={linkClasses}>Models</Link>
              {hasMyModel && <Link to="my-model" className={linkClasses}>Ownership</Link>}
              <button onClick={handleLogout} className="text-[10px] px-4 py-2 border border-zinc-500/30 rounded-full hover:bg-white hover:text-black transition-all uppercase tracking-widest">
                Logout
              </button>
            </>
          ) : (
            <Link to="login" className={linkClasses}>Login</Link>
          )}
          
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-500/10 hover:bg-zinc-500/20 transition-all border border-white/5"
          >
            {theme === "dark" ? "☼" : "☾"}
          </button>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button 
          className="lg:hidden text-2xl" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? "✕" : "⠿"}
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 w-full  backdrop-blur-3xl border-b border-white/10 px-8 py-12 flex flex-col gap-6"
          >
            {user ? (
              <>
                <Link onClick={() => setIsMobileMenuOpen(false)} to="Profile" className="text-3xl font-bold italic uppercase">Profile</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} to="Publish" className="text-3xl font-bold italic uppercase">Publish</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} to="MODEL" className="text-3xl font-bold italic uppercase">Models</Link>
               <Link to="buyer-app" className={linkClasses}>Library</Link>
                <button onClick={handleLogout} className="text-left text-red-500 font-bold uppercase tracking-widest text-sm">Sign Out</button>
              </>
            ) : (
              <Link onClick={() => setIsMobileMenuOpen(false)} to="login" className="text-4xl font-bold">Login</Link>
            )}
            <div className="h-[1px] bg-white/10 my-4" />
            <button onClick={toggleTheme} className="uppercase tracking-[0.3em] text-[10px]">
              Switch to {theme === "dark" ? "Light" : "Dark"} Mode
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Nav;