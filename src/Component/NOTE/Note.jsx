import React from 'react';
import { motion } from "framer-motion";

const Note = () => {
  const notes = [
    "PROTOCOL: Exercise caution before neural deployment",
    "VERIFICATION: Cross-reference model parameters & documentation",
    "TRANSPARENCY: Peer ratings and intelligence reports are public",
    "SECURITY: Execute data redundancy protocols before integration",
  ];

  return (
    <div className="w-full overflow-hidden bg-indigo-500/5 border-y border-indigo-500/10 py-3 backdrop-blur-sm relative group">
      {/* Side Fades for Seamless Look */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#050508] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#050508] to-transparent z-10" />

      <motion.div
        className="flex whitespace-nowrap gap-12 items-center"
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        {/* Duplicate notes for seamless scroll */}
        {notes.concat(notes).map((note, index) => (
          <div key={index} className="flex items-center gap-4">
            {/* Warning Icon/Diamond */}
            <div className="w-1.5 h-1.5 bg-indigo-500 rotate-45 group-hover:bg-[#d0ff00] transition-colors" />
            
            <span className="text-[10px] md:text-xs font-black tracking-[0.2em] uppercase text-indigo-400/80 group-hover:text-white transition-colors">
              {note}
            </span>
            
            {/* Separator */}
            <span className="text-zinc-800 ml-8 font-light">//</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Note;
