import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, Link } from "react-router";
import Allmenu from "../Allmenu/Allmenu";
import { AuthContext } from "../../../Authcontext";

const Sidebar = () => {
    const { logOut } = useContext(AuthContext);
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      {/* Mobile Trigger - শুধু মোবাইলে দেখা যাবে */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 bg-[#050508] border-b border-white/5 sticky top-0 z-50">
        <span className="text-white font-black tracking-tighter">AI MODEL</span>
        <button 
          onClick={() => setIsActive(!isActive)}
          className="text-[10px] font-bold tracking-widest uppercase text-indigo-400 border border-indigo-500/30 px-3 py-1 rounded"
        >
          {isActive ? "Close" : "Menu"}
        </button>
      </div>

      <AnimatePresence>
        {(isActive || window.innerWidth > 768) && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="fixed left-0 top-0 z-40 w-64 h-screen bg-white border-r border-white/5 flex flex-col md:sticky"
          >
            {/* Logo Section */}
            <div className="h-24 flex items-center px-8">
              <Link to="/" className="group">
                <h1 className="text-xl font-black text-black tracking-tighter">
                  AI<span className="text-indigo-500">MODEL</span>
                </h1>
                <div className="h-[1px] w-0 group-hover:w-full bg-indigo-500 transition-all duration-500" />
              </Link>
            </div>

            {/* Menu Section */}
            <div className="flex-grow overflow-y-auto px-4 custom-scrollbar">
              <div className="space-y-10 py-4">
                
                {/* Main Menu Label */}
                <div>
                  <h3 className="px-4 text-[9px] font-black text-black uppercase tracking-[0.3em] mb-4">
                    Product Management
                  </h3>
                  <div className="flex flex-col gap-1">
                    <Allmenu />
                  </div>
                </div>

                {/* Account Label */}
                <div>
                  <h3 className="px-4 text-[9px] font-black text-black uppercase tracking-[0.3em] mb-4">
                    Settings
                  </h3>
                  <NavLink 
                    to="/Dashboard/profile"
                    className={({ isActive }) => `
                      block px-4 py-2.5 text-[11px] font-bold tracking-wide uppercase transition-all duration-200 rounded-lg
                      ${isActive ? 'bg-white/5 text-indigo-400' : 'text-gray-500 hover:text-white hover:bg-white/5'}
                    `}
                  >
                    Profile Configuration
                  </NavLink>
                </div>

              </div>
            </div>

            {/* Footer Section */}
            <div className="p-6 mt-auto border-t border-white/5 space-y-4 bg-indigo-500">
              <Link to="/" className="block px-4 text-[10px] font-black tracking-widest text-white hover:text-white uppercase transition-colors">
                Back to Site
              </Link>
              <button
                onClick={logOut}
                className="w-full py-3 text-[10px] font-black tracking-widest uppercase bg-red-500/5 hover:bg-red-500/10 text-red-500 border border-red-500/10 rounded-xl transition-all"
              >
                End Session
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile Backdrop */}
      {isActive && (
        <div 
          onClick={() => setIsActive(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-30 md:hidden"
        />
      )}
    </>
  );
};

export default Sidebar;