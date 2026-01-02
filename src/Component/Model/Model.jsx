import React, { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../Authcontext";
import { Link, useNavigate } from "react-router";
import gsap from "gsap";
import AISpinner from "../AIspinner/AISpinner";

const Model = () => {
  const { modelData } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [framework, setFramework] = useState("All");
  const navigate = useNavigate();
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
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.03, duration: 0.5, ease: "power2.out" }
    );
  }, [filteredModels, loading]);

  return (
    <section className="w-full min-h-screen  text-indigo-500">
      {/* HEADER: Full Width with Border */}
      <div className="w-full border-b border-white/5 px-6 md:px-10 py-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div>
          <h2 className="text-indigo-500 font-black tracking-[0.4em] uppercase text-[10px] mb-2">Neural Nexus</h2>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">
            Market<span className="text-indigo/20 italic font-light">place</span>
          </h1>
        </div>

        {/* CONTROLS */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <input
            type="text"
            placeholder="Search assets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow lg:w-80 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl outline-none focus:border-indigo-500 transition-all text-sm"
          />
          <select
            value={framework}
            onChange={(e) => setFramework(e.target.value)}
            className="bg-[#0a0a0f] border border-white/10 px-6 py-4 rounded-2xl outline-none text-sm text-gray-400"
          >
            {frameworks.map((fw) => <option key={fw} value={fw}>{fw}</option>)}
          </select>
        </div>
      </div>

      {/* GRID: Responsive from 2 to 8 columns */}
      <div className="w-full px-6 md:px-10 py-10">
        {loading ? (
          <div className="flex items-center justify-center py-40"><AISpinner /></div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8 gap-4 md:gap-6">
            {filteredModels.map((expert, index) => (
              <Link
                to={`/MODEL/${expert._id}`}
                key={expert._id}
                ref={(el) => (cardsRef.current[index] = el)}
                className="group bg-[#0a0a0f] border border-white/5 p-5 rounded-2xl transition-all duration-500 hover:border-indigo-500/50 hover:-translate-y-1 shadow-2xl"
              >
                <div className="aspect-square w-full mb-4 flex items-center justify-center bg-white/5 rounded-xl p-4 overflow-hidden">
                  <img
                    src={expert.image || "/default-model.png"}
                    alt={expert.name}
                    className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <h3 className="text-xs font-black tracking-tight text-gray-300 uppercase truncate mb-1">{expert.name}</h3>
                <p className="text-[9px] font-bold text-indigo-500/60 uppercase mb-2">{expert.framework}</p>
                <p className="text-[10px] text-gray-600 line-clamp-1 italic">{expert.useCase}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Model;