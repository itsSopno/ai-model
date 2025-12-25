import React, { useContext, useRef, useEffect, useState } from "react";
import { AuthContext } from "../../Authcontext";
import { Link } from "react-router";
import { motion } from "framer-motion";

const HomeSections = () => {
  const { modelData } = useContext(AuthContext);
  const containerRef = useRef(null);
  const [scrollWidth, setScrollWidth] = useState(0);

  const recentModels = modelData?.length
    ? modelData
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6)
    : [];

  const cardVariant = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  const sectionVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    if (containerRef.current) {
      const totalScroll =
        containerRef.current.scrollWidth - containerRef.current.offsetWidth;
      setScrollWidth(totalScroll > 0 ? totalScroll : 0);
    }
  }, [recentModels]);

  return (
    <div className="w-full">

      {/* Featured AI Models */}
      <section className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Featured AI Models</h2>

        <motion.div
          className="overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <motion.div
            ref={containerRef}
            className="flex gap-6 cursor-grab"
            drag="x"
            dragConstraints={{ left: -scrollWidth, right: 0 }}
            whileTap={{ cursor: "grabbing" }}
          >
            {recentModels.map((model) => (
              <motion.div
                key={model._id}
                className="flex-shrink-0 w-64 md:w-72 lg:w-80 bg-gray-800 p-4 rounded-xl flex flex-col items-center hover:scale-105 transition-transform"
                variants={cardVariant}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.5 }}
              >
                <Link to={`/MODEL/${model._id}`} className="flex flex-col items-center">
                  <img
                    src={model.image || "/default-model.png"}
                    alt={model.name}
                    className="w-32 h-32 md:w-36 md:h-36 object-contain mb-2 rounded-lg"
                  />
                  <h3 className="text-indigo-400 font-semibold">{model.name}</h3>
                  <p className="text-gray-300 text-sm mt-1">{model.useCase}</p>
                  <p className="text-gray-400 text-xs mt-1">{model.framework}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* About AI Models */}
      <motion.section
        className="p-8 rounded-t-3xl mt-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={sectionVariant}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-4 text-center">About AI Models</h2>
        <p className="max-w-3xl mx-auto text-gray-300 text-center text-lg">
          Explore a variety of AI models designed for different purposes – from natural language
          processing to computer vision. Our platform provides up-to-date models with clear
          use cases and framework details so you can integrate AI seamlessly into your projects.
        </p>
      </motion.section>

      {/* Get Started */}
      <motion.section
        className="p-8 mt-12 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={sectionVariant}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <h2 className="text-3xl font-bold mb-6">Get Started</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-6">
          Ready to explore AI models or integrate them into your project? Click below to start
          browsing or create your own custom AI solutions.
        </p>
        <Link
          to="/MODEL"
          className="inline-block px-6 py-3 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition"
        >
          Explore Models
        </Link>
      </motion.section>
    </div>
  );
};

export default HomeSections;
