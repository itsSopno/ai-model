// import React, { useContext, useState, useEffect, useRef } from "react";
// import { AuthContext } from "../../Authcontext";
// import { Link, useNavigate } from "react-router";
// import gsap from "gsap";
// import AISpinner from "../AIspinner/AISpinner";

// const Model = () => {
//   const { modelData } = useContext(AuthContext);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [framework, setFramework] = useState("All");
//   const navigate = useNavigate();
//   const cardsRef = useRef([]);

//   const loading = !modelData || modelData.length === 0;
//   const frameworks = ["All", ...new Set((modelData || []).map((item) => item.framework))];

//   const filteredModels = (modelData || [])
//     .filter((item) => item.createdAt)
//     .filter(
//       (item) =>
//         item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         item.useCase.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//     .filter((item) => (framework === "All" ? true : item.framework === framework));

//   useEffect(() => {
//     if (loading) return;
//     gsap.fromTo(
//       cardsRef.current,
//       { opacity: 0, y: 20 },
//       { opacity: 1, y: 0, stagger: 0.03, duration: 0.5, ease: "power2.out" }
//     );
//   }, [filteredModels, loading]);

//   return (
//     <section className="w-full min-h-screen  text-indigo-500">
//       {/* HEADER: Full Width with Border */}
//       <div className="w-full border-b border-white/5 px-6 md:px-10 py-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
//         <div>
//           <h2 className="text-indigo-500 font-black tracking-[0.4em] uppercase text-[10px] mb-2">Neural Nexus</h2>
//           <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">
//             Market<span className="text-indigo/20 italic font-light">place</span>
//           </h1>
//         </div>

//         {/* CONTROLS */}
//         <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
//           <input
//             type="text"
//             placeholder="Search assets..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="flex-grow lg:w-80 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl outline-none focus:border-indigo-500 transition-all text-sm"
//           />
//           <select
//             value={framework}
//             onChange={(e) => setFramework(e.target.value)}
//             className="bg-[#0a0a0f] border border-white/10 px-6 py-4 rounded-2xl outline-none text-sm text-gray-400"
//           >
//             {frameworks.map((fw) => <option key={fw} value={fw}>{fw}</option>)}
//           </select>
//         </div>
//       </div>

//       {/* GRID: Responsive from 2 to 8 columns */}
//       <div className="w-full px-6 md:px-10 py-10">
//         {loading ? (
//           <div className="flex items-center justify-center py-40"><AISpinner /></div>
//         ) : (
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8 gap-4 md:gap-6">
//             {filteredModels.map((expert, index) => (
//               <Link
//                 to={`/MODEL/${expert._id}`}
//                 key={expert._id}
//                 ref={(el) => (cardsRef.current[index] = el)}
//                 className="group bg-[#0a0a0f] border border-white/5 p-5 rounded-2xl transition-all duration-500 hover:border-indigo-500/50 hover:-translate-y-1 shadow-2xl"
//               >
//                 <div className="aspect-square w-full mb-4 flex items-center justify-center bg-white/5 rounded-xl p-4 overflow-hidden">
//                   <img
//                     src={expert.image || "/default-model.png"}
//                     alt={expert.name}
//                     className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-700"
//                   />
//                 </div>
//                 <h3 className="text-xs font-black tracking-tight text-gray-300 uppercase truncate mb-1">{expert.name}</h3>
//                 <p className="text-[9px] font-bold text-indigo-500/60 uppercase mb-2">{expert.framework}</p>
//                 <p className="text-[10px] text-gray-600 line-clamp-1 italic">{expert.useCase}</p>
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Model;
import React, { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../Authcontext";
import { Link } from "react-router";
import gsap from "gsap";
import AISpinner from "../AIspinner/AISpinner";

const Model = () => {
  const { modelData } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [framework, setFramework] = useState("All");
  const cardsRef = useRef([]);

  const loading = !modelData || modelData.length === 0;
  const frameworks = ["All", ...new Set((modelData || []).map((item) => item.framework))];

  const filteredModels = (modelData || [])
    .filter((item) => item.createdAt)
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.useCase.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) => (framework === "All" ? true : item.framework === framework));

  useEffect(() => {
    if (loading) return;
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, stagger: 0.02, duration: 0.4, ease: "power3.out" }
    );
  }, [filteredModels, loading]);

  return (
    <section className="w-full min-h-screen bg-[#080808] text-white pt-24 border-t border-white/10">
      
      {/* 1. HEADER & CONTROLS: Industrial Grid */}
      <div className="w-full border-b border-white/10 px-6 md:px-12 py-16 flex flex-col lg:flex-row lg:items-end justify-between gap-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[#d0ff00] font-mono text-[10px] font-bold uppercase tracking-[0.4em]">
              [EXPLORE MODELS]
            </span>
            <div className="h-[1px] w-12 bg-[#d0ff00]/30" />
          </div>
          <h1 className="text-3xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
            AI<span className="text-[#d0ff00] italic font-light humane-font">WORLD</span>
          </h1>
        </div>

        {/* SEARCH & FILTER: Sharp Brutalist UI */}
        <div className="flex flex-col sm:flex-row gap-0 border border-white/10 bg-[#0a0a0a] w-full lg:w-auto overflow-hidden">
          <div className="relative border-b sm:border-b-0 sm:border-r border-white/10 flex-grow">
            <input
              type="text"
              placeholder="SEARCH NEURAL ASSETS..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full lg:w-80 bg-transparent px-6 py-5 outline-none text-[11px] font-black uppercase tracking-widest placeholder:text-gray-700 focus:bg-white/5 transition-colors"
            />
          </div>
          <select
            value={framework}
            onChange={(e) => setFramework(e.target.value)}
            className="bg-transparent px-8 py-5 outline-none text-[11px] font-black uppercase tracking-widest text-[#d0ff00] cursor-pointer hover:bg-white/5 transition-colors"
          >
            {frameworks.map((fw) => <option key={fw} value={fw} className="bg-black text-white">{fw}</option>)}
          </select>
        </div>
      </div>

      {/* 2. GRID: Massive High-Density Layout */}
      <div className="w-full px-6 md:px-12 py-12">
        {loading ? (
          <div className="flex items-center justify-center py-40"><AISpinner /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-px bg-white/10 border border-white/10">
            {filteredModels.map((expert, index) => (
              <Link
                to={`/MODEL/${expert._id}`}
                key={expert._id}
                ref={(el) => (cardsRef.current[index] = el)}
                className="group bg-[#080808] p-8 flex flex-col relative transition-all duration-500 hover:bg-[#d0ff00]/5 overflow-hidden"
              >
                {/* ID Tag */}
                <div className="flex justify-between items-start mb-8">
                    <span className="text-[9px] font-mono text-gray-600 font-bold uppercase tracking-widest">
                        REF_{index.toString().padStart(3, '0')}
                    </span>
                    <div className="w-1.5 h-1.5 bg-white/20 group-hover:bg-[#d0ff00] transition-colors duration-500" />
                </div>

                {/* Visual Asset Container */}
                <div className="aspect-square w-full mb-10 relative overflow-hidden bg-white/[0.02] border border-white/5">
                  <img
                    src={expert.image || "/default-model.png"}
                    alt={expert.name}
                    className="w-full h-full object-contain grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 p-6"
                  />
                  {/* Subtle Grid Overlay */}
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
                </div>

                {/* Metadata Table Style */}
                <div className="mt-auto space-y-4">
                    <h3 className="text-lg font-black tracking-tighter text-white uppercase leading-none group-hover:text-[#d0ff00] transition-colors">
                        {expert.name}
                    </h3>
                    
                    <div className="pt-4 border-t border-white/5 flex flex-col gap-2">
                        <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-[0.2em]">
                            <span className="text-gray-600">Framework</span>
                            <span className="text-white">{expert.framework}</span>
                        </div>
                        <p className="text-[10px] text-gray-500 font-medium italic leading-relaxed line-clamp-2">
                            "{expert.useCase}"
                        </p>
                    </div>
                </div>

                {/* Decorative Bottom Line */}
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#d0ff00] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* 3. DOCUMENT FOOTER CALLOUT */}
      <div className="w-full border-t border-white/10 p-12 flex justify-between items-center opacity-30 font-mono text-[8px] uppercase tracking-[0.4em]">
        <span>Network Synchronization: Stable</span>
        <span>© 2026 AI Verse Neural Hub</span>
      </div>
    </section>
  );
};

export default Model;