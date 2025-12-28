import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from '../../Authcontext';

const Nav = () => {
  const { user, logout, theme, setTheme, modelData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === "dark" ? "light" : "dark");
  const handleLogout = async () => { 
    await logout(); 
    setIsOpen(false);
    navigate('/'); 
  };

  const hasMyModel = user && modelData?.some(model => model.createdBy === user.email);

  // Animation Variants
  const menuVariants = {
    initial: { clipPath: "circle(0% at 90% 10%)" },
    animate: { 
      clipPath: "circle(150% at 90% 10%)",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
    },
    exit: { 
      clipPath: "circle(0% at 90% 10%)",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
    }
  };

  const linkVariants = {
    initial: { y: 80, opacity: 0 },
    animate: i => ({ 
      y: 0, 
      opacity: 1, 
      transition: { delay: 0.3 + i * 0.1, duration: 0.8, ease: "easeOut" } 
    }),
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-6 md:px-12 py-4 ${
          scrolled && !isOpen
            ? "bg-white/5 backdrop-blur-xl border-b border-white/10 py-3" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          
          {/* LOGO */}
          <Link to="/" onClick={() => setIsOpen(false)} className="text-2xl font-black tracking-tighter flex items-center gap-1 z-[101] mix-blend-difference text-white">
            <span>AI</span>
            <span className="text-indigo-500 italic font-light">VERSE</span>
          </Link>

          {/* RIGHT: TOGGLES */}
          <div className="flex items-center gap-6 z-[101]">
            <button onClick={toggleTheme} className="text-[10px] uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity mix-blend-difference text-white">
              {theme === "dark" ? "Light" : "Dark"}
            </button>

            {/* HAMBURGER BUTTON */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="flex flex-col gap-1.5 justify-center items-center w-8 h-8"
            >
              <motion.span 
                animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-full h-[2px] bg-white mix-blend-difference"
              />
              <motion.span 
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-full h-[2px] bg-white mix-blend-difference"
              />
              <motion.span 
                animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-full h-[2px] bg-white mix-blend-difference"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* FULL SCREEN OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-[#0a0a0a] text-white z-[99] flex flex-col justify-center px-10 md:px-32"
          >
            <div className="flex flex-col gap-4">
              {[
                { name: "Home", path: "/" },
                { name: "All Models", path: "/MODEL" },
                ...(user ? [
                  { name: "My Profile", path: "/Profile" },
                  { name: "Publish AI", path: "/Publish" },
                  { name: "Library", path: "/buyer-app" },
                ] : [
                  { name: "Login", path: "/login" }
                ])
              ].map((link, i) => (
                <div key={link.name} className="overflow-hidden">
                  <motion.div
                    custom={i}
                    variants={linkVariants}
                    initial="initial"
                    animate="animate"
                  >
                    <Link 
                      to={link.path} 
                      onClick={() => setIsOpen(false)}
                      className="text-5xl md:text-8xl font-black uppercase tracking-tighter hover:italic hover:text-indigo-500 transition-all duration-300 block"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                </div>
              ))}

              {user && (
                <motion.button
                  custom={5}
                  variants={linkVariants}
                  initial="initial"
                  animate="animate"
                  onClick={handleLogout}
                  className="text-left text-2xl md:text-4xl font-light text-zinc-600 hover:text-red-500 transition-colors uppercase mt-10"
                >
                  [ Sign Out ]
                </motion.button>
              )}
            </div>

            {/* BOTTOM INFO */}
            <div className="absolute bottom-12 left-10 md:left-32 flex flex-col md:flex-row gap-12 text-[10px] uppercase tracking-[0.4em] text-zinc-700">
               <div>
                 <p className="mb-2 text-indigo-500">Navigation</p>
                 <p>© 2025 AI VERSE CORE</p>
               </div>
               <div>
                 <p className="mb-2 text-indigo-500">Status</p>
                 <p>{user ? `Logged in as ${user.email}` : "Guest Access"}</p>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;