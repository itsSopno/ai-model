import React from 'react';
import { motion } from 'framer-motion';

const KymaCaseStudy = () => {
  return (
    <section className="relative w-full min-h-screen bg-[#f4f4e8] text-black overflow-hidden flex flex-col lg:flex-row border-t border-white/10">
      
      {/* LEFT CONTENT: Data & Story */}
      <div className="flex-1 p-8 md:p-16 flex flex-col justify-between relative border-r border-white/10">
        
        {/* Top Meta */}
        <div className="flex justify-between items-start mb-12">
          <div className="flex items-center gap-3">
            <span className="text-[#d0ff00] font-mono text-xs font-bold uppercase tracking-[0.2em]">
              [ 05 ] Featured Customer Story _
            </span>
          </div>
          <span className="text-gray-600 font-mono text-[10px] uppercase">Dec 1, 2025</span>
        </div>

        {/* Main Headline - Compressed & Heavy */}
        <h2 className="text-4xl md:text-[5.5vw] font-black leading-[0.9] tracking-tighter uppercase mb-16">
       How Boltshift cut support costs by <span className="text-[#d0ff00]">62%</span> and 3x'd response speed — powered by tech used by <span className="text-[#d0ff00]">1B+ people</span> worldwide.
        </h2>

        {/* Technical Data Table */}
        <div className="border-t border-black/10 mt-auto">
          {[
            { label: "Industry", value: "Enterprise Software" },
            { label: "Company Size", value: "450 Employees" },
            { label: "Automation Timeline", value: "2 Months" }
          ].map((row, i) => (
            <div key={i} className="grid grid-cols-2 py-4 border-b border-black/5 items-center">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <div className="w-1 h-1 bg-gray-700 rounded-full" /> {row.label}
              </span>
              <span className="text-[11px] font-black uppercase tracking-tight text-black">{row.value}</span>
            </div>
          ))}
        </div>

        {/* Big Metrics Grid */}
        <div className="grid grid-cols-2 mt-12 gap-px bg-black/50 border border-black/100">
          <div className="bg-[#080808] p-10">
            <div className="text-7xl font-black tracking-tighter text-white">87%</div>
            <div className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.3em] mt-4">Time Saved on Support</div>
          </div>
          <div className="bg-[#080808] p-10">
            <div className="text-7xl font-black tracking-tighter text-white">3X</div>
            <div className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.3em] mt-4">Ticket Resolution Speed</div>
          </div>
        </div>
      </div>

      {/* RIGHT CONTENT: Immersive Visual */}
      <div className="flex-1 relative min-h-[500px] lg:min-h-screen">
        <img 
          src="https://i.pinimg.com/1200x/13/9f/77/139f7748673ccfb92e22dd38bae68f8d.jpg" 
          alt="AI Visualization" 
          className="absolute inset-0 w-full h-full object-cover  brightness-50"
        />
        {/* Neon Glow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-60" />
        
        {/* Floating Technical UI */}
        <div className="absolute bottom-12 right-12 text-right">
            <div className="inline-block border border-[#d0ff00] p-1 mb-4">
                <div className="bg-[#d0ff00] text-black text-[10px] font-black px-4 py-1 uppercase tracking-widest">
                    Active System
                </div>
            </div>
            <p className="text-white/30 font-mono text-[9px] uppercase tracking-widest">
                Node ID: 882-KYMA
            </p>
        </div>
      </div>
    </section>
  );
};

export default KymaCaseStudy;