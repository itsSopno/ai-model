
import React, { useEffect, useRef } from "react";
import image from "./ChatGPT Image Nov 29, 2025, 04_13_43 PM.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background Text Parallax (Unique Style)
      gsap.to(".bg-outline-text", {
        x: -100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Content Reveal Animation
      gsap.from(textRef.current.children, {
        opacity: 0,
        x: -50,
        stagger: 0.2,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        },
      });

      // Image Card Floating & Tilt Effect
      gsap.from(imageRef.current, {
        opacity: 0,
        scale: 0.8,
        rotate: 5,
        duration: 1.5,
        ease: "elastic.out(1, 0.7)",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 85%",
        },
      });

      // Continuous Floating animation for image
      gsap.to(imageRef.current, {
        y: -20,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-6 md:px-12"
    >
      {/* Background Large Text (Professional & Unique) */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 select-none pointer-events-none opacity-5 w-full">
        <h2 className="bg-outline-text text-[15vw] font-black text-white border-text leading-none whitespace-nowrap">
          INNOVATION • AI VERSE • INNOVATION
        </h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
        
        {/* Left Side: Content */}
        <div ref={textRef} className="order-2 lg:order-1">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-indigo-500 font-mono text-xl font-bold">05.</span>
            <div className="h-px w-12 bg-indigo-500"></div>
            <span className="text-indigo-400 uppercase tracking-widest text-sm font-bold">About our mission</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 leading-tight">
            Connecting Human <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Creativity with AI.
            </span>
          </h2>

          <div className="space-y-6 text-gray-400 text-lg md:text-xl leading-relaxed max-w-xl">
            <p>
              Welcome to AI Verse Marketplace — a platform where creators can
               sell their AI models and buyers can find ready-to-use solutions.
             Our goal is simple: make AI accessible for everyone. <br /> <br />
             We connect developers, researchers, and businesses in one place,
               offering high-quality models, secure transactions, and a growing
               community of innovators. <br /> <br />
               At AI Verse, we empower creators to earn from their work and help
               users access powerful AI tools instantly. Your ideas, powered by
               AI — all in one marketplace.
              {/* Welcome to <span className="text-white font-semibold">AI Verse Marketplace</span> — 
              এক নতুন ডিজিটাল বিপ্লব যেখানে ক্রিয়েটররা তাদের AI মডেল বিক্রি করে এবং বায়াররা খুঁজে পায় প্রয়োজনীয় সলিউশন। 
              আমাদের লক্ষ্য সহজ: AI-কে সবার জন্য সহজলভ্য করা। */}
            </p>
            <p>
              আমরা ডেভেলপার, রিসার্চার এবং বিজনেসকে একই প্ল্যাটফর্মে নিয়ে আসি, যা সিকিউর ট্রানজ্যাকশন এবং 
              হাই-কোয়ালিটি মডেলের নিশ্চয়তা দেয়।
            </p>
          </div>

          <div className="mt-10 flex gap-6">
            <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all transform hover:-translate-y-1">
              Join Community
            </button>
            <button className="px-8 py-4 border border-white/10 hover:bg-white/5 text-white rounded-xl font-bold transition-all">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Side: Interactive Image Card */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <div 
            ref={imageRef}
            className="relative w-full max-w-[450px] aspect-[4/5] group"
          >
            {/* Background Glow */}
            <div className="absolute -inset-4 bg-indigo-500/20 blur-3xl rounded-full group-hover:bg-indigo-500/40 transition-colors duration-500"></div>
            
            {/* Main Image Container */}
            <div className="relative h-full w-full rounded-[2.5rem] border border-white/10 overflow-hidden bg-[#0a0c14] p-4 backdrop-blur-3xl shadow-2xl">
              <div className="absolute top-6 left-6 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
              
              <img 
                src={image} 
                alt="About AI" 
                className="w-full h-full object-cover rounded-[2rem] opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />

              {/* Float Badge */}
              <div className="absolute bottom-10 -left-8 bg-indigo-600 p-4 rounded-2xl shadow-xl hidden md:block">
                <p className="text-white font-bold text-sm leading-tight">Trusted by <br/> 5000+ Creators</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;

//  Welcome to AI Verse Marketplace — a platform where creators can
//               sell their AI models and buyers can find ready-to-use solutions.
//               Our goal is simple: make AI accessible for everyone. <br /> <br />
//               We connect developers, researchers, and businesses in one place,
//               offering high-quality models, secure transactions, and a growing
//               community of innovators. <br /> <br />
//               At AI Verse, we empower creators to earn from their work and help
//               users access powerful AI tools instantly. Your ideas, powered by
//               AI — all in one marketplace.