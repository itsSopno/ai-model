import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Loading({ onComplete }) {
  const loaderRef = useRef(null);
  const textRef = useRef(null);
  const progressRef = useRef(null);
  const bgRef = useRef(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Counter logic
    let start = 0;
    const end = 100;
    const duration = 2; // seconds
    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCounter(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    }
    window.requestAnimationFrame(step);

    const tl = gsap.timeline({
      onComplete: () => {
        // Exit Animation
        gsap.to(loaderRef.current, {
          y: "-100%",
          duration: 1.2,
          ease: [0.87, 0, 0.13, 1], // Custom Expo Ease
          onComplete: onComplete,
        });
      },
    });

    // Animation sequence
    tl.fromTo(
      textRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.2 }
    )
    .to(progressRef.current, {
      width: "100%",
      duration: 1.5,
      ease: "power2.inOut",
    }, "-=0.5")
    .to(textRef.current, {
      letterSpacing: "0.2em",
      duration: 1,
      ease: "power2.inOut",
    })
    .to(textRef.current, {
      opacity: 0,
      y: -50,
      duration: 0.5,
      ease: "power2.in",
    });

  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 w-full h-screen z-[9999] bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full" />

      <div className="relative overflow-hidden mb-4">
        <h1
          ref={textRef}
          className="loader-text font-black text-5xl md:text-8xl text-white tracking-tighter uppercase italic"
        >
          AI <span className="text-zinc-600">VERSE</span>
        </h1>
      </div>

      {/* Progress Section */}
      <div className="w-64 md:w-96 h-[1px] bg-white/10 relative overflow-hidden">
        <div 
          ref={progressRef}
          className="absolute top-0 left-0 h-full bg-white w-0" 
        />
      </div>

      <div className="mt-4 flex flex-col items-center">
        <span className="text-[10px] uppercase tracking-[0.5em] text-zinc-500 mb-2">
          Initializing Neural Network
        </span>
        <span className="font-mono text-sm text-white opacity-50">
          {counter}%
        </span>
      </div>
    </div>
  );
}