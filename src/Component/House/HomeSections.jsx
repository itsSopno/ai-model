// import React, { useContext, useRef, useEffect, useState } from "react";
// import { AuthContext } from "../../Authcontext";
// import { Link } from "react-router";
// import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";

// const HomeSections = () => {
//   const { modelData } = useContext(AuthContext);

//   // মডেল ডেটাকে সর্ট করে প্রথম ৮টি নেওয়া
//   const recentModels = modelData?.length
//     ? [...modelData]
//         .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//         .slice(0, 8)
//     : [];

  
//   const duplicatedModels = [...recentModels, ...recentModels];

//   const fadeIn = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
//   };

//   return (
//     <div className="w-full  text-gray-100 overflow-hidden font-sans">
//       {/* Background Glow Decor */}
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

//       {/* 1. Featured AI Models - Auto Sliding Section */}
//       <section className="relative py-24">
//         <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
//           <motion.div initial="hidden" whileInView="visible" variants={fadeIn}>
//             <h2 className="text-4xl md:text-6xl font-black tracking-tighter bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent mb-4">
//               TOP AI MODELS
//             </h2>
//             <div className="flex items-center justify-center gap-3">
//               <span className="h-px w-8 bg-indigo-500"></span>
//               <p className="text-indigo-400 font-medium tracking-[0.2em] uppercase text-xs">
//                 Live Model Stream
//               </p>
//               <span className="h-px w-8 bg-indigo-500"></span>
//             </div>
//           </motion.div>
//         </div>

//         {/* Framer Motion Infinite Slider */}
//         <div className="relative flex overflow-hidden">
//           <motion.div
//             className="flex gap-8 pr-8"
//             animate={{
//               x: [0, -1920], // আপনার কার্ডের টোটাল উইডথ অনুযায়ী এটি অ্যাডজাস্ট হতে পারে
//             }}
//             transition={{
//               x: {
//                 repeat: Infinity,
//                 repeatType: "loop",
//                 duration: 40, // স্লাইডারের গতি নিয়ন্ত্রণ করে (বেশি মানে স্লো)
//                 ease: "linear",
//               },
//             }}
//             style={{ width: "max-content" }}
//             whileHover={{ transition: { duration: 100 } }} // হোভার করলে স্লো হয়ে যাবে
//           >
//             {duplicatedModels.map((model, index) => (
//               <motion.div
//                 key={`${model._id}-${index}`}
//                 className="w-72 md:w-85 flex-shrink-0"
//               >
//                 <Link
//                   to={`/MODEL/${model._id}`}
//                   className="group block relative bg-[#0a0c14]/80 border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-md hover:border-indigo-500/40 transition-all duration-500"
//                 >
//                   <div className="aspect-square mb-8 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-transparent flex items-center justify-center relative overflow-hidden">
//                     <img
//                       src={model.image || "/default-model.png"}
//                       alt={model.name}
//                       className="w-28 h-28 object-contain z-10 group-hover:scale-110 transition-transform duration-700"
//                     />
//                     {/* Inner Card Glow */}
//                     <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
//                   </div>
                  
//                   <div className="space-y-3">
//                     <span className="text-indigo-500 text-[10px] font-bold tracking-[0.15em] uppercase">
//                       {model.framework || "Core Architecture"}
//                     </span>
//                     <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
//                       {model.name}
//                     </h3>
//                     <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed font-light">
//                       {model.useCase}
//                     </p>
//                   </div>
//                 </Link>
//               </motion.div>
//             ))}
//           </motion.div>

//           {/* Fade Gradients for a smooth look */}
//           <div className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#030508] to-transparent z-20" />
//           <div className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#030508] to-transparent z-20" />
//         </div>
//       </section>

//       {/* 2. About AI Models - Clean Split Layout */}
//     <section className="w-full py-24 px-6 md:px-16 border-t border-white/5 bg-[#doffoo]">
//   {/* Container: max-w সরিয়ে w-full করা হয়েছে */}
//   <div className="w-full grid lg:grid-cols-2 gap-12 lg:gap-32 items-center">
    
//     {/* LEFT CONTENT */}
//     <motion.div 
//       initial="hidden" 
//       whileInView="visible" 
//       viewport={{ once: true }} 
//       variants={fadeIn}
//       className="space-y-8"
//     >
//       <div className="space-y-4">
//         <h2 className="text-indigo-500 font-black tracking-[0.4em] uppercase text-[10px]">
//           Operational Infrastructure
//         </h2>
//         <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter uppercase">
//           A New Era of <br /> 
//           <span className="text-[#d0ff00] italic font-light">AI Integration</span>
//         </h2>
//       </div>

//       <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-2xl">
//         AI Verse isn't just a directory; it's a bridge between complex research and real-world application. 
//         We curate high-performance models, providing clear implementation paths so you can focus on building 
//         what matters most.
//       </p>

//       <div className="flex gap-6 items-center pt-4">
//         <div className="h-16 w-[1px] bg-gradient-to-b from-indigo-500 to-transparent" />
//         <p className="text-sm md:text-base italic text-gray-600 max-w-xs leading-tight font-medium">
//           "The best way to predict the future is to invent it."
//         </p>
//       </div>
//     </motion.div>

//     {/* RIGHT STATS: Full width grid */}
//     <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 md:gap-6 w-full">
//       {[
//         { title: "Models", count: "200+" },
//         { title: "Latency", count: "<20ms" },
//         { title: "Uptime", count: "99.9%" },
//         { title: "Devs", count: "5K+" },
//       ].map((stat, i) => (
//         <motion.div 
//           key={i}
//           whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.02)" }}
//           className="p-10 md:p-14 rounded-[2.5rem] bg-[#0a0a0f] border border-white/5 flex flex-col justify-center items-center transition-all duration-500 shadow-2xl"
//         >
//           <div className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tighter italic">
//             {stat.count}
//           </div>
//           <div className="text-indigo-500 text-[10px] md:text-xs uppercase tracking-[0.3em] font-black opacity-80">
//             {stat.title}
//           </div>
//         </motion.div>
//       ))}
//     </div>

//   </div>
// </section>
//       {/* 3. CTA Section - Minimalist & Bold */}
//       <section className="py-24 px-6">
//         <motion.div 
//           initial={{ opacity: 0, scale: 0.9 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           className="max-w-6xl mx-auto bg-gradient-to-b from-indigo-600 to-indigo-900 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-[0_0_50px_rgba(79,70,229,0.3)]"
//         >
//           <div className="relative z-10">
//             <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
//               READY TO GET STARTED?
//             </h2>
//             <Link
//               to="/MODEL"
//               className="inline-block px-10 py-5 bg-white text-indigo-900 rounded-full font-black text-lg hover:scale-105 transition-transform shadow-2xl"
//             >
//               BROWSE MODELS NOW
//             </Link>
//           </div>
//           {/* Decorative Circles */}
//           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
//           <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 rounded-full -ml-20 -mb-20 blur-3xl" />
//         </motion.div>
//       </section>
//     </div>
//   );
// };

// export default HomeSections;

import React, { useContext } from "react";
import { AuthContext } from "../../Authcontext";
import { Link } from "react-router";
import { motion } from "framer-motion";

const HomeSections = () => {
  const { modelData } = useContext(AuthContext);

  const recentModels = modelData?.length
    ? [...modelData]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 8)
    : [];

  const duplicatedModels = [...recentModels, ...recentModels];

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }
  };

  return (
    <div className="w-full bg-[#f4f4e8] text-black overflow-hidden font-sans">
      
      {/* 1. TOP AI MODELS - BRUTALIST TICKER */}
      <section className="relative py-32 border-t border-white/10">
        <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="h-full w-[1px] bg-black/50 absolute left-1/4" />
             <div className="h-full w-px bg-black/50 absolute left-1/2" />
            <div className="h-full w-[1px] bg-black/50 absolute left-3/4" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 mb-20">
          <motion.div {...fadeInUp} className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <p className="text-[#d0ff00] font-mono text-xs font-bold tracking-[0.3em] mb-4 uppercase">
                [ 01 — Featured ]
              </p>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
                Top AI <br /> <span className="italic text-[#d0ff00]">Models</span>
              </h2>
            </div>
            <p className="max-w-xs text-gray-500 text-sm uppercase tracking-widest font-bold border-l border-[#d0ff00] pl-6">
              A curated stream of high-performance neural architectures.
            </p>
          </motion.div>
        </div>

        {/* Ticker Slider */}
        <div className="relative flex border-y border-white/10 bg-white/[0.02] py-12">
          <motion.div
            className="flex gap-6 pr-6"
            animate={{ x: [0, -2500] }}
            transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
            style={{ width: "max-content" }}
          >
            {duplicatedModels.map((model, index) => (
              <Link
                key={`${model._id}-${index}`}
                to={`/MODEL/${model._id}`}
                className="group w-[350px] bg-[#0a0a0a] border border-white/10 p-6 flex items-center gap-6 hover:border-[#d0ff00] transition-all duration-500"
              >
                <div className="w-20 h-20 bg-neutral-900 border border-white/5 flex-shrink-0  group-hover:grayscale-0 transition-all overflow-hidden">
                  <img src={model.image || "/default.png"} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-lg text-white font-white uppercase tracking-tighter group-hover:text-[#d0ff00] transition-colors">
                    {model.name}
                  </h3>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">
                    {model.framework || "Architecture"}
                  </p>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 2. OPERATIONAL INFRASTRUCTURE (STATS) */}
      <section className="relative w-full py-32 px-6 md:px-12 border-b border-white/10">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-16 items-start">
          
          <motion.div className="lg:col-span-7" {...fadeInUp}>
            <div className="flex items-center gap-4 mb-8">
                <span className="text-[#d0ff00] font-mono font-bold text-sm">[02]</span>
                <div className="h-[1px] w-20 bg-white/20" />
            </div>
            <h2 className="text-3xl md:text-[7vw] font-black leading-[0.85] tracking-tighter uppercase mb-10">
              A New Era of <br /> 
              <span className="text-[#d0ff00] italic humane-font">AI Integration</span>
            </h2>
            <p className="text-gray-400 text-xl max-w-xl leading-relaxed font-medium uppercase tracking-tighter">
              AI Verse isn't just a directory; it's a structural bridge between complex research and industrial scaling.
            </p>
          </motion.div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-px bg-white/10 border border-white/10 shadow-2xl">
            {[
              { title: "Models", count: "200+" },
              { title: "Latency", count: "<20ms" },
              { title: "Uptime", count: "99.9%" },
              { title: "Devs", count: "5K+" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                className="bg-[#080808] p-10 flex flex-col items-center justify-center group hover:bg-[#d0ff00]/5 transition-colors"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-5xl font-black text-white group-hover:text-[#d0ff00] transition-colors tracking-tighter italic">
                  {stat.count}
                </div>
                <div className="text-gray-500 text-[10px] uppercase tracking-[0.3em] font-black mt-2">
                  {stat.title}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CTA SECTION - BOLD & MINIMAL */}
      <section className="py-40 px-6 relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
            <h2 className="text-[30vw] font-black italic">AIMANIA</h2>
        </div>

        <motion.div 
          {...fadeInUp}
          className="max-w-5xl mx-auto text-center relative z-10"
        >
          <h2 className="text-6xl md:text-9xl font-black text-white mb-12 tracking-tighter uppercase leading-[0.8]">
            READY TO <br /> <span className="text-[#d0ff00] humane-font">INVADE?</span>
          </h2>
          
          <Link
            to="/MODEL"
            className="group relative inline-flex items-center gap-12 border border-[#d0ff00] py-6 px-12 hover:bg-[#d0ff00] transition-all duration-500"
          >
            <span className="text-lg font-black uppercase tracking-widest text-[#d0ff00] group-hover:text-black transition-colors">
              Browse Models Now
            </span>
            <div className="w-3 h-3 bg-[#d0ff00] group-hover:bg-black transition-colors" />
          </Link>
        </motion.div>
      </section>

    </div>
  );
};

export default HomeSections;