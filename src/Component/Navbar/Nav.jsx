import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from "framer-motion";
import './Nav.css';
import { AuthContext } from '../../Authcontext';

const Nav = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
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

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`navbar fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#11190C]/90 backdrop-blur-lg shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
          : "bg-transparent"
      }`}
    >
      {/* LEFT SIDE */}
      <div className="navbar-start flex items-center gap-4">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#7AF201]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-[#7AF201] rounded-box z-1 mt-3 w-52 p-2 shadow text-[#11190C]"
          >
            {user ? (
              <>
                <li><Link to="Profile">Profile</Link></li>
                <li><Link to="Publish">Publish Ai</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </>
            ) : (
              <li><Link to="login">Login</Link></li>
            )}
            <li><Link to="/">Home</Link></li>
            <li><Link to="MODEL">MODEL</Link></li>
          </ul>
        </div>

        {/* Logo Animation */}
        <motion.a
          whileHover={{ scale: 1.1, rotate: 2 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="LOGO text-2xl font-extrabold text-[#7AF201] cursor-pointer"
        >
          AI<span className="text-white">VERSE</span>
        </motion.a>
      </div>

      {/* MIDDLE */}
      <div className='navbar-center hidden md:flex'>
        {user ? (
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className='text-[#7AF201] text-xl font-semibold'
          >
            Hi {user.displayName}
          </motion.h1>
        ) : (
          <h1 className='text-white text-lg'>Hello Ghost user</h1>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1 flex gap-6 text-lg">
          {user ? (
            <>
              <motion.li whileHover={{ scale: 1.15, color: "#7AF201" }}>
                <Link to="Profile">Profile</Link>
              </motion.li>
              <motion.li whileHover={{ scale: 1.15, color: "#7AF201" }}>
                <Link to="Publish">Publish Ai</Link>
              </motion.li>
              <motion.li whileHover={{ scale: 1.15, color: "#f53156" }}>
                <button onClick={handleLogout}>Logout</button>
              </motion.li>
            </>
          ) : (
            <motion.li whileHover={{ scale: 1.15, color: "#7AF201" }}>
              <Link to="login">Login</Link>
            </motion.li>
          )}

          <motion.li whileHover={{ scale: 1.15, color: "#7AF201" }}>
            <Link to="/">Home</Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.15, color: "#7AF201" }}>
            <Link to="MODEL">MODEL</Link>
          </motion.li>
        </ul>
      </div>
    </motion.nav>
  );
};

export default Nav;
