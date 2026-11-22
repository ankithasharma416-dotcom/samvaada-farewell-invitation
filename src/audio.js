// Sound for the whole site.
//  - public/song.mp3 starts on the first tap and loops for the whole site.
//  - The intro video is picture only. The Sound button mutes the song.
const audio = typeof Audio !== "undefined" ? new Audio(`${import.meta.env.BASE_URL}song.mp3`) : null;
if (audio) {
  audio.loop = true;
  audio.preload = "auto";
}

let muted = false;
let fadeTimer = null;
const listeners = new Set();

export const song = {
  audio,
  get muted() {
    return muted;
  },
  subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  setMuted(next) {
    muted = next;
    if (audio) audio.muted = next;
    listeners.forEach((fn) => fn(next));
  },
  // fades in and loops
  start() {
    if (!audio) return;
    audio.muted = muted;
    audio.volume = 0;
    audio.play().catch(() => {});
    clearInterval(fadeTimer);
    fadeTimer = setInterval(() => {
      audio.volume = Math.min(1, audio.volume + 0.1);
      if (audio.volume >= 1) clearInterval(fadeTimer);
    }, 60);
  },
};
