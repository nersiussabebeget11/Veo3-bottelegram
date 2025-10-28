# Veo3 Telegram Bot

## Setup

1. Fork / download repo.
2. Set environment variable `TELEGRAM_TOKEN`.
3. Deploy ke Vercel atau server lain.

## Webhook

```
curl -F "url=https://<your-vercel-url>/api/index.js" https://api.telegram.org/bot<TELEGRAM_TOKEN>/setWebhook
```