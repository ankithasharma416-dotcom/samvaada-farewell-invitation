// TODO: replace names/messages. Put photos in public/photos/1.jpg … 7.jpg
export const invitees = [
  "Invitee One",
  "Invitee Two",
  "Invitee Three",
  "Invitee Four",
  "Invitee Five",
  "Invitee Six",
  "Invitee Seven",
].map((name, i) => ({
  id: i + 1,
  name,
  photo: `photos/${i + 1}.jpg`,
  message: [
    `Dear ${name.split(" ")[0]},`,
    "Samvada wouldn't be the same without you. Join us as we celebrate everything you've given this family.",
  ],
  signoff: "With love, Team Samvada",
}));
