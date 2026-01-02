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
    <section className="py-20 px-6 min-h-screen  text-white">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-indigo-500 font-black tracking-[0.4em] uppercase text-[10px] mb-4">
          Personal Repository
        </h2>
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter">
          CREATED BY <span className="text-white/20 font-light italic text-4xl md:text-5xl">YOU</span>
        </h1>
        <div className="h-[1px] w-24 bg-indigo-600 mt-6" />
      </div>

      <div className="max-w-7xl mx-auto">
        {userModels.length === 0 ? (
          <div className="py-20 border border-dashed border-white/5 rounded-3xl text-center bg-white/[0.01]">
            <p className="text-gray-500 font-bold tracking-widest uppercase text-xs">
              No published records found in your database.
            </p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {userModels.map((expert) => (
              <motion.div
                key={expert._id || expert.id}
                variants={cardVariants}
                className="group relative bg-[#0a0a0f] border border-white/5 rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all duration-500"
              >
                {/* Image Section (Modern Rectangular Look) */}
                <div className="aspect-video w-full overflow-hidden bg-[#11111a] relative">
                  <img
                    src={expert.image || "/default-model.png"}
                    alt={expert.name}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4 bg-indigo-600 px-3 py-1 rounded-full shadow-lg">
                    <span className="text-[9px] font-black uppercase tracking-tighter italic">Origin: User</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <h3 className="text-xl font-bold tracking-tight text-white mb-2 uppercase group-hover:text-indigo-400 transition-colors">
                    {expert.name}
                  </h3>
                  
                  <p className="text-[10px] font-black text-indigo-500/60 uppercase tracking-widest mb-4">
                    {expert.useCase || "General Purpose"}
                  </p>

                  <p className="text-sm text-gray-500 mb-8 line-clamp-2 leading-relaxed">
                    {expert.description || "System overview pending for this specific AI asset."}
                  </p>

                  {/* Actions (Icon-less but Pro) */}
                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                    <Link
                      to={`/MODEL/${expert._id}`}
                      className="flex items-center justify-center py-3 rounded-xl bg-white text-black text-[10px] font-black tracking-[0.2em] uppercase hover:bg-indigo-500 hover:text-white transition-all duration-300"
                    >
                      View Detail
                    </Link>
                    <Link
                      to={`/edit/${expert._id}`}
                      className="flex items-center justify-center py-3 rounded-xl bg-white/5 border border-white/10 text-white text-[10px] font-black tracking-[0.2em] uppercase hover:bg-green-600/20 hover:text-green-400 hover:border-green-500/30 transition-all duration-300"
                    >
                      Modify
                    </Link>
                  </div>
                </div>

                {/* Animated Background Glow */}
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-600/10 blur-[80px] group-hover:bg-indigo-600/20 transition-all" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Model2nd;