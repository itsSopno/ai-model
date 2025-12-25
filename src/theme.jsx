import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from "framer-motion";
import { AuthContext } from '../../Authcontext';
import './Nav.css';

const Nav = () => {
  const { user, logout,theme,setTheme } = useContext(AuthContext);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  // THEME STATE
  // const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleTheme = () => setTheme(prev => prev === "dark" ? "light" : "dark");

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`navbar fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? (theme === "dark" ? "bg-black/90" : "bg-white/90") : "bg-transparent"
      }`}
    >
      {/* LEFT */}
      <div className="navbar-start flex items-center gap-6">
        {/* Desktop Menu */}
        {user && (
          <ul className={`hidden lg:flex menu menu-horizontal gap-6 text-lg font-semibold ${theme === "dark" ? "text-[#92afcf]" : "text-[#11190C]"}`}>
            <motion.li whileHover={{ scale: 1.15 }}><Link to="Profile">PROFILE</Link></motion.li>
            <motion.li whileHover={{ scale: 1.15 }}><Link to="Publish">PUBLISH AI</Link></motion.li>
            <motion.li whileHover={{ scale: 1.15 }}><Link to="my-model">MY MODEL</Link></motion.li>
            <motion.li whileHover={{ scale: 1.15 }}><Link to="buyer-app">PURCHASED APP</Link></motion.li>
          </ul>
        )}

        {/* Mobile Dropdown */}
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-7 w-7 ${theme === "dark" ? "text-[#92afcf]" : "text-[black]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>

          <ul tabIndex="-1" className={`menu menu-sm dropdown-content rounded-box mt-3 w-56 p-2 shadow ${theme === "dark" ? "bg-[#11190C] text-[white]" : "bg-[#92afcf] text-[#11190C]"}`}>
            {user ? (
              <>
                <li><Link to="Profile">Profile</Link></li>
                <li><Link to="Publish">Publish Ai</Link></li>
                <li><Link to="my-model">My Model</Link></li>
                <li><Link to="buyer-app">Purchased App</Link></li>
                    <li><Link to="MODEL">MODEL</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </>
            ) : (
              <li><Link to="login">Login</Link></li>
            )}
            <li><Link to="/">Home</Link></li>
           
               <button onClick={toggleTheme} className={`px-3 py-1 rounded-full border transition ${theme === "dark" ? "border-[#92afcf] text-[#92afcf] hover:bg-[#92afcf] hover:text-black" : "border-[#11190C] text-[#11190C] hover:bg-[#11190C] hover:text-white"}`}>
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
          </ul>
        </div>
      </div>

      {/* CENTER */}
      <div className='navbar-center hidden md:flex'>
        <motion.a whileHover={{ scale: 1.1, rotate: 2 }} transition={{ type: "spring", stiffness: 300 }}
          className={`LOGO text-2xl font-extrabold cursor-pointer ${theme === "dark" ? "text-[#92afcf]" : "text-[#11190C]"}`}>
          AI<span className={theme === "dark" ? "text-white" : "text-[#92afcf]"}>VERSE</span>
        </motion.a>
      </div>

      {/* RIGHT */}
      <div className="navbar-end hidden lg:flex gap-6 items-center">
        {/* Theme Toggle */}
        <button onClick={toggleTheme} className={`px-3 py-1 rounded-full border transition ${theme === "dark" ? "border-[#92afcf] text-[white] hover:bg-[#92afcf] hover:text-black" : "border-[#11190C] text-[#11190C] hover:bg-[#11190C] hover:text-white"}`}>
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>

        <ul className="menu menu-horizontal px-1 flex gap-6 text-lg ">
          {user ? (
            <motion.li whileHover={{ scale: 1.15 }}><button onClick={handleLogout}>LOGOUT</button></motion.li>
             <motion.li whileHover={{ scale: 1.15 }}><Link to="MODEL">MODEL</Link></motion.li>
          ) : (
            <motion.li whileHover={{ scale: 1.15 }}><Link to="login">LOGIN</Link></motion.li>
          )}
          <motion.li whileHover={{ scale: 1.15 }}><Link to="/">HOME</Link></motion.li>
       
        </ul>
      </div>
    </motion.nav>
  );
};

export default Nav;
