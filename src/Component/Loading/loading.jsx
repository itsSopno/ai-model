// Loading.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import './Loading.css'

export default function Loading({ onComplete }) {
  const loaderRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: onComplete, // notify parent when done
        });
      },
    });

    // Animation sequence
    tl.fromTo(
      textRef.current,
      { opacity: 0, scale: 0.6, rotateY: 90 },
      { opacity: 1, scale: 1.3, rotateY: 0, duration: 1.2, ease: "back.out(2)" }
    )
      .to(textRef.current, {
        scale: 1,
        textShadow: "0px 0px 40px #92afcf",
        duration: 0.8,
        ease: "power1.inOut",
      })
      .to(textRef.current, {
        letterSpacing: "0.5em",
        color: "#92afcf",
        duration: 1,
        ease: "power2.inOut",
      })
      .to(textRef.current, {
        opacity: 0,
        scale: 2,
        duration: 0.6,
        ease: "power2.in",
      });
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="loader-container flex items-center justify-center  fixed top-0 left-0 w-full h-screen z-[9999]"
    >
      <h1
        ref={textRef}
        className="loader-text font-bold text-[60px] md:text-[120px]  text-[#92afcf] :tracking-widest"
      >
        AI <span className="text-white">VERSE</span>
      </h1>
    </div>
  );
}
