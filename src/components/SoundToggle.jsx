import { useEffect, useState } from "react";
import { song } from "../audio.js";

// Persistent sound on/off button. Mutes the video's audio and the song together.
export default function SoundToggle() {
  const [muted, setMuted] = useState(song.muted);

  useEffect(() => song.subscribe(setMuted), []);

  return (
    <button
      className="sound-toggle"
      onClick={() => song.setMuted(!muted)}
      aria-label={muted ? "Turn sound on" : "Turn sound off"}
    >
      <span className={`bars ${muted ? "off" : ""}`} aria-hidden="true">
        <i /><i /><i /><i />
      </span>
      <span>{muted ? "Sound off" : "Sound on"}</span>
    </button>
  );
}
