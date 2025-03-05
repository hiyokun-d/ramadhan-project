import { motion } from "framer-motion";
import { useState } from "react";
import "./tasbihDigital.css";

export function TasbihDigital() {
  const [count, setCount] = useState(0);
  const [beads] = useState(Array(3).fill(null)); // 33 beads for tasbih

  const handleDrag = (info) => {
    if (info.point.y > 50) { // Threshold for counting
      if ("vibrate" in navigator) {
        navigator.vibrate(50);
      }
      setCount(prev => (prev % 33) + 1);
    }
  };

  return (
    <section className="containerTasbih">
      <div className="counter">{count}</div>

      <motion.div
        className="beads-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {beads.map((_, index) => (
          <motion.div
            key={index}
            className="bead"
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => handleDrag(info)}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="bead-inner" />
            {index % 11 === 0 && <div className="separator" />}
          </motion.div>
        ))}

        {/* Decorative string */}
        <motion.div
          className="string"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>

      <motion.button
        className="reset-button"
        onClick={() => setCount(0)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Reset
      </motion.button>
    </section>
  );
}
