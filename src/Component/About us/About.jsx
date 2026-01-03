import React, { useEffect, useRef } from "react";
import image from "./ChatGPT Image Nov 29, 2025, 04_13_43 PM.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './About.css'
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax Background Text
      gsap.to(".bg-outline-text", {
        x: -200,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      // Reveal Animation for Text
      gsap.from(".reveal-item", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
        },
      });

      // Floating Image Card
      gsap.to(imageRef.current, {
        y: -30,
        duration: 3,
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
      className="about relative w-full min-h-screen  flex items-center overflow-hidden py-24 px-6 md:px-12"
    >
      {/* Background Cinematic Text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] w-full">
        <h2 className="bg-outline-text text-[25vw] font-black text-white leading-none whitespace-nowrap italic tracking-tighter">
          NEXUS • ARTIFICIAL • NEXUS
        </h2>
      </div>

      <div className="w-full max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        
        {/* LEFT SIDE: Content */}
        <div ref={textRef} className="order-2 lg:order-1 flex flex-col items-start">
          <div className="reveal-item flex items-center gap-4 mb-8">
            <span className="text-indigo-500 font-black tracking-widest text-xs uppercase italic">
              System Core 05
            </span>
            <div className="h-[1px] w-16 bg-gradient-to-r from-indigo-500 to-transparent"></div>
          </div>
          
          <h2 className="reveal-item text-6xl md:text-8xl font-black text-indigo-500 mb-10 leading-[0.9] tracking-tighter uppercase">
            Human Ingenuity <br /> 
            <span className="text-[#d0ff00] italic font-light">meets Neural Logic.</span>
          </h2>

          <div className="reveal-item space-y-8 text-gray-500 text-lg md:text-xl leading-relaxed max-w-2xl font-medium">
            <p>
              Welcome to <span className="text-[#d0ff00]">AI Verse Marketplace</span> — a high-performance ecosystem where creators deploy neural assets and innovators acquire intelligence. Our mission is to decentralize AI accessibility.
            </p>
            <p className="border-l-2 border-indigo-500/30 pl-8 italic">
              We synchronize developers, researchers, and enterprise entities in a singular vault of high-fidelity models and secure transactional layers.
            </p>
            <p>
              At AI Verse, we empower your digital sovereignty. Earn from your logic, build with our tools. Your vision, accelerated by artificial intelligence.
            </p>
          </div>

          <div className="reveal-item mt-12 flex flex-wrap gap-6">
            <button className="px-10 py-5 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-500">
              Join the Hub
            </button>
            <button className="px-10 py-5 border border-white/10 text-[#d0ff00] text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-white/5 transition-all duration-500">
              Network Status
            </button>
          </div>
        </div>

        {/* RIGHT SIDE: Visual Asset */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <div 
            ref={imageRef}
            className="relative w-full max-w-[550px] aspect-[4/5] group"
          >
            {/* Dynamic Glow Background */}
            <div className="absolute -inset-10 bg-indigo-600/10 blur-[120px] rounded-full opacity-50 group-hover:bg-indigo-600/20 transition-all duration-1000"></div>
            
            {/* Glass Container */}
            <div className="relative h-full w-full rounded-[3rem] border border-white/5 overflow-hidden bg-[#0a0a0f] p-3 backdrop-blur-3xl shadow-[0_0_80px_rgba(0,0,0,0.5)]">
              {/* Top Bar Decoration */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-white/5 rounded-full"></div>
              
              <img 
                src={image} 
                alt="AI Neural Network" 
                className="w-full h-full object-cover rounded-[2.5rem] opacity-60 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-1000 ease-out"
              />

              {/* Status Badge */}
              <div className="absolute top-12 right-12 bg-white/10 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-2xl hidden md:block">
                <p className="text-white text-[10px] font-black uppercase tracking-[0.2em] leading-tight">
                  Global Nodes <br/> 
                  <span className="text-indigo-400 text-lg">5.2K+ Active</span>
                </p>
              </div>

              {/* Bottom Decorative Line */}
              <div className="absolute bottom-8 left-12 right-12 flex items-center justify-between opacity-20">
                <span className="text-[8px] font-mono uppercase text-white tracking-widest">Auth: Secure</span>
                <span className="text-[8px] font-mono uppercase text-white tracking-widest">Vers: 2.0.4</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;