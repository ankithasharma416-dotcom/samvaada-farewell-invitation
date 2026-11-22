// TODO: replace with real Samvada questions. Pool > 4 → 4 are picked at random.
export const questions = [
  {
    id: 1,
    question: "Which club is this farewell for?",
    options: ["Samvada", "Sangeet", "Srujana", "Spandana"],
    answerIndex: 0,
    reaction: { right: "You know your club! 🎉", wrong: "Hmm, think again 😄" },
  },
  {
    id: 2,
    question: "On which date is the farewell?",
    options: ["26th November", "27th November", "28th November", "29th November"],
    answerIndex: 2,
    reaction: { right: "Date saved! 📅", wrong: "Not quite — check the date!" },
  },
  {
    id: 3,
    question: "Where will it be held?",
    options: ["Main Auditorium", "Shambhavi Hall", "Seminar Hall", "Open Lawn"],
    answerIndex: 1,
    reaction: { right: "Spot on! 📍", wrong: "Wrong hall 😅" },
  },
  {
    id: 4,
    question: "How long does the event run?",
    options: ["2 hours", "3 hours", "4 hours", "5 hours"],
    answerIndex: 2,
    reaction: { right: "Four hours of fun! ⏰", wrong: "A bit longer than that!" },
  },
  {
    id: 5,
    question: "What time does it start?",
    options: ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM"],
    answerIndex: 1,
    reaction: { right: "Early bird! 🐦", wrong: "Try again!" },
  },
  {
    id: 6,
    question: "How many people are we inviting?",
    options: ["5", "6", "7", "8"],
    answerIndex: 2,
    reaction: { right: "Lucky seven! ✨", wrong: "Count again!" },
  },
];
