import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PrivacyTerms = () => {
  const [activeTab, setActiveTab] = useState("privacy");

  return (
    <section className="w-full min-h-screen bg-[#f4f4e8] text-black pt-32 pb-20 border-t border-black/10">
      
      {/* 1. HEADER: Industrial Blueprint Style */}
      <div className="px-6 md:px-12 mb-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[#d0ff00] font-mono text-xs font-bold uppercase tracking-[0.4em]">
            [ Protocol — 09 ]
          </span>
          <div className="h-[1px] w-12 bg-[#d0ff00]/30" />
        </div>
        
        <h1 className="text-3xl md:text-[90px] font-black tracking-tighter uppercase leading-[0.85] mb-12">
          Legal <br />
          <span className="text-[#d0ff00] italic font-light humane-font">Infrastructure.</span>
        </h1>

        {/* TAB CONTROLS: Sharp & Minimalist */}
        <div className="flex gap-12 border-b border-white/10">
          {["privacy", "terms"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-6 text-[11px] font-black uppercase tracking-[0.3em] transition-all relative ${
                activeTab === tab ? "text-[#d0ff00]" : "text-gray-600 hover:text-white"
              }`}
            >
              {tab === "privacy" ? "Privacy Policy" : "Terms of Service"}
              {activeTab === tab && (
                <motion.div 
                  layoutId="legalUnderline" 
                  className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#d0ff00]" 
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 2. MAIN CONTENT GRID */}
      <div className="px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-white/10">
        
        {/* SIDEBAR: Metadata Table */}
        <div className="lg:col-span-3 border-r border-black/50 pb-12 lg:pb-0 lg:pr-12">
          <div className="sticky top-40 space-y-12">
            <div className="space-y-4 font-mono uppercase text-[10px]">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-500">Last Revision</span>
                <span className="text-white">Jan 02, 2026</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-500">Authority</span>
                <span className="text-white">Global Ops</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-500">Status</span>
                <span className="text-[#d0ff00]">Active</span>
              </div>
            </div>

            <div className="p-6 border border-white/10 bg-white/[0.02] relative">
               <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-relaxed italic">
                These frameworks protect the neural sovereignty of all AssetVerse network participants.
               </p>
               <div className="absolute top-0 right-0 w-2 h-2 bg-[#d0ff00]" />
            </div>
          </div>
        </div>

        {/* CONTENT AREA: Large Typography & Spacing */}
        <div className="lg:col-span-9 lg:pl-20 py-12 lg:py-0 min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="max-w-3xl"
            >
              {activeTab === "privacy" ? (
                <div className="space-y-20 pb-20">
                  <section>
                    <h3 className="text-[10px] font-black text-[#d0ff00] uppercase tracking-[0.5em] mb-8 italic">
                      // Section 01
                    </h3>
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8">Data Collection</h2>
                    <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed uppercase tracking-tight">
                      At AssetVerse, we collect <span className="text-white">Neural Pattern Metadata</span> and user configuration logs. 
                      This ensures your digital intellectual property remains within your exclusive control.
                    </p>
                  </section>
                  <section>
                    <h3 className="text-[10px] font-black text-[#d0ff00] uppercase tracking-[0.5em] mb-8 italic">
                      // Section 02
                    </h3>
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8">Security Protocols</h2>
                    <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed uppercase tracking-tight">
                      All vault assets are protected by <span className="text-white">AES-256 Industrial Encryption</span>. 
                      Access restricted via OAuth2.0 protocols.
                    </p>
                  </section>
                </div>
              ) : (
                <div className="space-y-20 pb-20">
                  <section>
                    <h3 className="text-[10px] font-black text-[#d0ff00] uppercase tracking-[0.5em] mb-8 italic">
                      // Section 01
                    </h3>
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8">Usage Rights</h2>
                    <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed uppercase tracking-tight">
                      Publishing a model grants a non-exclusive license. 
                      Buyers receive <span className="text-white">Perpetual Commercial Rights</span> unless specified otherwise by the creator.
                    </p>
                  </section>
                  <section>
                    <h3 className="text-[10px] font-black text-[#d0ff00] uppercase tracking-[0.5em] mb-8 italic">
                      // Section 02
                    </h3>
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8">Liability</h2>
                    <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed uppercase tracking-tight">
                      AssetVerse provides neural assets <span className="text-white">"As-Is"</span>. 
                      We are not liable for model hallucinations or logic inaccuracies.
                    </p>
                  </section>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* 3. DOCUMENT FOOTER */}
      <div className="w-full py-12 px-6 md:px-12 flex justify-between items-center opacity-30 font-mono text-[8px] uppercase tracking-[0.5em]">
        <span>End of Transmission</span>
        <span>Ref ID: AV-LEGAL-2026</span>
      </div>
    </section>
  );
};

export default PrivacyTerms;