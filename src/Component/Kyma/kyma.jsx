import React from 'react';
import { motion } from 'framer-motion';

const KymaHero = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white font-sans overflow-hidden p-6 md:p-12 pt-24 md:pt-32">
      
      {/* Background Grid Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-full w-px bg-white/10 absolute left-1/4" />
        <div className="h-full w-px bg-white/10 absolute left-1/2" />
        <div className="h-full w-px bg-white/10 absolute left-3/4" />
        <div className="w-full h-px bg-white/10 absolute top-1/4" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        
        {/* Left Column: Text Content */}
        <motion.div 
          className="lg:col-span-8 "
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.p variants={fadeInUp} className="text-[#c1ff00] text-xs font-bold uppercase mb-4 tracking-widest">
            [01] Eliminate your bottleneck
          </motion.p>
          
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tight mb-8">
           BOOST YOUR SPEED<span className="text-[#c1ff00]">[10X]</span><br />
USING AI & VIBE COODING TOOLS TO MAXIMIZE YOUR PRODUCTIVITY <span className='text-[#c1ff00]'>[100x]</span>.
{/* SCALE YOUR OPERATIONS <span className="text-[#c1ff00]">[10X]</span><br /> WITHOUT HIRING <span className="text-[#c1ff00]">[100]</span> PEOPLE. */}
          </motion.h1>

          <motion.p variants={fadeInUp} className="max-w-md text-gray-400 text-lg mb-10 leading-relaxed">
            We build <span className="text-white">custom AI systems</span> that handle your repetitive work, 
            so you can focus on growth, not grunt work.
          </motion.p>

          <motion.button 
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-12 border border-white/20 p-4 pl-6 group hover:bg-[#c1ff00] hover:text-black transition-colors"
          >
            <span className="text-xs font-bold uppercase tracking-widest">See how it works</span>
            <div className="w-2 h-2 bg-[#c1ff00] group-hover:bg-black" />
          </motion.button>
        </motion.div>

        {/* Right Column: Floating Image/Video Card */}
        <motion.div 
          className="lg:col-span-4 relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="border border-white/10 p-4 bg-white/5 backdrop-blur-sm">
            <p className="text-[9px] uppercase tracking-tighter mb-4 opacity-70">
              What used to take 6 hours now runs <br /> 
              automatically without human oversight.
            </p>
            <div className="aspect-[4/5] bg-gray-800 relative overflow-hidden group">
              <img 
                src="https://i.pinimg.com/1200x/09/e4/0a/09e40a3f556058ae2f57ba22bce36f12.jpg" 
                alt="AI Robot" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute bottom-4 left-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#c1ff00] flex items-center justify-center">
                  <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-black border-b-[4px] border-b-transparent ml-0.5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Live Automation</span>
              </div>
              <span className="absolute bottom-4 right-4 text-[10px] opacity-50">2026</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Branding / Social Proof */}
      <div className="mt-20 md:mt-0 md:absolute md:bottom-12 md:left-12 z-10 flex flex-col gap-2">
        <div className="flex -space-x-2">
          {[1,2,3,4].map(i => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-gray-700 overflow-hidden">
                <img src={`https://i.pravatar.cc/100?img=${i}`} alt="user" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Trusted by 50+ Companies</p>
      </div>

      {/* Large Watermark Background Text */}
      <div className="absolute -bottom-20 left-0 text-[25vw] font-black text-white/[0.03] pointer-events-none select-none tracking-tighter">
        KYMA
      </div>
    </div>
  );
};

export default KymaHero;