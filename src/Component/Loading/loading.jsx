import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Loading({ onComplete }) {
  const loaderRef = useRef(null);
  const percentRef = useRef(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2; 
    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCounter(Math.floor(progress * 100));
      if (progress < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          y: "-100%",
          duration: 1,
          ease: "expo.inOut",
          onComplete: onComplete,
        });
      },
    });

    // Simple fade in and out
    tl.fromTo(percentRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" }
    )
    .to(percentRef.current, {
      opacity: 0,
      y: -20,
      delay: 1.2,
      duration: 0.5
    });

  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 w-full h-screen z-[9999] bg-[#080808] flex items-center justify-center overflow-hidden font-sans"
    >
      {/* Background Grid - Khub halka, texture hishebe */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="h-full w-[1px] bg-white absolute left-1/4" />
        <div className="h-full w-[1px] bg-white absolute left-1/2" />
        <div className="h-full w-[1px] bg-white absolute left-3/4" />
      </div>

      <div ref={percentRef} className="relative z-10 text-center">
        {/* Progress Counter - Hero element */}
        <div className="flex items-baseline gap-2">
          <span className="text-[12vw] md:text-[8vw] font-black tracking-tighter text-white leading-none">
            {counter}
          </span>
          <span className="text-4xl md:text-6xl font-light italic text-[#d0ff00]">
            %
          </span>
        </div>

        {/* Status Line - Minimalist */}
        <div className="mt-4 overflow-hidden">
          <p className="text-[10px] uppercase tracking-[0.6em] text-gray-500 font-bold">
            System. <span className="text-white">Loading</span>
          </p>
        </div>
      </div>

      {/* Bottom Right - Small Technical Detail */}
      <div className="absolute bottom-10 right-10 flex items-center gap-4 opacity-20">
        <span className="text-[8px] font-mono text-white tracking-widest uppercase">
          Ver. 2.0.4 // Global
        </span>
        <div className="w-8 h-[1px] bg-white" />
      </div>
    </div>
  );
}