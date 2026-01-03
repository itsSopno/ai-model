import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./privacy.css"
const PrivacyTerms = () => {
  const [activeTab, setActiveTab] = useState("privacy");

  return (
    <section className="teams w-full min-h-screen  text-white">
      {/* HEADER SECTION */}
      <div className="w-full border-b border-white/5 px-6 md:px-10 py-20 bg-gradient-to-b from-indigo-500/5 to-transparent">
        <h2 className="text-indigo-500 font-black tracking-[0.4em] uppercase text-[10px] mb-4">
          Legal Infrastructure
        </h2>
        <h1 className="text-5xl md:text-8xl text-[#8116e0] tracking-tighter uppercase mb-10">
          Legal <span className="text-[#d0ff00] italic font-light">Nexus</span>
        </h1>

        {/* TAB CONTROLS */}
        <div className="flex gap-8 border-b border-white/5">
          <button
            onClick={() => setActiveTab("privacy")}
            className={`pb-4 text-[10px] text-[#d0ff00] tracking-[0.2em] uppercase transition-all relative ${
              activeTab === "privacy" ? "text-[#8116e0]" : "text-gray-600 hover:text-gray-400"
            }`}
          >
            Privacy Policy
            {activeTab === "privacy" && (
              <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-[2px] bg-indigo-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("terms")}
            className={`pb-4 text-[10px] text-[#8116e0] tracking-[0.2em] uppercase transition-all relative ${
              activeTab === "terms" ? "text-[#d0ff00]" : "text-gray-600 hover:text-gray-400"
            }`}
          >
            Terms of Service
            {activeTab === "terms" && (
              <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-[2px] bg-indigo-500" />
            )}
          </button>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="w-full px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Sidebar Info (Hidden on mobile) */}
          <div className="hidden lg:block lg:col-span-3 space-y-8">
            <div className="p-6 border border-white/5 rounded-2xl bg-white/[0.02]">
              <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest mb-4">Last Updated</p>
              <p className="text-sm text-gray-400 font-bold">January 02, 2026</p>
            </div>
            <div className="p-6 border border-white/5 rounded-2xl bg-white/[0.02]">
              <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest mb-4">Compliance</p>
              <p className="text-xs text-gray-500 leading-relaxed italic">
                Our terms are designed to protect both the creators and consumers within the AssetVerse AI ecosystem.
              </p>
            </div>
          </div>

          {/* Main Content Scroll */}
        <div className=" lg:col-span-9 max-w-4xl">

            <AnimatePresence mode="wait">
              {activeTab === "privacy" ? (
                <motion.div
                  key="privacy"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                 style={{ fontFamily: "'Asimovian', sans-serif", fontWeight: "400", fontStyle: "normal" }}
                  className="space-y-12"
                >
                  <section className="">
                    <h3 className="text-2xl text-[#d0ff00] uppercase tracking-tight mb-6">01. Data Collection</h3>
                    <p className=" text-[#8116e0] leading-loose">
                      At AssetVerse, we collect neural pattern metadata and user configuration logs to enhance your AI training experience. 
                      This includes your encrypted email identity and model technical specifications. We do not sell your personal training data to third-party entities.
                    </p>
                  </section>
                  <section>
                    <h3 className="text-2xl text-[#d0ff00] uppercase tracking-tight mb-6">02. Security Protocols</h3>
                    <p className="text-[#8116e0] leading-loose">
                      All assets stored in our vault are protected by AES-256 encryption. Access to your purchased models is restricted via 
                      OAuth2.0 protocols, ensuring that your digital intellectual property remains within your control.
                    </p>
                  </section>
                </motion.div>
              ) : (
                <motion.div
                  key="terms"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-12"
                >
                  <section>
                    <h3 className="text-2xl text-[#8116e0]  uppercase tracking-tight mb-6">01. Usage Rights</h3>
                    <p className="text-[#d0ff00] leading-loose">
                      By publishing a model on AssetVerse, you grant us a non-exclusive license to host and distribute your AI asset. 
                      Buyers receive a perpetual license to use the model for both commercial and personal projects unless specified otherwise.
                    </p>
                  </section>
                  <section>
                    <h3 className="text-2xl text-[#8116e0] uppercase tracking-tight mb-6">02. Liability Limitation</h3>
                    <p className="text-[#d0ff00] leading-loose">
                      AssetVerse provides a marketplace for AI models "as is". We are not responsible for the accuracy, outputs, or 
                      hallucinations produced by models hosted on our platform. Users use these neural assets at their own risk.
                    </p>
                  </section>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
      
      {/* FOOTER CALL TO ACTION */}
      <div className="w-full border-t border-white/5 p-10 text-center">
        <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.5em]">
          End of Document — AssetVerse AI Framework
        </p>
      </div>
    </section>
  );
};

export default PrivacyTerms;