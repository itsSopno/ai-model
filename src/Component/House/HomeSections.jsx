import React, { useContext, useRef, useEffect, useState } from "react";
import { AuthContext } from "../../Authcontext";
import { Link } from "react-router";
import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";

const HomeSections = () => {
  const { modelData } = useContext(AuthContext);

  // মডেল ডেটাকে সর্ট করে প্রথম ৮টি নেওয়া
  const recentModels = modelData?.length
    ? [...modelData]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 8)
    : [];

  
  const duplicatedModels = [...recentModels, ...recentModels];

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="w-full  text-gray-100 overflow-hidden font-sans">
      {/* Background Glow Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* 1. Featured AI Models - Auto Sliding Section */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <motion.div initial="hidden" whileInView="visible" variants={fadeIn}>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent mb-4">
              FUTURE OF INTELLIGENCE
            </h2>
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-indigo-500"></span>
              <p className="text-indigo-400 font-medium tracking-[0.2em] uppercase text-xs">
                Live Model Stream
              </p>
              <span className="h-px w-8 bg-indigo-500"></span>
            </div>
          </motion.div>
        </div>

        {/* Framer Motion Infinite Slider */}
        <div className="relative flex overflow-hidden">
          <motion.div
            className="flex gap-8 pr-8"
            animate={{
              x: [0, -1920], // আপনার কার্ডের টোটাল উইডথ অনুযায়ী এটি অ্যাডজাস্ট হতে পারে
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40, // স্লাইডারের গতি নিয়ন্ত্রণ করে (বেশি মানে স্লো)
                ease: "linear",
              },
            }}
            style={{ width: "max-content" }}
            whileHover={{ transition: { duration: 100 } }} // হোভার করলে স্লো হয়ে যাবে
          >
            {duplicatedModels.map((model, index) => (
              <motion.div
                key={`${model._id}-${index}`}
                className="w-72 md:w-85 flex-shrink-0"
              >
                <Link
                  to={`/MODEL/${model._id}`}
                  className="group block relative bg-[#0a0c14]/80 border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-md hover:border-indigo-500/40 transition-all duration-500"
                >
                  <div className="aspect-square mb-8 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-transparent flex items-center justify-center relative overflow-hidden">
                    <img
                      src={model.image || "/default-model.png"}
                      alt={model.name}
                      className="w-28 h-28 object-contain z-10 group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Inner Card Glow */}
                    <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <div className="space-y-3">
                    <span className="text-indigo-500 text-[10px] font-bold tracking-[0.15em] uppercase">
                      {model.framework || "Core Architecture"}
                    </span>
                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                      {model.name}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed font-light">
                      {model.useCase}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Fade Gradients for a smooth look */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#030508] to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#030508] to-transparent z-20" />
        </div>
      </section>

      {/* 2. About AI Models - Clean Split Layout */}
    <section className="w-full py-24 px-6 md:px-16 border-t border-white/5 bg-[#doffoo]">
  {/* Container: max-w সরিয়ে w-full করা হয়েছে */}
  <div className="w-full grid lg:grid-cols-2 gap-12 lg:gap-32 items-center">
    
    {/* LEFT CONTENT */}
    <motion.div 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true }} 
      variants={fadeIn}
      className="space-y-8"
    >
      <div className="space-y-4">
        <h2 className="text-indigo-500 font-black tracking-[0.4em] uppercase text-[10px]">
          Operational Infrastructure
        </h2>
        <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter uppercase">
          A New Era of <br /> 
          <span className="text-[#d0ff00] italic font-light">AI Integration</span>
        </h2>
      </div>

      <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-2xl">
        AI Verse isn't just a directory; it's a bridge between complex research and real-world application. 
        We curate high-performance models, providing clear implementation paths so you can focus on building 
        what matters most.
      </p>

      <div className="flex gap-6 items-center pt-4">
        <div className="h-16 w-[1px] bg-gradient-to-b from-indigo-500 to-transparent" />
        <p className="text-sm md:text-base italic text-gray-600 max-w-xs leading-tight font-medium">
          "The best way to predict the future is to invent it."
        </p>
      </div>
    </motion.div>

    {/* RIGHT STATS: Full width grid */}
    <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 md:gap-6 w-full">
      {[
        { title: "Models", count: "200+" },
        { title: "Latency", count: "<20ms" },
        { title: "Uptime", count: "99.9%" },
        { title: "Devs", count: "5K+" },
      ].map((stat, i) => (
        <motion.div 
          key={i}
          whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.02)" }}
          className="p-10 md:p-14 rounded-[2.5rem] bg-[#0a0a0f] border border-white/5 flex flex-col justify-center items-center transition-all duration-500 shadow-2xl"
        >
          <div className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tighter italic">
            {stat.count}
          </div>
          <div className="text-indigo-500 text-[10px] md:text-xs uppercase tracking-[0.3em] font-black opacity-80">
            {stat.title}
          </div>
        </motion.div>
      ))}
    </div>

  </div>
</section>
      {/* 3. CTA Section - Minimalist & Bold */}
      <section className="py-24 px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="max-w-6xl mx-auto bg-gradient-to-b from-indigo-600 to-indigo-900 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-[0_0_50px_rgba(79,70,229,0.3)]"
        >
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
              READY TO GET STARTED?
            </h2>
            <Link
              to="/MODEL"
              className="inline-block px-10 py-5 bg-white text-indigo-900 rounded-full font-black text-lg hover:scale-105 transition-transform shadow-2xl"
            >
              BROWSE MODELS NOW
            </Link>
          </div>
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 rounded-full -ml-20 -mb-20 blur-3xl" />
        </motion.div>
      </section>
    </div>
  );
};

export default HomeSections;