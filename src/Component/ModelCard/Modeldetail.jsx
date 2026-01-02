import React, { useEffect, useRef, useContext, useState } from 'react';
import gsap from 'gsap';
import { useParams, Link } from 'react-router';
import { AuthContext } from '../../Authcontext';
import { toast } from "react-toastify";

const ModelDetail = () => {
  const { id } = useParams();
  const { modelData, user, setModelData } = useContext(AuthContext);
  const [model, setModel] = useState(null);

  const containerRef = useRef(null);
  const imgBoxRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const foundModel = modelData.find((m) => m._id === id);
    setModel(foundModel);
  }, [id, modelData]);

  useEffect(() => {
    if (!model) return;

    const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.2 } });

    tl.fromTo(containerRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1 })
      .fromTo(imgBoxRef.current, { x: -50, opacity: 0 }, { x: 0, opacity: 1 }, "-=0.8")
      .fromTo(contentRef.current.children, { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1 }, "-=1")
      .fromTo(".stat-card", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.1 }, "-=0.8");

  }, [model]);

  // Handlers (keep your logic as is)
  const handlePurchase = async () => { 
      if (!user) return toast.error("You need to login to purchase.");


    const buyerInfo = {

      buyerEmail: user.email,

      buyerName: user.displayName || user.name,

      modelId: model._id,

      modelName: model.name,

      image: model.image,

      price: model.purchased || "Free",

    };


    try {

      const res = await fetch("https://server-3-smoky.vercel.app/buyerdata", {

        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(buyerInfo),

      });

      const data = await res.json();

      if (data.success) {

        toast.success("Purchase successful!");

      } else {

        toast.error(data.message || "Purchase failed!");

      }

    } catch (err) {

      console.error(err);

      toast.error("Something went wrong while saving buyer data!");

    } 
   };
  const handleDelete = async (id) => { /* logic stays same */ };

  if (!model) return <div className="h-screen flex items-center justify-center text-white">Loading Intelligence...</div>;

  return (
    <div className="min-h-screen  text-white py-24 px-6 md:px-12 flex items-center">
      {/* Dynamic Background Glow */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full" />
      </div>

      <div ref={containerRef} className="max-w-7xl mx-auto w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Image Showcase (4 cols) */}
          <div ref={imgBoxRef} className="lg:col-span-5 sticky top-24">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-[#0a0c14] border border-white/10 rounded-[2.5rem] p-4 overflow-hidden shadow-2xl">
                <img 
                  src={model.image} 
                  alt={model.name} 
                  className="w-full aspect-square object-contain rounded-3xl group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            
            {/* Quick Pricing Card below image */}
            <div className="mt-6 p-6 bg-white/[0.03] border border-white/5 backdrop-blur-md rounded-3xl flex justify-between items-center">
               <div>
                  <p className="text-gray-400 text-xs uppercase tracking-widest">Pricing Model</p>
                  <p className="text-2xl font-black text-cyan-400">{model.purchased || "Contact for Price"}</p>
               </div>
               <div className="h-10 w-px bg-white/10"></div>
               <div className="text-right">
                  <p className="text-gray-400 text-xs uppercase tracking-widest">Status</p>
                  <p className="text-green-400 font-bold">Verified Model</p>
               </div>
            </div>
          </div>

          {/* Right: Content & Info (7 cols) */}
          <div ref={contentRef} className="lg:col-span-7 space-y-8">
            <div>
              <Link to="/MODEL" className="text-indigo-400 text-sm font-bold hover:text-indigo-300 flex items-center gap-2 mb-4 group">
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Exploration
              </Link>
              <h1 className="text-5xl md:text-7xl text-indigo-400 tracking-tighter mb-4 leading-none">
                {model.name}
              </h1>
              <p className="text-xl text-indigo-400 font-medium tracking-wide">
                Built with {model.framework}
              </p>
            </div>

            <div className="space-y-4">
               <h3 className="text-white/40 uppercase text-xs font-bold tracking-[0.2em]">Summary</h3>
               <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
                 {model.useCase}. {model.description}
               </p>
            </div>

            {/* Grid Stats */}
            <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: "Author", val: model.createdBy },
                { label: "Dataset", val: model.dataset || "Confidential" },
                { label: "Released", val: new Date(model.createdAt).toLocaleDateString() },
              ].map((s, i) => (
                <div key={i} className="stat-card p-4 bg-[#0f111a] border border-white/5 rounded-2xl">
                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">{s.label}</p>
                  <p className="text-white font-medium truncate">{s.val}</p>
                </div>
              ))}
            </div>

            {/* Actions Bar */}
            <div className="pt-8 border-t border-white/5 flex flex-wrap gap-4 items-center">
              {user ? (
                <button
                  onClick={handlePurchase}
                  className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all hover:-translate-y-1 active:scale-95"
                >
                  DEPOY & PURCHASE
                </button>
              ) : (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm font-bold">
                  ⚠️ Authentication Required for Access
                </div>
              )}

              {user && user.email === model.createdBy && (
                <button
                  onClick={() => handleDelete(model._id)}
                  className="px-6 py-4 border border-red-500/30 text-red-500 hover:bg-red-500/10 font-bold rounded-2xl transition-all"
                >
                  Terminate Asset
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetail;