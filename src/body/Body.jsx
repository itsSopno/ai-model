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
import KymaHero from "../Component/Kyma/kyma";
import HistorySection from "../History/History";
import AgenticSection from "../Component/AgenticSection/Agentic";
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

  // const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
  // const charVariant = {
  //   hidden: { opacity: 0, y: 20 },
  //   show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  // };

  if (isLoading) return <Loading onComplete={() => setIsLoading(false)} />;

  return (
    <main className="transition-colors duration-500 overflow-x-hidden font-sans">
      <LenisScroll />

     
     
<KymaHero></KymaHero>
{/* <HISTORY SECTION ></HISTORY> */}
<HistorySection></HistorySection>


 <HomeSections />
   
     

      {/* Section 02: Evolution - Glassmorphism (Theme Safe) */}
   <AgenticSection></AgenticSection>
      {/* Section 03: Cards - Neutral Indigo & Slate */}
    <section className="relative w-full py-32 px-6 md:px-12 bg-[#080808] border-t border-white/10 overflow-hidden">
      
      {/* 1. Structural Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="h-full w-[1px] bg-white/10 absolute left-1/2" />
        <div className="w-full h-[1px] bg-white/10 absolute top-1/2" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header with Technical Label */}
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-4">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-white leading-none">
            Our <span className="text-[#d0ff00] italic">Ecosystem</span>
          </h2>
          <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.4em]">
            [ Protocol — 04 ] Connectivity_
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-white/10 border border-white/10 shadow-2xl">
          
          {/* BUY CARD - Industrial Styling */}
          <div className="group bg-[#080808] p-12 md:p-20 flex flex-col justify-between hover:bg-[#d0ff00]/5 transition-colors duration-700">
            <div>
              <div className="flex items-center gap-4 mb-10 opacity-40">
                <div className="w-2 h-2 bg-white" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Acquire Intelligence</span>
              </div>
              <h1 className="text-7xl md:text-8xl font-black text-white mb-10 tracking-tighter uppercase leading-none group-hover:italic transition-all">
                BUY
              </h1>
              <ul className="space-y-6">
                {["Verified AI Models", "Developer Documentation", "24/7 Integration Support"].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-gray-400 font-bold uppercase text-xs tracking-widest">
                    <div className="w-4 h-[1px] bg-[#d0ff00]" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* SELL CARD - High Contrast */}
          <div className="group bg-[#080808] p-12 md:p-20 flex flex-col justify-between hover:bg-white/[0.02] transition-colors duration-700">
            <div>
              <div className="flex items-center gap-4 mb-10 opacity-40">
                <div className="w-2 h-2 bg-white" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Monetize Logic</span>
              </div>
              <h1 className="text-7xl md:text-8xl font-black text-white mb-10 tracking-tighter uppercase leading-none group-hover:italic transition-all">
                SELL
              </h1>
              <ul className="space-y-6 mb-16">
                {["Train & Sell Models", "Only 20% Royalty", "Analytics Dashboard"].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-gray-400 font-bold uppercase text-xs tracking-widest">
                    <div className="w-4 h-[1px] bg-white/20" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Brutalist Button */}
            <Link 
              to="/login" 
              className="group/btn relative inline-flex items-center gap-10 border border-[#d0ff00] py-6 px-10 self-start hover:bg-[#d0ff00] transition-all duration-500"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d0ff00] group-hover/btn:text-black transition-colors">
                Join Network
              </span>
              <div className="w-2 h-2 bg-[#d0ff00] group-hover/btn:bg-black transition-colors" />
            </Link>
          </div>

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