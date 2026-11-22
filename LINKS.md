# Personal invitation links

Add the query string to your deployed URL (replace `https://YOUR-SITE`). Each person sees
their own pass at the very end of the page (scroll down, or tap "Your personal pass").

| Person | Link |
|---|---|
| Thushara | https://YOUR-SITE/?name=Thushara |
| Pratik | https://YOUR-SITE/?name=Pratik |
| Yash | https://YOUR-SITE/?name=Yash&role=President |
| Mithun | https://YOUR-SITE/?name=Mithun |
| Sumanth | https://YOUR-SITE/?name=Sumanth |
| Meghraj | https://YOUR-SITE/?name=Meghraj |
| Prathvik | https://YOUR-SITE/?name=Prathvik |
| Vaibhav | https://YOUR-SITE/?name=Vaibhav |
| Mohith | https://YOUR-SITE/?name=Mohith |

## Parameters (all optional except name)

| Param | Alias | What it does |
|---|---|---|
| `name` | `to`, `n` | Name on the pass. If it matches an invitee, their childhood photo + pass number are used |
| `role` | `r` | Pill under the name, e.g. `role=Lead%20Editor` |
| `msg` | `m`, `note` | Custom message. Use `\|` for a new paragraph: `msg=Thanks%20for%20every%20cut\|See%20you%20there` |
| `from` | `s` | Sign-off, e.g. `from=Yash` |
| `photo` | `p` | Use invitee photo by number (1-9), e.g. `photo=3` |

Someone not in `src/data/invitees.js` (e.g. `?name=Aarav%20Shetty`) gets a monogram instead of a photo.
With no parameters the pass reads "Reserved for Our Seniors".

Event details live in `src/data/event.js`; default messages in `src/data/invitees.js`.
