import React, { useContext } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { AuthContext } from "../../Authcontext";

const Footer = () => {
  const { user, theme } = useContext(AuthContext);

  // Framer motion variants
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      transition={{ duration: 0.8 }}
      className={`w-full px-6 md:px-16 py-10 mt-16 rounded-t-3xl
        ${theme === "dark" ? "bg-black text-[#92afcf]" : "bg-white text-[#11190C]"}`}
    >
      {/* Top links */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-6">
        <nav className="flex gap-6 flex-wrap text-sm md:text-base">
          <Link to="/" className="hover:text-indigo-400 transition">Home</Link>
          <Link to="/MODEL" className="hover:text-indigo-400 transition">Models</Link>
          {user ? (
            <>
              <Link to="/Profile" className="hover:text-indigo-400 transition">Profile</Link>
              <Link to="/Publish" className="hover:text-indigo-400 transition">Publish AI</Link>
            </>
          ) : (
            <Link to="/login" className="hover:text-indigo-400 transition">Login</Link>
          )}
        </nav>

        {/* Theme toggle */}
        <button
          className={`px-4 py-2 rounded-full border transition
            ${theme === "dark"
              ? "border-[#92afcf] text-white hover:bg-[#92afcf] hover:text-black"
              : "border-[#11190C] text-[#11190C] hover:bg-[#11190C] hover:text-white"
            }`}
        >
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Social icons */}
      <div className="flex justify-center gap-6 mb-6">
        <motion.a
          href="#"
          whileHover={{ scale: 1.2 }}
          aria-label="Twitter"
          className="transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor">
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
          </svg>
        </motion.a>
        <motion.a
          href="#"
          whileHover={{ scale: 1.2 }}
          aria-label="YouTube"
          className="transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
          </svg>
        </motion.a>
        <motion.a
          href="#"
          whileHover={{ scale: 1.2 }}
          aria-label="Facebook"
          className="transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor">
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
          </svg>
        </motion.a>
      </div>

      {/* Copyright */}
      <motion.div
        className="text-center text-sm text-white/60"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <p>© {new Date().getFullYear()} - MADE BY MISTI ALUUU</p>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
