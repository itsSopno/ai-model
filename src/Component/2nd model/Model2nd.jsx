import React, { useContext } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../Authcontext';
import { motion } from 'framer-motion';

const Model2nd = () => {
  const { user, modelData, theme } = useContext(AuthContext);

  if (!user?.email) {
    return (
      <section className="w-full min-h-screen flex items-center justify-center px-4  text-white">
        <h2 className="text-2xl md:text-3xl font-semibold">
          Please login to view your models.
        </h2>
      </section>
    );
  }

  const userModels = modelData.filter(
    (item) => item.createdBy && item.createdBy === user.email
  );

  // Framer-motion container variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
    hover: { scale: 1.05, y: -5, transition: { duration: 0.3 } },
  };

  return (
    <section className={`py-16 px-6 min-h-screen ${theme === 'dark' ? '' : ''}`}>
      <h2 className={`text-center text-4xl md:text-5xl font-bold mb-12 ${theme === 'dark' ? 'text-[#92afcf]' : 'text-gray-800'}`}>
        CREATED BY YOU
      </h2>

      {userModels.length === 0 ? (
        <p className={`text-center text-gray-400 text-lg`}>
          You haven’t published any models yet.
        </p>
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
              whileHover="hover"
              className={`relative rounded-3xl overflow-hidden shadow-xl
                ${theme === 'dark' ? 'bg-[#1a1f29]' : 'bg-white'}
              `}
            >
              <div className="p-6 flex flex-col items-center text-center">
                <div className="w-36 h-36 rounded-full overflow-hidden mb-4 border-4 border-[#92afcf]">
                  <img
                    src={expert.image || "/default-model.png"}
                    alt={expert.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-[#92afcf]' : 'text-gray-900'}`}>
                  {expert.name}
                </h3>

                <p className={`text-sm italic mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {expert.useCase}
                </p>

                <p className={`text-center text-gray-500 mb-5 line-clamp-3`}>
                  {expert.description || "No description provided."}
                </p>

                <div className="flex gap-3 flex-wrap justify-center">
                  <Link
                    to={`/MODEL/${expert._id}`}
                    className={`px-5 py-2 rounded-lg font-semibold transition-colors duration-300
                      ${theme === 'dark' ? 'bg-[#92afcf] text-black hover:bg-[#7fa5cc]' : 'bg-indigo-500 text-white hover:bg-indigo-600'}
                    `}
                  >
                    View Details →
                  </Link>
                  <Link
                    to={`/edit/${expert._id}`}
                    className={`px-5 py-2 rounded-lg font-semibold transition-colors duration-300
                      ${theme === 'dark' ? 'bg-green-500 text-black hover:bg-green-600' : 'bg-green-500 text-white hover:bg-green-600'}
                    `}
                  >
                    Edit Data
                  </Link>
                </div>
              </div>

              {/* Glow hover effect */}
              <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none bg-gradient-to-r from-green-400 via-lime-300 to-cyan-400 blur-2xl opacity-0"
                whileHover={{ opacity: 0.2 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default Model2nd;
