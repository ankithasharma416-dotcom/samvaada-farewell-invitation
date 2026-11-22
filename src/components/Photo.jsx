import { useState } from "react";
import { motion } from "framer-motion";

// Image with initials fallback. Pass layoutId for shared-element morphing.
export default function Photo({ src, name, layoutId, className = "" }) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
  return (
    <motion.div layoutId={layoutId} className={`photo ${className}`}>
      {failed ? (
        <span className="photo-fallback" aria-label={name}>
          {initials}
        </span>
      ) : (
        <img
          src={`${import.meta.env.BASE_URL}${src}`}
          alt={name}
          loading="lazy"
          draggable={false}
          onError={() => setFailed(true)}
        />
      )}
    </motion.div>
  );
}
