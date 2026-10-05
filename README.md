# ⚡ Forex 7 sTarZ | 24/7 Financial Trading & Signal Ecosystem

![Status](https://img.shields.io/badge/Status-Active-emerald?style=for-the-badge)
![Ecosystem](https://img.shields.io/badge/Trading-Multi--Asset-cyan?style=for-the-badge)
![Hosting](https://img.shields.io/badge/Deployed--on-Vercel-black?style=for-the-badge&logo=vercel)

Official repository of **Forex 7 sTarZ**: a fast, responsive web hub for technical analysis, live trading signals, VIP membership and managed-account onboarding.

---

## 🌟 Key Features

- **Live Signals Hub:** Gold (XAU/USD), Forex Majors, Crypto and Deriv Synthetic Indices.
- **Premium VIP Page:** Plan selection (Monthly, Quarterly, Half-Yearly, Yearly), crypto payment methods (USDT TRC20, Binance Pay ID, BTC, BNB BEP20, ETH ERC20) with QR codes, and payment proof submission.
- **Account Management Form:** Onboarding for managed trading accounts (broker, platform, server, account size, risk preference).
- **Instant Telegram Alerts:** Every VIP payment and account-management application is sent to the admin's Telegram chat through serverless API routes.
- **Blog & Education:** English articles plus a full Spanish section (`/forex-en-espanol`) with signals, calculator, economic calendar and education pages.
- **Modern UI:** Tailwind CSS, glassmorphism design, Three.js background effects, fully mobile-optimized with a slide-out navigation drawer.
- **SEO Ready:** `sitemap.xml`, `robots.txt`, Open Graph image, web manifest and favicon set.

---

## 📝 Forms

| Page | API Route | Fields |
| :--- | :--- | :--- |
| `premium.html` | `/api/premium` | Full name, WhatsApp number, **Telegram username**, transaction ID / TxHash, optional message, plus selected plan, amount and payment method |
| `account-management.html` | `/api/telegram` | Full name, WhatsApp number, **Telegram username**, broker name, trading platform, broker server, **account password**, account size, risk preference, optional message |

> ⚠️ **Security note:** The account-management form sends the password to your private Telegram chat in plain text. Ask clients for the **investor (read-only) password** instead of the master password, and keep the Telegram chat private.

---

## 🗂️ Project Structure

```
fx7star/
├── index.html                  # Home page
├── premium.html                # VIP plans + payment form
├── account-management.html     # Managed account application form
├── blog.html                   # Blog index
├── blog/                       # English blog articles
├── forex-en-espanol/           # Spanish section (signals, calculator, calendar, blog)
├── api/
│   ├── premium.js              # VIP payment -> Telegram notification
│   └── telegram.js             # Account management -> Telegram notification
├── assets/                     # Logo, favicons, icons, OG image
├── privacy.html  terms.html  disclaimer.html
├── sitemap.xml  robots.txt  site.webmanifest
└── ads.txt  app-ads.txt
```

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, Vanilla JavaScript (ES6+)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (CDN) with a custom neon / glass design
- **Icons:** [Font Awesome 6](https://fontawesome.com/)
- **3D Visuals:** [Three.js](https://threejs.org/)
- **Fonts:** Plus Jakarta Sans (Google Fonts)
- **Backend:** Vercel Serverless Functions (Node.js) + Telegram Bot API
- **Hosting:** [Vercel](https://vercel.com/)

---

## ⚙️ Environment Variables

Set these in **Vercel → Project → Settings → Environment Variables**:

| Variable | Description |
| :--- | :--- |
| `TELEGRAM_BOT_TOKEN` | Bot token from [@BotFather](https://t.me/BotFather) |
| `TELEGRAM_CHAT_ID` | Chat / channel / group ID that receives the applications |

The bot must be added to the target chat (as admin for channels), otherwise Telegram will reject the message. Redeploy after changing environment variables.

---

## 🚀 Run Locally

```bash
# 1. Clone
git clone https://github.com/YOUR-USERNAME/fx7star.git
cd fx7star

# 2. Install Vercel CLI (needed to run the /api routes locally)
npm i -g vercel

# 3. Add environment variables
echo "TELEGRAM_BOT_TOKEN=your_token" >> .env
echo "TELEGRAM_CHAT_ID=your_chat_id" >> .env

# 4. Start
vercel dev
```

Open `http://localhost:3000`. For static pages only, any local server also works (for example `npx serve .`), but the forms need `vercel dev` to reach `/api`.

---

## ☁️ Deploy

1. Push the repository to GitHub.
2. Import it in [Vercel](https://vercel.com/new).
3. Add the environment variables above.
4. Deploy. Every push to the main branch redeploys automatically.

---

## 🌐 Related Platforms

| Platform | Category | URL |
| :--- | :--- | :--- |
| **Live Signals 29** | Primary Terminal | [livesignals29.online](http://livesignals29.online) |
| **Live Signal App** | Web Mirror / Signal Feed | [live-signal29.vercel.app](https://live-signal29.vercel.app/) |
| **Crypto Income** | Yield Hub & ROI Models | [cryptoincome.vercel.app](https://cryptoincome.vercel.app) |
| **Flasherr App** | Deriv Synthetic Execution | [flasherr.vercel.app](https://flasherr.vercel.app/) |

---

## ⚠️ Disclaimer

Trading involves substantial risk and past performance does not guarantee future results. Signals and analysis are for educational purposes only and are not financial advice. Only trade with capital you can afford to lose.

---

© Forex 7 sTarZ. All rights reserved.
