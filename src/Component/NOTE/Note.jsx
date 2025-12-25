import React from 'react';
import { motion } from "motion/react";
import './Note.css' // your custom styles

const Note = () => {
  const notes = [
    "NOTE : Be careful before using AI model",
    "NOTE : Always check model details",
    "NOTE : Ratings and reviews are visible to everyone",
    "NOTE : Backup your data before using AI model",
  ];

  return (
    <div className="marquee-container">
      <motion.div
        className="marquee-track"
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {/* Duplicate notes for seamless scroll */}
        {notes.concat(notes).map((note, index) => (
          <span key={index} className="note">
            {note}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Note;
