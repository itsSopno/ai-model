import { useState, useEffect, useContext } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LenisScroll from "../LenisScroll";
import { AuthContext } from "../Authcontext";
import Useri from "../Component/usercard/User";
import Note from "../Component/NOTE/Note";
import Loading from "../Component/Loading/loading";
import "./App.css";

function Body() {
  const { user } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);

  // 🔹 Loading effect
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

     
      gsap.from(".section-five h1", {
        opacity: 0,
        y: 100,
        scale: 0.8,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".section-five",
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".section-five h2", {
        opacity: 0,
        y: 80,
        duration: 1,
        delay: 0.3,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".section-five",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".section-five .user-card", {
        opacity: 0,
        y: 60,
        stagger: 0.2,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".section-five",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
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
      {/* HERO */}
      <section className="w-full h-screen bg-[#11190C] flex justify-center items-center text-center">
        <LenisScroll />
        <motion.h1
          className="AI-VERSE font-bold text-5xl sm:text-6xl md:text-8xl leading-tight text-[#7AF201]"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.span style={{ display: "block" }}>
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

    
      <section className="section-two w-full min-h-screen bg-[#7AF201] rounded-tl-4xl rounded-tr-4xl px-8 py-16">
        <h1 className="text-[#11190C] text-[200px] font-extrabold">01</h1>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-[#11190C] text-[60px] md:text-[40px] font-bold">
            AI Models: The Engine of Modern Intelligence
          </h1>
          <p className="text-[#11190C] text-[22px] md:text-[18px] max-w-4xl mt-6 text-center">
            An AI model is a program trained on data to recognize patterns, make predictions, or generate content — it’s the brain that powers intelligent systems.
          </p>
        </div>
      </section>

    
      <section className="section-three w-full bg-[#11190C] text-[#7AF201] px-8 py-16 rounded-tl-4xl rounded-tr-4xl">
        <h1 className="text-[180px] font-extrabold text-[#7AF201]">02</h1>
        <h1 className="text-[40px] font-bold mb-6">
          The Evolution and Future of AI Models
        </h1>
        <Note />
        <p className="max-w-4xl text-[20px]">
          The AI revolution is shifting from simple classification models to generative systems, agentic AI, and a deep focus on Responsible AI.
        </p>
      </section>

    
      <section className="section-four w-full min-h-screen bg-[#7AF201] flex flex-col justify-center items-center text-center rounded-tl-4xl rounded-tr-4xl px-8">
        <h1 className="text-[#11190C] text-[200px] md:text-[120px] font-extrabold mb-6">03</h1>
        <h2 className="text-[#11190C] text-[36px] md:text-[28px] font-semibold mb-4">
          The Future of AI: Creativity Meets Logic
        </h2>
        <p className="text-[#11190C] text-[22px] md:text-[18px] max-w-3xl leading-relaxed">
          Every model you build becomes part of an intelligent ecosystem where humans and machines evolve together.
        </p>
      </section>

     
      {user && (
        <section className="section-five w-full bg-[#11190C] rounded-tr-4xl rounded-tl-4xl py-16">
          <h1 className="text-[180px] text-[#7AF201] font-extrabold">04</h1>
          <h2 className="text-[#7AF201] text-[36px] mb-8">Created by You</h2>
          <Useri className="user-card" />
        </section>
      )}
    </>
  );
}

export default Body;
