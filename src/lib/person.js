// Reads the personalised-invitation URL parameters.
//
//   ?name=Yash                      -> uses Yash's photo + default message
//   ?name=Aarav&role=Lead%20Editor  -> a name that isn't in invitees.js
//   &msg=Line one|Line two          -> custom message ("|" starts a new paragraph)
//   &from=Team%20Samvaada           -> custom sign-off
//   &photo=3                        -> pick an invitee photo by number
//
// Short aliases: to / n (name), r (role), m / note (msg), s (from).
// Everything is stripped of control chars and length-capped; React escapes the rest.

const clean = (s, max) =>
  (s || "").replace(/[\u0000-\u001f\u007f<>]/g, "").replace(/\s+/g, " ").trim().slice(0, max);

const first = (p, keys) => {
  for (const k of keys) {
    const v = p.get(k);
    if (v) return v;
  }
  return "";
};

export const DEFAULT_ROLE = "4th Year · Media Crew";

export function readParams(search = typeof window !== "undefined" ? window.location.search : "") {
  const p = new URLSearchParams(search);
  return {
    name: clean(first(p, ["name", "to", "n"]), 40),
    role: clean(first(p, ["role", "r"]), 48),
    msg: first(p, ["msg", "note", "m"])
      .split("|")
      .map((l) => clean(l, 240))
      .filter(Boolean)
      .slice(0, 3),
    from: clean(first(p, ["from", "s"]), 48),
    photo: clean(first(p, ["photo", "p"]), 12),
  };
}

// Merge URL params with the invitee list into what the final pass renders.
export function resolvePerson(params, invitees) {
  const key = params.name.toLowerCase();
  const byName = key
    ? invitees.find((i) => i.name.toLowerCase() === key || i.name.toLowerCase().split(" ")[0] === key)
    : null;
  const byPhoto = params.photo ? invitees.find((i) => String(i.id) === params.photo) : null;
  const base = byName || null;
  const photoFrom = byPhoto || byName;

  const name = base?.name || params.name || "";
  const hasName = Boolean(name);
  const firstName = name.split(" ")[0];

  const defaultMsg = hasName
    ? [
        `Dear ${firstName},`,
        "Every frame you shot, every edit you stayed up for. Samvaada wouldn't be the same without you. Come, let's make one last memory together.",
      ]
    : [
        "Every frame you shot, every edit you stayed up for. Samvaada wouldn't be the same without you. Come, let's make one last memory together.",
      ];

  return {
    hasName,
    name: name || "Our Seniors",
    role: params.role || DEFAULT_ROLE,
    message: params.msg.length ? params.msg : defaultMsg,
    signoff: params.from || "With love, Team Samvaada",
    photo: photoFrom?.invitePhoto || null,
    passNo: base?.id || byPhoto?.id || hash(name || "seniors") % 90 + 10,
    matched: Boolean(base),
  };
}

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export const barHash = hash;
