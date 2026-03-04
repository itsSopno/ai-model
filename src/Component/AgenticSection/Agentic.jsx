import React from 'react';
import { motion } from 'framer-motion';

const AgenticSection = () => {
  return (
    <section className="relative w-full py-24 md:py-40 bg-[#080808] text-white overflow-hidden border-t border-white/10 px-6 md:px-12">
      
      {/* 1. STRUCTURAL GRID (KYMA Blueprints) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="h-full w-[1px] bg-white/10 absolute left-[10%] md:left-1/4" />
        <div className="h-full w-[1px] bg-white/10 absolute left-1/2 hidden md:block" />
        <div className="h-full w-[1px] bg-white/10 absolute left-[90%] md:left-3/4" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-stretch">
        
        {/* LEFT COLUMN: Main Typography (7 Columns) */}
        <div className="lg:col-span-7 pr-0 lg:pr-20 border-b lg:border-b-0 lg:border-r border-white/10 pb-12 lg:pb-0">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-10"
          >
            <span className="text-[#d0ff00] font-mono text-xs font-bold uppercase tracking-[0.4em]">
              [ 02 — FUTURE PATH ]
            </span>
            <div className="h-[1px] w-12 bg-[#d0ff00]/40" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-[8vw] font-black leading-[0.85] tracking-tighter uppercase mb-12"
          >
            The Agentic <br /> 
            <span className="text-[#d0ff00] italic font-light">Era.</span>
          </motion.h2>

          {/* Integrated Note Component styling */}
          <div className="border-y border-white/10 py-10 my-10 group cursor-crosshair">
            <p className="text-gray-400 text-lg md:text-xl leading-tight uppercase tracking-tighter font-medium">
              The AI revolution is shifting from classification to <br className="hidden md:block"/>
              <span className="text-white">Generative Systems</span> and Agentic Autonomy.
            </p>
          </div>

          <p className="max-w-xl text-gray-500 text-sm md:text-base font-bold uppercase tracking-widest leading-relaxed">
            We focus on <span className="text-white">Responsibility</span> as the core metric of performance. Your vision, accelerated by industrial-grade intelligence.
          </p>
        </div>

        {/* RIGHT COLUMN: Technical Status (5 Columns) */}
        <div className="lg:col-span-5 flex flex-col justify-end lg:pl-20 py-12 lg:py-0 relative">
            
            {/* Background Big Number Watermark */}
            <div className="absolute top-0 right-0 text-[15vw] font-black text-white/[0.03] leading-none pointer-events-none italic">
                02
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="p-8 border border-white/10 bg-white/[0.02] relative"
            >
              <div className="flex justify-between items-center mb-10">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-[#d0ff00] animate-pulse shadow-[0_0_10px_#d0ff00]" />
                  <div className="w-2 h-2 bg-white/10" />
                  <div className="w-2 h-2 bg-white/10" />
                </div>
                <span className="text-[10px] font-mono text-gray-600 uppercase">System: Active</span>
              </div>

              <div className="space-y-4 font-mono">
                <div className="flex justify-between border-b border-white/5 pb-2 text-[10px] uppercase">
                    <span className="text-gray-500">Status</span>
                    <span className="text-white">Activating Nodes...</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2 text-[10px] uppercase">
                    <span className="text-gray-500">Focus</span>
                    <span className="text-white">Neural Autonomy</span>
                </div>
                <div className="flex justify-between text-[10px] uppercase">
                    <span className="text-gray-500">Protocol</span>
                    <span className="text-[#d0ff00]">Responsible AI 2.0</span>
                </div>
              </div>

              {/* Decorative Corner Accent */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2 border-[#d0ff00]" />
            </motion.div>

            <button className="mt-12 group flex items-center gap-12 border border-[#d0ff00] py-6 px-10 self-start hover:bg-[#d0ff00] transition-all duration-500">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d0ff00] group-hover:text-black">
                    Explore Autonomy
                </span>
                <div className="w-2 h-2 bg-[#d0ff00] group-hover:bg-black" />
            </button>
        </div>

      </div>
    </section>
  );
};

export default AgenticSection;