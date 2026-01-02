import React, { useContext } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../Authcontext';
import { motion } from 'framer-motion';

const Model2nd = () => {
  const { user, modelData } = useContext(AuthContext);

  if (!user?.email) {
    return (
      <section className="w-full min-h-screen flex items-center justify-center bg-[#050508] text-white">
        <h2 className="text-xl font-black tracking-[0.2em] uppercase opacity-50">
          Authorization Required
        </h2>
      </section>
    );
  }

  const userModels = modelData.filter(
    (item) => item.createdBy && item.createdBy === user.email
  );

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
   <section className="w-full min-h-screen  text-white">
  {/* --- FULL WIDTH HEADER --- */}
  <div className="w-full border-b border-white/5 px-6 md:px-10 py-16 lg:py-24">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <h2 className="text-indigo-500 font-black tracking-[0.4em] uppercase text-[10px] mb-4">
          Personal Repository
        </h2>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8]">
          CREATED BY <br />
          <span className="text-[#d0ff00] font-light italic text-4xl md:text-7xl opacity-90">
            YOU
          </span>
        </h1>
      </div>
      
      {/* Dynamic Count Badge */}
      <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl backdrop-blur-xl">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">
          Total Assets: <span className="text-white ml-2">{userModels.length}</span>
        </p>
      </div>
    </div>
  </div>

  {/* --- FULL WIDTH CONTENT GRID --- */}
  <div className="w-full px-6 md:px-10 py-12">
    {userModels.length === 0 ? (
      <div className="w-full py-32 border border-dashed border-white/5 rounded-[3rem] text-center bg-white/[0.01]">
        <h1 className="text-6xl font-black text-white/5 mb-4 uppercase">Void</h1>
        <p className="text-gray-600 font-bold tracking-[0.3em] uppercase text-[10px]">
          No published records found in your database.
        </p>
      </div>
    ) : (
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 md:gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {userModels.map((expert) => (
          <motion.div
            key={expert._id || expert.id}
            variants={cardVariants}
            className="group relative bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-indigo-500/30 transition-all duration-500 shadow-2xl flex flex-col h-full"
          >
            {/* Visual Header */}
            <div className="aspect-video w-full overflow-hidden bg-[#11111a] relative">
              <img
                src={expert.image || "/default-model.png"}
                alt={expert.name}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
              
              <div className="absolute top-6 left-6 flex gap-2">
                <div className="bg-indigo-600 px-4 py-1.5 rounded-full shadow-2xl">
                  <span className="text-[8px] font-black uppercase tracking-tighter italic text-white">
                    Origin: Master
                  </span>
                </div>
              </div>
            </div>

            {/* Core Info */}
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-2xl font-black tracking-tight text-white mb-2 uppercase group-hover:text-indigo-400 transition-colors">
                {expert.name}
              </h3>
              
              <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-4">
                {expert.framework} // {expert.useCase || "Neural Asset"}
              </p>

              <p className="text-sm text-gray-500 mb-8 line-clamp-3 leading-relaxed font-medium italic">
                {expert.description || "System overview pending for this specific AI asset. No metadata provided."}
              </p>

              {/* Action Grid */}
              <div className="grid grid-cols-2 gap-3 mt-auto pt-6 border-t border-white/5">
                <Link
                  to={`/MODEL/${expert._id}`}
                  className="flex items-center justify-center py-4 rounded-2xl bg-white text-black text-[9px] font-black tracking-[0.2em] uppercase hover:bg-indigo-500 hover:text-white transition-all duration-500"
                >
                  View Detail
                </Link>
                <Link
                  to={`/edit/${expert._id}`}
                  className="flex items-center justify-center py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-[9px] font-black tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-500"
                >
                  Modify
                </Link>
              </div>
            </div>

            {/* Subtle Glow */}
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500/5 blur-[100px] group-hover:bg-indigo-500/10 transition-all duration-700" />
          </motion.div>
        ))}
      </motion.div>
    )}
  </div>
</section>
  );
};

export default Model2nd;