import React from 'react';
import { motion } from 'framer-motion';

const HistorySection = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }
  };

  return (
    <section className="relative w-full min-h-screen bg-[#f4f4e8] text-black overflow-hidden border-t border-white/10 px-6 md:px-12 py-24 md:py-32 flex flex-col justify-center">
      
      {/* Structural Grid Lines - KYMA Style */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-full w-[1px] bg-black/5 absolute left-[10%] md:left-1/4" />
        <div className="h-full w-[1px] bg-black/5 absolute left-1/2" />
        <div className="h-full w-[1px] bg-black/5 absolute left-[90%] md:left-3/4" />
        <div className="w-full h-[1px] bg-black/5 absolute top-1/2" />
      </div>

      {/* Large Background Watermark */}
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-black text-white/[0.02] pointer-events-none select-none italic tracking-tighter">
        01
      </span>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start md:items-center">
        
        {/* Left Side: Headline */}
        <motion.div 
          className="lg:col-span-7"
          {...fadeInUp}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[#c3fb12] font-mono text-sm font-bold">[SECTION]</span>
            <div className="h-[1px] w-12 bg-[#c3fb12]/30" />
          </div>
          
          <h2 className="text-4xl md:text-[8vw] font-black leading-[0.85] tracking-tighter uppercase">
            HISTORY OF <br /> 
            <span className="text-[#c3fb12] italic humane-font">AI MODELS.</span>
          </h2>
        </motion.div>

        {/* Right Side: Description */}
        <motion.div 
          className="lg:col-span-5 lg:pl-12 border-l-0 md:border-l border-white/10"
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: 0.2 }}
        >
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-medium uppercase tracking-tight">
            Artificial Intelligence (AI) is the creation of machines that can <span className="text-white font-bold">think, learn, and make decisions</span> like humans. 
          </p>
          
          <p className="mt-6 text-sm text-gray-500 leading-relaxed uppercase tracking-widest font-bold">
            Early AI focused on problem-solving and logical reasoning, now evolving toward advanced human-like intelligence.
          </p>

          {/* Minimalist Tech Element */}
          <div className="mt-10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group cursor-pointer hover:bg-[#c3fb12] transition-colors duration-500">
               <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[7px] border-l-white group-hover:border-l-black border-b-[4px] border-b-transparent ml-1" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Explore Timeline</span>
          </div>
        </motion.div>
      </div>
      
    </section>
  );
};

export default HistorySection;