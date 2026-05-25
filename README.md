# Golden Eagles Tech LLC — Website

Professional company website for **Golden Eagles Tech LLC**, built with HTML5, CSS3, and vanilla JavaScript.

## Tech Stack

- **HTML5** — semantic, accessible markup
- **CSS3** — custom properties, grid, flexbox, animations (no frameworks)
- **JavaScript** (ES2020, no dependencies) — particle canvas, scroll reveal, Formspree form handling
- **Google Fonts** — Playfair Display + Inter
- **Formspree** — no-backend contact form delivery

## Project Structure

```
website/
├── index.html          # Main single-page site
├── styles.css          # All styles (color palette, components, responsive)
├── script.js           # Interactions: nav, particles, animations, form
├── assets/
│   ├── favicon.svg     # Eagle logo favicon
│   └── images/         # Product/about images (generate via IMAGE_PROMPTS.md)
├── IMAGE_PROMPTS.md    # Google Gemini prompts for all site images
└── README.md           # This file
```

## Setup & Configuration

### 1. Configure Contact Form (Formspree)

1. Go to [formspree.io](https://formspree.io) and create a free account.
2. Create a new form and copy the form ID (e.g., `xpwqabcd`).
3. In `index.html`, find this line:
   ```html
   <form ... action="https://formspree.io/f/YOUR_FORM_ID" ...>
   ```
4. Replace `YOUR_FORM_ID` with your actual Formspree form ID.
5. In your Formspree dashboard, set the notification email to `info@goldeneaglestech.com`.

### 2. Generate Images

See `IMAGE_PROMPTS.md` for detailed Google Gemini prompts. After generating, save images to:
- `assets/images/about.jpg`
- `assets/images/past-of-today.jpg`
- `assets/images/flux-datum.jpg`

The site currently uses CSS gradient/SVG placeholders and works well without real images.

### 3. Local Development

Open `index.html` directly in a browser, or use a local server:

```bash
# Python
python -m http.server 8080

# Node.js (npx)
npx serve .
```

## Deployment (Railway)

This site is deployed as a static site on Railway via Nginx.

- **Live URL:** https://website-production-69fd.up.railway.app
- **GitHub Repo:** https://github.com/Golden-Eagles-Tech/goldeneaglestech-website
- **Railway Project:** https://railway.com/project/7a2c8fce-636a-4e64-a310-61ca92be7032
- **Service type:** Static (Nixpacks + Nginx)

### Redeploy after changes

```bash
cd website/
railway up --service website --detach -m "describe your change"
```

Or connect the GitHub repo in the Railway dashboard for automatic deploys on every push to `main`.

## Color Palette

| Token         | Hex       | Usage                          |
|---------------|-----------|--------------------------------|
| `--navy`      | `#0D2137` | Darkest background, footer     |
| `--primary`   | `#1A3C6E` | Royal blue — primary brand     |
| `--primary-mid`| `#2E5FA3`| Mid blue — gradients           |
| `--gold`      | `#F5A623` | Amber gold — CTA, accents      |
| `--gold-dk`   | `#D4880C` | Darker gold — hover states     |

## Browser Support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge). IE not supported.

---

© 2024 Golden Eagles Tech LLC
