import { motion } from "framer-motion";

// First screen. The tap is what lets the browser play sound.
export default function Gate({ onEnter }) {
  return (
    <motion.button
      className="screen gate"
      onClick={onEnter}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <span className="gate-ring" aria-hidden="true" />
      <span className="gate-label">Chalo shuru ho jaye</span>
      <span className="gate-hint">Sound on rakhna</span>
    </motion.button>
  );
}
