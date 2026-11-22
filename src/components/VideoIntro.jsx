import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Plays public/intro.mp4 as picture only; the site song (public/song.mp3) is the sound.
// If the file is missing/unplayable, it skips to the next stage.
export default function VideoIntro({ onDone }) {
  const ref = useRef(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
    // safety net: if the video never starts, move on
    const t = setTimeout(() => {
      if (v.readyState < 2) onDone();
    }, 8000);
    return () => clearTimeout(t);
  }, [onDone]);

  const replay = () => {
    const v = ref.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  };

  return (
    <motion.div
      className="screen video-intro"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <video
        ref={ref}
        className="intro-video"
        src={`${import.meta.env.BASE_URL}intro.mp4`}
        muted
        playsInline
        preload="auto"
        onEnded={onDone}
        onError={onDone}
      />
      <div className="video-controls">
        <button onClick={replay}>Replay</button>
        <button onClick={onDone}>Skip</button>
      </div>
    </motion.div>
  );
}
