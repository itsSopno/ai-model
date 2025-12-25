import { useEffect, useRef } from "react";
import gsap from "gsap";

const AISpinner = () => {
  const ringRef = useRef(null);

  useEffect(() => {
    gsap.to(ringRef.current, {
      rotate: 360,
      repeat: -1,
      ease: "linear",
      duration: 1.1,
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        ref={ringRef}
        className="w-16 h-16 rounded-full border-4 
                   border-indigo-500/30 border-t-indigo-500"
      />
      <p className="text-white/60 text-sm tracking-wide">
        Initializing AI Models…
      </p>
    </div>
  );
};

export default AISpinner;
