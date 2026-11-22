import { useMemo } from "react";
import { motion } from "framer-motion";
import Photo from "./Photo.jsx";
import { event } from "../data/event.js";
import { invitees } from "../data/invitees.js";
import { readParams, resolvePerson, barHash } from "../lib/person.js";

// The personalised pass at the very end of the page. Everything on it comes
// from the URL (?name=Yash&role=...&msg=...&from=...), see src/lib/person.js.
const BARS = 34;

function addToCalendar(who) {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Samvaada//Farewell//EN",
    "BEGIN:VEVENT",
    `UID:samvaada-farewell-${who}@samvaada`,
    `DTSTAMP:${event.startUTC}`,
    `DTSTART:${event.startUTC}`,
    `DTEND:${event.endUTC}`,
    `SUMMARY:${event.title}`,
    `LOCATION:${event.venue}`,
    `DESCRIPTION:${event.tagline}. ${event.time}.`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "samvaada-farewell.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function FinalInvite() {
  const p = useMemo(() => resolvePerson(readParams(), invitees), []);

  // decorative barcode, unique per name
  const bars = useMemo(() => {
    let h = barHash(p.name) || 7;
    return Array.from({ length: BARS }, () => {
      h = (h * 1103515245 + 12345) >>> 0;
      return 1 + ((h >> 16) % 3);
    });
  }, [p.name]);

  const pass = String(p.passNo).padStart(2, "0");

  return (
    <section className="pass-section" id="pass">
      <p className="eyebrow pass-eyebrow">{p.hasName ? "Your personal invitation" : "Final frame"}</p>

      <motion.article
        className="pass"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <i className="vf tl" /><i className="vf tr" /><i className="vf bl" /><i className="vf br" />

        <header className="pass-top">
          <span className="rec"><i />REC</span>
          <span className="pass-top-mid">Farewell · 4th year</span>
          <span className="mono">No. {pass}</span>
        </header>

        <div className="pass-body">
          {p.photo ? (
            <Photo src={p.photo} name={p.name} className="pass-photo" />
          ) : (
            <Photo src="missing" name={p.name === "Our Seniors" ? "S" : p.name} className="pass-photo" forceFallback />
          )}

          <p className="pass-for">Reserved for</p>
          <h2 className="pass-name">{p.name}</h2>
          <p className="pass-role">{p.role}</p>

          <div className="pass-msg">
            {p.message.map((l, i) => (
              <p key={i}>{l}</p>
            ))}
          </div>
        </div>

        <dl className="exif">
          <div><dt>Date</dt><dd>{event.date}</dd></div>
          <div><dt>Call time</dt><dd>8:30 AM</dd></div>
          <div className="wide"><dt>Venue</dt><dd>{event.venue}</dd></div>
          <div className="wide"><dt>Note</dt><dd>Gather with the other invitees</dd></div>
        </dl>

        <div className="pass-stub">
          <div className="barcode" aria-hidden="true">
            {bars.map((w, i) => (
              <i key={i} style={{ width: w * 2 }} />
            ))}
          </div>
          <p className="stub-text">Admit one · That's a wrap</p>
        </div>

        <p className="signoff">{p.signoff}</p>
      </motion.article>

      <button className="btn pass-cal" onClick={() => addToCalendar(p.name.replace(/\W+/g, "-").toLowerCase())}>
        Add to calendar
      </button>
      <p className="pass-foot">{event.club}</p>
    </section>
  );
}
