import { useEffect } from "react";
import { motion } from "framer-motion";
import DecryptedText from "./DecryptedText.jsx";
import Logo from "./Logo.jsx";

export default function Intro({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 4600);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="screen intro"
      exit={{ opacity: 0, scale: 1.1, filter: "blur(14px)" }}
      transition={{ duration: 0.6 }}
      onClick={onDone}
    >
      <h1 className="intro-text">
        <DecryptedText
          text="Welcome to Samvaada!"
          animateOn="view"
          effect="scramble"
          sequential
          revealDirection="start"
          speed={70}
          scrambleColor="#52525b"
          characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%&*"
        />
      </h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.8 }}
      >
        <Logo />
      </motion.div>
    </motion.div>
  );
}
