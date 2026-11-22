import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const QUIZ_SIZE = 4;
const PASS_MARK = 3; // capped to the number of questions

const pick = (pool) =>
  [...pool].sort(() => Math.random() - 0.5).slice(0, QUIZ_SIZE);

export default function Quiz({ questions, onPass }) {
  const [round, setRound] = useState(0);
  const [fails, setFails] = useState(0);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [done, setDone] = useState(false);
  const [opening, setOpening] = useState(false);

  const set = useMemo(() => pick(questions), [questions, round]);
  const q = set[idx];
  const passMark = Math.min(PASS_MARK, set.length);
  const passed = score >= passMark;

  const answer = (i) => {
    if (chosen !== null) return;
    setChosen(i);
    if (i === q.answerIndex) setScore((s) => s + 1);
  };

  const next = () => {
    if (idx + 1 < set.length) {
      setIdx(idx + 1);
      setChosen(null);
    } else {
      setDone(true);
      if (score < passMark) setFails((f) => f + 1);
    }
  };

  const retry = () => {
    setRound((r) => r + 1);
    setIdx(0);
    setScore(0);
    setChosen(null);
    setDone(false);
  };

  const open = () => {
    setOpening(true);
    setTimeout(onPass, 1300);
  };

  return (
    <motion.div
      className="screen quiz"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* curtain: appears closed, then opens */}
      {opening && (
        <>
          <motion.div
            className="curtain left"
            initial={{ x: "-100%" }}
            animate={{ x: ["-100%", "0%", "0%", "-100%"] }}
            transition={{ duration: 1.4, times: [0, 0.35, 0.55, 1] }}
          />
          <motion.div
            className="curtain right"
            initial={{ x: "100%" }}
            animate={{ x: ["100%", "0%", "0%", "100%"] }}
            transition={{ duration: 1.4, times: [0, 0.35, 0.55, 1] }}
          />
        </>
      )}

      <div className="quiz-inner">
        
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key={`${round}-${idx}`}
              className="card quiz-card"
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -60, opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <p className="progress">
                {idx + 1} / {set.length}
              </p>
              <h2>{q.question}</h2>
              <div className="options">
                {q.options.map((opt, i) => {
                  const isAnswer = i === q.answerIndex;
                  const state =
                    chosen === null
                      ? ""
                      : isAnswer
                      ? "right"
                      : i === chosen
                      ? "wrong"
                      : "dim";
                  return (
                    <motion.button
                      key={i}
                      className={`option ${state}`}
                      onClick={() => answer(i)}
                      disabled={chosen !== null}
                      animate={
                        state === "right"
                          ? { scale: [1, 1.05, 1] }
                          : state === "wrong"
                          ? { x: [0, -8, 8, -6, 6, 0] }
                          : {}
                      }
                      transition={{ duration: 0.4 }}
                    >
                      {opt}
                    </motion.button>
                  );
                })}
              </div>
              {chosen !== null && (
                <motion.div
                  className="reaction"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p>
                    {chosen === q.answerIndex
                      ? q.reaction.right
                      : q.reaction.wrong}
                  </p>
                  <button className="btn" onClick={next}>
                    {idx + 1 < set.length ? "Next" : "See result"}
                  </button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              className="card quiz-card result"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <h2>
                {score} / {set.length}
              </h2>
              {passed ? (
                <>
                  <p>You're in! Let's see who's invited. 🎉</p>
                  <button className="btn" onClick={open} disabled={opening}>
                    Open the curtain
                  </button>
                </>
              ) : (
                <>
                  <p>So close! You need {passMark} right. Try again?</p>
                  {fails >= 2 && (
                    <p className="hint">
                      Hint: the answers are all on this invitation — date,
                      venue and time.
                    </p>
                  )}
                  <button className="btn" onClick={retry}>
                    Try again
                  </button>
                  {fails >= 2 && (
                    <button className="btn ghost" onClick={open}>
                      Skip
                    </button>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
