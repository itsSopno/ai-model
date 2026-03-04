import React, { useContext } from 'react';
import { AuthContext } from '../../Authcontext';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user } = useContext(AuthContext);

  // Animation Variants
  const containerVars = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 0.5, staggerChildren: 0.05 } 
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "circOut" } }
  };

  return (
    <section className="min-h-screen bg-[#080808] text-white py-20 px-6 md:px-12 flex flex-col items-start overflow-hidden font-sans">
      
      {/* 1. SECTION HEADER */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1.5 h-1.5 bg-[#d0ff00] animate-pulse" />
          <span className="text-[10px] font-mono font-bold tracking-[0.5em] uppercase text-gray-500">
            Personnel Dossier_
          </span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none">
          User <span className="text-[#d0ff00] italic font-light">Identity.</span>
        </h1>
      </div>

      {user ? (
        <motion.div 
          variants={containerVars}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full grid grid-cols-1 lg:grid-cols-12 gap-px bg-white/10 border border-white/10"
        >
          {/* 2. LEFT COLUMN: AVATAR & METADATA */}
          <motion.div 
            variants={itemVars}
            className="lg:col-span-4 bg-[#080808] p-10 flex flex-col items-center border-b lg:border-b-0 border-white/10"
          >
            <div className="relative mb-10 group">
              {/* Technical Crosshair Overlay */}
              <div className="absolute -inset-4 border border-white/5 pointer-events-none group-hover:border-[#d0ff00]/20 transition-colors" />
              <div className="absolute top-1/2 left-[-20px] w-10 h-[1px] bg-[#d0ff00]/50" />
              <div className="absolute top-[-20px] left-1/2 w-[1px] h-10 bg-[#d0ff00]/50" />
              
              <img
                src={user?.photoURL || user?.photo || '/default-user.png'}
                alt={user?.displayName}
                className="w-56 h-56 md:w-72 md:h-72 object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 border border-white/10 p-2"
              />
            </div>
            
            <div className="w-full space-y-2">
              <h2 className="text-3xl font-black uppercase tracking-tighter text-[#d0ff00]">
                {user.displayName || "Anonymous"}
              </h2>
              <div className="flex items-center justify-between font-mono text-[9px] text-gray-500 uppercase tracking-widest border-t border-white/5 pt-4">
                <span>Access Level:</span>
                <span className="text-white">Verified Creator</span>
              </div>
              <div className="flex items-center justify-between font-mono text-[9px] text-gray-500 uppercase tracking-widest">
                <span>Status:</span>
                <span className="text-[#d0ff00]">Active_Node</span>
              </div>
            </div>
          </motion.div>

          {/* 3. RIGHT COLUMN: DATA TABLES */}
          <motion.div 
            variants={itemVars}
            className="lg:col-span-8 bg-[#080808] p-10 flex flex-col justify-between"
          >
            <div className="space-y-12">
              {/* Contact Table */}
              <div className="space-y-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic">// Communication_Channels</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/5 pt-6">
                  <div>
                    <p className="text-[9px] font-mono text-gray-600 uppercase mb-2">Primary_Email</p>
                    <p className="text-xl font-bold uppercase tracking-tight">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-mono text-gray-600 uppercase mb-2">Network_UID</p>
                    <p className="text-xs font-mono text-gray-400 break-all">{user.uid}</p>
                  </div>
                </div>
              </div>

              {/* Stats Table */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
                <div className="bg-[#0a0a0a] p-8 flex justify-between items-end">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-600 mb-4">Neural_Assets</p>
                    <p className="text-5xl font-black italic tracking-tighter">04</p>
                  </div>
                  <span className="text-[10px] text-[#d0ff00] font-mono">[ Models ]</span>
                </div>
                <div className="bg-[#0a0a0a] p-8 flex justify-between items-end">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-600 mb-4">App_Acquisitions</p>
                    <p className="text-5xl font-black italic tracking-tighter">12</p>
                  </div>
                  <span className="text-[10px] text-[#d0ff00] font-mono">[ Nodes ]</span>
                </div>
              </div>
            </div>

            {/* 4. ACTION BAR */}
            <div className="flex flex-col sm:flex-row gap-4 mt-12">
              <button className="flex-1 bg-[#d0ff00] text-black py-5 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white transition-colors flex items-center justify-between px-8">
                Edit Persona
                <span>→</span>
              </button>
              <button className="flex-1 border border-white/10 py-5 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white/5 transition-colors">
                Security Settings
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full h-64 border border-white/5 flex flex-col items-center justify-center bg-white/[0.01]"
        >
          <div className="text-4xl text-gray-800 mb-4 animate-pulse">ERROR_404</div>
          <h2 className="text-[10px] font-mono uppercase tracking-[1em] text-gray-600">Identity Not Syncronized</h2>
        </motion.div>
      )}

      {/* FOOTER METADATA */}
      <div className="mt-12 opacity-20 font-mono text-[8px] uppercase tracking-[0.5em] w-full flex justify-between border-t border-white/10 pt-8">
        <span>Ref: {user?.uid?.slice(0, 8) || "NULL"}</span>
        <span>Local_Time: {new Date().toLocaleTimeString()}</span>
      </div>
    </section>
  );
};

export default Profile;