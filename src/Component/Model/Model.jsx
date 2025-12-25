import React, { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../Authcontext";
import { Link, useNavigate } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AISpinner from "../AIspinner/AISpinner";
import "./Model.css";

gsap.registerPlugin(ScrollTrigger);

const Model = () => {
  const { modelData } = useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [framework, setFramework] = useState("All");

  const navigate = useNavigate();
  const cardsRef = useRef([]);

  // ✅ REAL loading state (NO fake timeout)
  const loading = !modelData || modelData.length === 0;

  
  const frameworks = [
    "All",
    ...new Set((modelData || []).map(item => item.framework)),
  ];

  // Filter models
  const filteredModels = (modelData || [])
    .filter(item => item.createdAt)
    .filter(
      item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.useCase.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(item =>
      framework === "All" ? true : item.framework === framework
    );

  // GSAP animation on cards
  useEffect(() => {
    if (loading) return;

    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 50, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
      }
    );
  }, [filteredModels, loading]);

  return (
    <section className="w-full min-h-screen p-8  text-white">
      <h2 className="text-4xl font-semibold text-center mb-10">
      
      </h2>

      {/* Search */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search AI models or use cases..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full max-w-md p-3 rounded-xl
                     border border-white/10 bg-black
                     backdrop-blur outline-none text-white"
        />
      </div>

      {/* Filter */}
      <div className="mb-10 flex justify-center">
        <select
          value={framework}
          onChange={e => setFramework(e.target.value)}
          className="p-3 w-full max-w-xs rounded-xl
                     bg-white/5 backdrop-blur
                     text-black border border-black/10"
        >
          {frameworks.map(fw => (
            <option key={fw} value={fw}>{fw}</option>
          ))}
        </select>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="min-h-[60vh] flex items-center justify-center">
          <AISpinner />
        </div>
      )}

      {/* DATA */}
      {!loading && (
        <>
          {filteredModels.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {filteredModels.map((expert, index) => (
                <Link
                  to={`/MODEL/${expert._id}`}
                  key={expert._id}
                  ref={el => (cardsRef.current[index] = el)}
                  className="group relative p-4 rounded-2xl
                             bg-white/5 backdrop-blur
                             border border-white/10
                             transition hover:scale-[1.04]"
                >
                  {/* Glow */}
                  <div className="absolute inset-0 rounded-2xl
                                  opacity-0 group-hover:opacity-100
                                  bg-indigo-500/10 blur-xl transition" />

                  <img
                    src={expert.image || "/default-model.png"}
                    alt={expert.name}
                    className="relative z-10 w-28 h-28 mx-auto
                               object-contain mb-4"
                  />

                  <h3 className="relative z-10 text-center
                                 text-indigo-400 font-semibold">
                    {expert.name}
                  </h3>

                  <p className="relative z-10 text-center
                                text-sm text-white/70 mt-1">
                    {expert.useCase}
                  </p>

                  <p className="relative z-10 text-center
                                text-xs text-white/40 mt-1">
                    {expert.framework}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            // 404
            <div className="h-[60vh] flex flex-col
                            items-center justify-center text-center">
              <h1 className="text-8xl font-bold text-indigo-400">404</h1>
              <p className="text-white/60 mt-4">
                No AI models found
              </p>
              <button
                onClick={() => navigate("/")}
                className="mt-8 px-6 py-3
                           rounded-full bg-white text-black
                           font-medium hover:scale-105 transition"
              >
                Go Back
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Model;
