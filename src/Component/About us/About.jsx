import React, { useEffect, useRef } from "react";
import image from "./ChatGPT Image Nov 29, 2025, 04_13_43 PM.png";
import "./About.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in the whole section
      gsap.from(".about-head", {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-head",
          start: "top 85%",
        },
      });

      // Animate paragraph
      gsap.from(".about-p", {
        opacity: 0,
        y: 40,
        duration: 1.2,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-p",
          start: "top 90%",
        },
      });

      // Animate image
      gsap.from(".about-image img", {
        opacity: 0,
        scale: 0.7,
        duration: 1.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-image",
          start: "top 85%",
        },
      });

      // Page number floating animation
      gsap.to(".page-number", {
        y: -20,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "power1.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="about head about-head" ref={sectionRef}>
        <h1 className="page-number">05</h1>
        <h1 className="about-h1">ABOUT US</h1>

        <div className="about-core">
          <div>
            <p className="about-p text-[20px] md:text-[18px] leading-relaxed">
              Welcome to AI Verse Marketplace — a platform where creators can
              sell their AI models and buyers can find ready-to-use solutions.
              Our goal is simple: make AI accessible for everyone. <br /> <br />
              We connect developers, researchers, and businesses in one place,
              offering high-quality models, secure transactions, and a growing
              community of innovators. <br /> <br />
              At AI Verse, we empower creators to earn from their work and help
              users access powerful AI tools instantly. Your ideas, powered by
              AI — all in one marketplace.
            </p>
          </div>

          <div className="about-image">
            <img src={image} alt="About AI Verse" />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
