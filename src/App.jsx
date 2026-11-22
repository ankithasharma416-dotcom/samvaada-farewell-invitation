import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import Gate from "./components/Gate.jsx";
import SoundToggle from "./components/SoundToggle.jsx";
import { song } from "./audio.js";
import VideoIntro from "./components/VideoIntro.jsx";
import Intro from "./components/Intro.jsx";
import Quiz from "./components/Quiz.jsx";
import Carousel from "./components/Carousel.jsx";
import Invitation from "./components/Invitation.jsx";
import FinalInvite from "./components/FinalInvite.jsx";
import Logo from "./components/Logo.jsx";
import Background from "./components/Background.jsx";
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
  const [stage, setStage] = useState("gate");
  const [selected, setSelected] = useState(null);

  // the first tap lets the browser play sound: the song starts here and
  // keeps going through the video, intro, quiz and carousel
  const enter = () => {
    song.start();
    setStage(readPassed() ? "home" : "video");
  };

  // back from the carousel: replay the video, then the welcome, straight back
  // to the carousel (the quiz isn't asked twice)
  const back = () => {
    setSelected(null);
    setStage("video");
  };

  const pass = () => {
    try {
      sessionStorage.setItem("samvada-passed", "1");
    } catch {}
    setStage("home");
  };

  return (
    <LayoutGroup>
      {stage === "home" && <Background />}
      <AnimatePresence mode="wait">
        {stage === "gate" && <Gate key="gate" onEnter={enter} />}
        {stage === "video" && (
          <VideoIntro key="video" onDone={() => setStage("intro")} />
        )}
        {stage === "intro" && (
          <Intro key="intro" onDone={() => setStage(readPassed() ? "home" : "quiz")} />
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
            <button className="back-btn" onClick={back}>← Back</button>
            <Logo small />
            <p className="eyebrow home-eyebrow">Samvaada · The Media Club</p>
            <h1 className="home-title">You're invited</h1>
            <p className="home-sub">Our 4th-year crew is signing off. Tap your frame to open your invitation.</p>
            <div className="viewfinder">
              <i className="vf tl" /><i className="vf tr" /><i className="vf bl" /><i className="vf br" />
              <span className="rec"><i />REC</span>
              <Carousel items={invitees} onSelect={setSelected} />
            </div>
            <a className="scroll-cue" href="#pass" onClick={(e) => { e.preventDefault(); document.getElementById("pass")?.scrollIntoView({ behavior: "smooth" }); }}>
              <span>Your personal pass</span>
              <i aria-hidden="true" />
            </a>
            <FinalInvite />
          </motion.main>
        )}
      </AnimatePresence>

      {stage !== "gate" && <SoundToggle />}

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
