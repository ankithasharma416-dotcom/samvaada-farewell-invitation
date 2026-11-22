// Order = carousel order. Card photos: public/photos/N.jpg, invitation photos: public/photos/invite-N.jpg
// Default message per person. Each person's personal link (?name=...) can override
// the role / message / sign-off, see src/lib/person.js and LINKS.md.
export const invitees = [
  "Thushara",
  "Pratik",
  "Yash",
  "Mithun",
  "Sumanth",
  "Meghraj",
  "Prathvik",
  "Vaibhav",
  "Mohith",
].map((name, i) => ({
  id: i + 1,
  name,
  photo: `photos/${i + 1}.jpg`, // carousel card
  invitePhoto: `photos/invite-${i + 1}.jpg`, // shown on the opened invitation (childhood pic)
  message: [
    `Dear ${name.split(" ")[0]},`,
    "Every frame you shot, every edit you stayed up for. Samvaada wouldn't be the same without you. Join us as we celebrate everything you've given this family.",
  ],
  signoff: "With love, Team Samvaada",
}));
