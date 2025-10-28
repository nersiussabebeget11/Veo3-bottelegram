import fetch from 'node-fetch';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const body = req.body;
        const chatId = body.message?.chat?.id;
        const text = body.message?.text;

        let reply = 'Hello! I am your Veo3 bot 🤖';

        if (text === '/start') {
            reply = 'Welcome to Veo3 Telegram Bot!';
        }

        if (chatId) {
            await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: chatId, text: reply })
            });
        }

        res.status(200).send('OK');
    } else {
        res.status(200).send('Veo3 Bot is running!');
    }
}