import { useEffect } from "react";
import { motion } from "framer-motion";
import Photo from "./Photo.jsx";
import { event } from "../data/event.js";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

export default function Invitation({ person, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className="overlay"
      initial={{ backgroundColor: "rgba(0,0,0,0)" }}
      animate={{ backgroundColor: "rgba(0,0,0,0.75)" }}
      exit={{ backgroundColor: "rgba(0,0,0,0)" }}
      onClick={onClose}
    >
      <motion.div
        className="card invitation"
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        role="dialog"
        aria-modal="true"
        aria-label={`Invitation for ${person.name}`}
        onClick={(e) => e.stopPropagation()}
      >
        <i className="sprockets l" aria-hidden="true" />
        <i className="sprockets r" aria-hidden="true" />
        <button className="close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <Photo
          src={person.invitePhoto || person.photo}
          name={person.name}
          className="photo-lg"
        />
        <p className="frame-no">Frame {String(person.id).padStart(2, "0")}</p>
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={item} className="eyebrow">
            You are invited to
          </motion.p>
          <motion.h2 variants={item}>{event.title}</motion.h2>
          <motion.p variants={item} className="tagline">{event.tagline}</motion.p>
          <motion.div variants={item} className="message">
            {person.message.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </motion.div>
          <motion.dl variants={item} className="details">
            <div>
              <dt>Event</dt>
              <dd>{event.title}</dd>
            </div>
            <div>
              <dt>Date</dt>
              <dd>{event.date}</dd>
            </div>
            <div>
              <dt>Time</dt>
              <dd>{event.time}</dd>
            </div>
            <div>
              <dt>Venue</dt>
              <dd>{event.venue}</dd>
            </div>
          </motion.dl>
          <motion.p variants={item} className="signoff">
            {person.signoff}
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
