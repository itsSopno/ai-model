
import React from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-9xl font-extrabold text-indigo-500 mb-6">404</h1>
      <p className="text-xl sm:text-2xl text-gray-300 mb-6 text-center">
        Oops! The page you are looking for does not exist.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-full text-white font-semibold transition"
      >
        Back to Home
      </button>
    </motion.div>
  );
};

export default NotFound;
