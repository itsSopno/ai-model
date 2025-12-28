import React, { useContext } from 'react';
import { AuthContext } from '../../Authcontext';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user } = useContext(AuthContext);

  // Animation Variants
  const containerVars = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.1 } 
    }
  };

  const itemVars = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="min-h-screen py-32 px-6 flex items-center justify-center overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      {user ? (
        <motion.div 
          variants={containerVars}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10"
        >
          {/* Left Side: Avatar Card */}
          <motion.div 
            variants={itemVars}
            className="md:col-span-5 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 flex flex-col items-center justify-center gap-6 group hover:border-white/20 transition-all duration-500 shadow-2xl"
          >
            <div className="relative">
              {/* Animated Ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 border border-dashed border-indigo-500/30 rounded-full"
              />
              <img
                src={user?.photoURL || user?.photo || '/default-user.png'}
                alt={user?.displayName}
                className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-700 border-4 border-white/10 shadow-2xl"
              />
            </div>
            
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic">
                {user.displayName || "Anonymous User"}
              </h1>
              <p className="text-[10px] uppercase tracking-[0.5em] text-indigo-500 mt-2 font-bold">Verified Creator</p>
            </div>
          </motion.div>

          {/* Right Side: Info & Stats */}
          <motion.div 
            variants={itemVars}
            className="md:col-span-7 grid grid-cols-1 gap-6"
          >
            {/* Contact Info Card */}
            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-center">
              <h3 className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 mb-6 font-bold">Contact Intelligence</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Email Address</p>
                  <p className="text-xl md:text-2xl font-light">{user.email}</p>
                </div>
                <div>
                  <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Account ID</p>
                  <p className="text-sm font-mono opacity-50 uppercase">{user.uid?.slice(0, 16) || "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-indigo-500/10 backdrop-blur-3xl border border-indigo-500/20 rounded-[2rem] p-8">
                <p className="text-4xl font-black mb-1 italic">04</p>
                <p className="text-[10px] uppercase tracking-widest text-indigo-400">Models Published</p>
              </div>
              <div className="bg-zinc-500/5 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-8">
                <p className="text-4xl font-black mb-1 italic">12</p>
                <p className="text-[10px] uppercase tracking-widest text-zinc-500">Purchased Apps</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 bg-white text-black py-4 rounded-full font-bold uppercase text-[10px] tracking-widest hover:bg-indigo-500 hover:text-white transition-all">
                Edit Persona
              </button>
              <button className="px-10 border border-white/10 rounded-full hover:bg-white/5 transition-all text-[10px] uppercase tracking-widest">
                Settings
              </button>
            </div>
          </motion.div>

        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="text-6xl mb-6">∅</div>
          <h2 className="text-sm uppercase tracking-[1em] text-zinc-500 italic font-light">No Identity Found</h2>
          <p className="mt-4 text-xs opacity-30">Redirecting to Access Point...</p>
        </motion.div>
      )}
    </section>
  );
};

export default Profile;