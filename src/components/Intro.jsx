import { useEffect } from "react";
import { motion } from "framer-motion";
import DecryptedText from "./DecryptedText.jsx";

const EASE = [0.22, 1, 0.36, 1];

export default function Intro({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 6400);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="screen intro"
      exit={{ opacity: 0, scale: 1.08, filter: "blur(14px)" }}
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

      {/* logo: hairline draws, then the mark unveils with a wipe + de-blur + light sweep */}
      <div className="intro-logo-wrap">
        <motion.span
          className="intro-rule"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.9, ease: EASE }}
        />
        <motion.img
          className="intro-logo"
          src={`${import.meta.env.BASE_URL}samvada-logo.png`}
          alt="Samvaada"
          initial={{ clipPath: "inset(0 100% 0 0)", filter: "blur(14px)", opacity: 0, y: 14 }}
          animate={{ clipPath: "inset(0 0% 0 0)", filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 1.4, ease: EASE }}
        />
        <motion.span
          className="intro-sheen"
          initial={{ x: "-120%", opacity: 0 }}
          animate={{ x: "120%", opacity: [0, 1, 0] }}
          transition={{ delay: 3.4, duration: 1.1, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
