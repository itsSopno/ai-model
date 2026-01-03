import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion"; 
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LenisScroll from "../LenisScroll";
import { AuthContext } from "../Authcontext";
import Note from "../Component/NOTE/Note";
import Loading from "../Component/Loading/loading";
import { Link } from "react-router";
import HomeSections from "../Component/House/HomeSections";
import Model2nd from "../Component/2nd model/Model2nd";
import About from "../Component/About us/About";
import PrivacyTerms from "../Component/PrivacyTerms/PrivacyTerms";
import "./app.css"
function Body() {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Smooth Reveal for all sections
      gsap.utils.toArray("section").forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power2.out",
        });
      });
    });
    return () => ctx.revert();
  }, [isLoading]);

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
  const charVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  if (isLoading) return <Loading onComplete={() => setIsLoading(false)} />;

  return (
    <main className="transition-colors duration-500 overflow-x-hidden font-sans">
      <LenisScroll />

      {/* Hero Section - Uses Neutral Gradients */}
      <section className="relative w-full h-screen flex justify-center items-center text-center px-4 overflow-hidden">
      
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(99,102,241,0.1),transparent_70%)]" />
        
        <motion.h1
          className="relative z-10 font-black text-6xl md:text-[10rem] tracking-tighter leading-none"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.span className="block text-zinc-500 uppercase text-xs tracking-[0.8em] mb-6 font-medium">
            Intelligence Evolved
          </motion.span>
          <div className="flex justify-center overflow-hidden italic">
            {"AI VERSE".split("").map((c, i) => (
              <motion.span key={i} variants={charVariant} className="inline-block">
                {c === " " ? "\u00A0" : c}
              </motion.span>
            ))}
          </div>
        </motion.h1>
      </section>

      <HomeSections />

      {/* Section 01: History - Using Neutral Slate */}
      <section className="section-two relative w-full min-h-screen border-y border-zinc-200/10 px-8 py-32 flex flex-col justify-center">
        <span className="absolute top-10 left-10 text-[12rem] md:text-[20rem] font-bold opacity-5 pointer-events-none italic">
          01
        </span>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl md:text-7xl font-bold leading-tight tracking-tighter mb-8">
              HISTORY OF <br /> <span className="text-indigo-500">AI MODELS</span>
            </h2>
            <div className="h-1 w-20 bg-indigo-500" />
          </div>
          <p className="text-lg md:text-xl text-zinc-500 leading-relaxed font-light">
            Artificial Intelligence (AI) is the creation of machines that can think, learn, and make decisions like humans. Early AI focused on problem-solving and logical reasoning, now evolving toward advanced human-like intelligence.
          </p>
        </div>
      </section>

      {/* Section 02: Evolution - Glassmorphism (Theme Safe) */}
      <section className="section-three w-full py-20 px-4 md:px-10 ">
 
  <div className="w-full bg-gradient-to-br from-zinc-500/10 via-transparent to-transparent backdrop-blur-3xl rounded-[3.5rem] p-10 md:p-20 border border-white/5 relative overflow-hidden">
    
   
    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[120px] -z-10" />
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/5 blur-[120px] -z-10" />

    {/* CONTENT STRUCTURE */}
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-16">
      
      {/* TEXT LEFT */}
      <div className="flex-1 space-y-8">
        <div>
          <h3 className="text-indigo-500 uppercase tracking-[0.4em] text-[10px] mb-6 font-black">
            02 — Future Path
          </h3>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
            The Agentic <br />
            <span className="text-[#d0ff00] italic font-light">Era</span>
          </h1>
        </div>

        {/* Note Component */}
        <div className="scale-105 origin-left">
          <Note />
        </div>

        <p className="max-w-2xl text-xl md:text-2xl text-zinc-500 font-medium leading-relaxed tracking-tight">
          The AI revolution is shifting from simple classification to <span className="text-white">generative systems</span> and agentic AI with a deep focus on <span className="text-indigo-400">Responsibility</span>.
        </p>
      </div>

      {/* RIGHT SIDE DECORATION (Modern AI visual touch) */}
      <div className="hidden lg:block w-px h-80 bg-gradient-to-b from-transparent via-white/10 to-transparent mx-10" />
      
      <div className="lg:w-1/3">
        <div className="p-8 border border-white/5 rounded-3xl bg-white/[0.02]">
           <div className="flex gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-zinc-800" />
              <div className="w-2 h-2 rounded-full bg-zinc-800" />
           </div>
           <p className="text-xs text-zinc-600 font-mono leading-relaxed uppercase tracking-widest">
             Status: Activating Autonomous Nodes... <br />
             Focus: Neural Autonomy <br />
             Protocol: Responsible AI 2.0
           </p>
        </div>
      </div>

    </div>
  </div>
</section>

      {/* Section 03: Cards - Neutral Indigo & Slate */}
      <section className="section-four w-full py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-xs uppercase tracking-[0.5em] text-zinc-500 mb-20">Our Ecosystem</h2>
          
          <div className="grid md:grid-cols-2 gap-10">
            {/* BUY CARD - Lightly Tinted */}
            <motion.div 
              whileHover={{ y: -10 }} 
              className="group bg-indigo-500/5 p-12 rounded-[2.5rem] border border-indigo-500/10 hover:border-indigo-500/40 transition-all duration-500"
            >
              <h1 className="text-5xl font-black mb-6 group-hover:italic transition-all">BUY</h1>
              <ul className="space-y-4 text-zinc-500 text-lg font-light">
                {["Verified AI Models", "Developer Documentation", "24/7 Integration Support"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* SELL CARD - Neutral Zinc */}
            <motion.div 
              whileHover={{ y: -10 }} 
              className="group bg-zinc-500/5 p-12 rounded-[2.5rem] border border-zinc-500/10 hover:border-zinc-500/40 transition-all duration-500"
            >
              <h1 className="text-5xl font-black mb-6 group-hover:italic transition-all">SELL</h1>
              <ul className="space-y-4 text-zinc-500 text-lg font-light mb-8">
                {["Train & Sell Models", "Only 20% Royalty", "Analytics Dashboard"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full" /> {item}
                  </li>
                ))}
              </ul>
              <Link to="/login" className="inline-block px-8 py-3 bg-zinc-900 text-white dark:bg-white dark:text-black rounded-full font-bold text-sm uppercase tracking-widest transition-transform active:scale-95">
                Join Network
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
<section className="privacy">
  <PrivacyTerms></PrivacyTerms>
</section>
      {/* User Section */}
      {/* <section className="py-24 px-8 border-t border-zinc-200/10">
        <div className="max-w-7xl mx-auto">
          {user ? (
            <Model2nd />
          ) : (
            <div className="text-center py-24 opacity-40">
              <h2 className="text-2xl md:text-4xl font-light tracking-[0.3em] uppercase">Private Repository</h2>
              <p className="mt-4 text-sm text-zinc-500 italic">Please login to view your workspace</p>
            </div>
          )}
        </div>
      </section> */}

      <About />
    </main>
  );
}

export default Body;