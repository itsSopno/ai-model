import { useState, useEffect, useContext} from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LenisScroll from "../LenisScroll";
import { AuthContext } from "../Authcontext";
import Useri from "../Component/usercard/User";
import Note from "../Component/NOTE/Note";
import Loading from "../Component/Loading/loading";
import "./App.css";
import { Link } from "react-router";
import Model from "../Component/Model/Model";
import About from "../Component/About us/About";

function Body() {
  const { user,} = useContext(AuthContext);

  
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  // 🔹 GSAP animations
  useEffect(() => {
    if (isLoading) return; 

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Section-two
      gsap.from(".section-two", {
        scrollTrigger: {
          trigger: ".section-two",
          start: "top 85%",
          end: "bottom 60%",
          scrub: true,
        },
        opacity: 0,
        y: 150,
        rotate: 3,
        duration: 1.5,
        ease: "power4.out",
      });
      gsap.from(".section-two h1", {
        scrollTrigger: { trigger: ".section-two", start: "top 80%" },
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "back.out(1.7)",
      });
      gsap.from(".section-two p", {
        scrollTrigger: { trigger: ".section-two", start: "top 75%" },
        opacity: 0,
        y: 80,
        duration: 1.5,
        ease: "power2.out",
      });

      // Section-three
      gsap.from(".section-three", {
        scrollTrigger: {
          trigger: ".section-three",
          start: "top 85%",
          end: "bottom 60%",
          scrub: true,
        },
        opacity: 0,
        y: 100,
        duration: 1.4,
        ease: "power4.out",
      });
      gsap.from(".section-three h1", {
        scrollTrigger: { trigger: ".section-three", start: "top 80%" },
        opacity: 0,
        x: -100,
        duration: 1.2,
        ease: "power3.out",
      });
     
gsap.from(".service-card", {
  scrollTrigger: {
    trigger: ".service-card",
    start: "top 90%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  y: 80,
  duration: 1.4,
  ease: "power3.out",
  stagger: 0.2,
});

      gsap.from(".section-three p", {
        scrollTrigger: { trigger: ".section-three", start: "top 75%" },
        opacity: 0,
        x: 100,
        duration: 1.5,
        ease: "power3.out",
      });

      // Section-four
      gsap.from(".section-four", {
        scrollTrigger: {
          trigger: ".section-four",
          start: "top 85%",
          end: "bottom 60%",
          scrub: true,
        },
        opacity: 0,
        y: 120,
        scale: 0.95,
        duration: 1.5,
        ease: "power4.out",
      });
      gsap.from(".section-four h1, .section-four h2, .section-four p", {
        scrollTrigger: { trigger: ".section-four", start: "top 80%" },
        opacity: 0,
        y: 60,
        stagger: 0.2,
        duration: 1.2,
        ease: "back.out(1.7)",
      });
    });

    return () => ctx.revert();
  }, [isLoading]);

 
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
  const charVariant = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 500 } },
  };
  if (isLoading) return <Loading onComplete={() => setIsLoading(false)} />;

  return (
    <>
      <section className="w-full h-screen  flex justify-center items-center text-center "   >
        <LenisScroll />
        <motion.h1
          className="AI-VERSE font-bold text-5xl sm:text-6xl md:text-8xl leading-tight text-[#92afcf]"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.span style={{ display: "block", color: "var(--text)" }}>
            {"WELCOME TO".split("").map((c, i) => (
              <motion.span key={i} variants={charVariant}>
                {c}
              </motion.span>
            ))}
          </motion.span>
          <motion.span style={{ display: "block" }}>
            {"AI VERSE".split("").map((c, i) => (
              <motion.span key={i} variants={charVariant}>
                {c}
              </motion.span>
            ))}
          </motion.span>
        </motion.h1>
      </section>

     
      <section className="section-two w-full min-h-screen bg-[#92afcf] rounded-tl-4xl rounded-tr-4xl px-8 py-16  bg-no-repeat bg-center" 
 >

        <h1 className=" text-[200px] font-extrabold">01</h1>
        <div className="flex flex-col items-center justify-center">
          <h1 className=" text-[60px] md:text-[40px] font-bold">
          History of Artificial Intelligence
          </h1>
          <p className=" text-[22px] md:text-[18px] max-w-4xl mt-6 text-center">
          Artificial Intelligence (AI) is the creation of machines that can think, learn, and make decisions like humans. The term “Artificial Intelligence” was first coined by John McCarthy in 1956 at the Dartmouth Conference. Early AI focused on problem-solving and logical reasoning.

AI research faced challenges during the AI winters due to limited computing power, but it revived in the 1990s with machine learning, neural networks, and big data. Today, AI powers virtual assistants, autonomous vehicles, recommendation systems, and healthcare tools, and continues to evolve toward more advanced human-like intelligence.
          </p>
        </div>
      </section>

    
      <section className="section-three w-full  text-[#92afcf] px-8 py-16 rounded-tl-4xl rounded-tr-4xl">
        <h1 className="text-[180px] font-extrabold ">02</h1>
        <h1 className="text-[40px] font-bold mb-6">
          The Evolution and Future of AI Models
        </h1>
        <Note />
        <p className="max-w-4xl text-[20px]">
          The AI revolution is shifting from simple classification models to generative systems, agentic AI, and a deep focus on Responsible AI.
        </p>
      </section>

     
      
   <section className="section-four w-full h-auto pb-[50px] bg-[#92afcf] rounded-tl-4xl rounded-tr-4xl">
  <h1 className=" text-[200px] md:text-[120px] font-extrabold mb-6">03</h1>

  <div className="flex flex-col justify-center items-center text-center">
    <h2 className="text-black text-[36px] md:text-[28px] font-semibold mb-10">
      WHAT WE HAVE FOR YOU ?
    </h2>

    <div className="flex flex-wrap gap-12 justify-center">

      {/* BUY CARD */}
      <div className="cool-card service-card w-80">
        <div className="cool-card-inner bg-white/20 backdrop-blur-xl border border-white/30 
                        rounded-3xl p-8 shadow-xl transition-all hover:shadow-2xl">
          <h1 className="text-4xl font-bold  mb-4">BUY</h1>
          <ul className="space-y-3  font-medium">
            <li>AI models in various categories</li>
            <li>Check out free models</li>
            <li>Search through verified models</li>
            <li>Use models in your projects</li>
            <li>24/7 support and documentation</li>
          </ul>
        </div>
      </div>

      {/* SELL CARD */}
      <div className="cool-card service-card w-80">
        <div className="cool-card-inner bg-white/20 backdrop-blur-xl border border-white/30
                        rounded-3xl p-8 shadow-xl transition-all hover:shadow-2xl">
          <h1 className="text-4xl font-bold  mb-4">SELL</h1>
          <ul className="  font-medium">
            <li>Train, upload and sell your models</li>
            <li>Only 20% royalty rate</li>
            <li>Showcase your portfolio</li>
            <li>Analytics and insights</li>
            <li>Marketing support</li>
          </ul>
          <Link to="login">LOGIN HERE</Link>
        </div>
      </div>

    </div>
  </div>
</section>

      {/* {user && ( */}
        <section className=" section-five w-full  rounded-tr-4xl rounded-tl-4xl py-16">
          <h1 className="text-[180px]  font-extrabold">04</h1>
          {user ? (<> <h2 className=" text-center text-[60px] mb-8">CREATED BY YOU</h2>
          <Useri /> </>) : (<Model></Model>)}
          {/* <h2 className="text-[#92afcf] text-center text-[60px] mb-8">CREATED BY YOU</h2>
          <Useri /> */}
        </section>
      {/* )} */}
      <About></About>
    </>
  );
}

export default Body;
