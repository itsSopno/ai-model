import React, { useContext } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { AuthContext } from "../../Authcontext";


const Footer = () => {
  const { user, theme, setTheme } = useContext(AuthContext);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <footer className="w-full font-sans text-white border-t border-white/5 pt-20 pb-10">
      <div className="w-full px-6 md:px-16 lg:px-24">
        
        {/* MAIN FOOTER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black italic tracking-tighter uppercase">
              AI <span className="text-[#d0ff00]">MANIA</span>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              The premier marketplace for high-performance neural assets. 
              Deploy, trade, and integrate the future of logic.
            </p>
            <div className="flex gap-4">
              {[].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, color: "#6366f1" }}
                  className="text-gray-600 transition-colors text-lg"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Column */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d0ff00]">Navigation</h4>
            <nav className="flex flex-col gap-3 text-sm font-medium text-gray-500">
              <Link to="/" className="hover:text-white transition">Home</Link>
              <Link to="/MODEL" className="hover:text-white transition">Model Hub</Link>
              <Link to="/about" className="hover:text-white transition">Mission</Link>
              <Link to="/docs" className="hover:text-white transition">Neural Docs</Link>
            </nav>
          </div>

          {/* Account Column */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d0ff00]">Account</h4>
            <nav className="flex flex-col gap-3 text-sm font-medium text-gray-500">
              {user ? (
                <>
                  <Link to="/Profile" className="hover:text-white transition">Neural Profile</Link>
                  <Link to="/Publish" className="hover:text-white transition">Deploy Model</Link>
                  <Link to="/settings" className="hover:text-white transition">Sync Settings</Link>
                </>
              ) : (
                <Link to="/login" className="hover:text-white transition">Network Access (Login)</Link>
              )}
            </nav>
          </div>

          {/* Control Column */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d0ff00]">System Preferences</h4>
            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
              <p className="text-[10px] text-gray-600 font-bold mb-4 uppercase">Toggle Neural Interface</p>
              <button
                onClick={toggleTheme}
                className="w-full py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-indigo-600 hover:text-white transition-all duration-500"
              >
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="w-full border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-8 text-[9px] font-black text-gray-600 uppercase tracking-widest">
            <Link to="/Privacy" className="hover:text-indigo-500">Privacy Policy</Link>
            <Link to="/Terms" className="hover:text-indigo-500">Terms of Operation</Link>
          </div>

          <motion.div
            className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            © {new Date().getFullYear()} — <span className="text-white/40 italic">MISTI ALUUU NEXUS</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;