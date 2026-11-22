import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import Intro from "./components/Intro.jsx";
import Quiz from "./components/Quiz.jsx";
import Carousel from "./components/Carousel.jsx";
import Invitation from "./components/Invitation.jsx";
import Logo from "./components/Logo.jsx";
import { invitees } from "./data/invitees.js";
import { questions } from "./data/questions.js";

const readPassed = () => {
  try {
    return sessionStorage.getItem("samvada-passed") === "1";
  } catch {
    return false;
  }
};

export default function App() {
  const [stage, setStage] = useState(readPassed() ? "home" : "intro");
  const [selected, setSelected] = useState(null);

  const pass = () => {
    try {
      sessionStorage.setItem("samvada-passed", "1");
    } catch {}
    setStage("home");
  };

  return (
    <LayoutGroup>
      <AnimatePresence mode="wait">
        {stage === "intro" && (
          <Intro key="intro" onDone={() => setStage("quiz")} />
        )}
        {stage === "quiz" && (
          <Quiz key="quiz" questions={questions} onPass={pass} />
        )}
        {stage === "home" && (
          <motion.main
            key="home"
            className="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Logo small />
            <h1 className="home-title">You're invited</h1>
            <p className="home-sub">Tap your card to open your invitation</p>
            <Carousel items={invitees} onSelect={setSelected} />
          </motion.main>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selected && (
          <Invitation
            key={selected.id}
            person={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}
