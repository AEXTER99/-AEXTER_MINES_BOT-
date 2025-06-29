# AEXTER MINES BOT — Stake Mines Predictor with AI & Firebase

This is your personal AI-powered Telegram bot to predict Stake Mines safe tiles using AI learning and HMAC verification.

---

## 🚀 Deploy to Render (1-Click)

Click below to deploy your bot instantly to Render (free cloud hosting):

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/YOUR_USERNAME/telegram-ai-mines-bot)

---

## 🧠 Features

- `/predict <server> <client> <nonce> <mines>` — AI-suggested safe tiles
- `/verify <server> <client> <nonce> <mines> <A1,B2,...>` — Check prediction
- Memory-based AI that learns over time
- Firebase sync-ready
- Works 24/7 on Render or any Node host

---

## ⚙️ Environment Setup

In Render or `.env` file:

```env
BOT_TOKEN=7893093820:AAGoqWgKL0Bqv7WiWw-uXSw-4Zcx3GYlisY
CHAT_ID=7016617673
```

✅ These are pre-filled in your `.env` file.

---

## 📦 Local Setup

```bash
git clone https://github.com/YOUR_USERNAME/telegram-ai-mines-bot.git
cd telegram-ai-mines-bot
npm install
npm start
```

---

## 🔧 Firebase Setup (Optional for AI memory)

In `lib/firebase.js`, replace the config with your real Firebase credentials.

---

## 🤖 Bot Username

This is configured for your bot:

[@AEXTER_MINES_BOT](https://t.me/AEXTER_MINES_BOT)

---

## 🧪 Example Commands

```text
/predict abc123 xyz456 1 3
/verify abc123 xyz456 1 3 A1,B2,C3
```

---

## 🛠 Need Help?

Message in Telegram or send updates via GitHub pull requests.