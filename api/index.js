// api/index.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
    try {
        // Pastikan request method POST (Telegram webhook)
        if (req.method === 'POST') {
            const body = req.body;
            const chatId = body.message?.chat?.id;
            const text = body.message?.text?.toLowerCase();

            let reply = 'Hello! I am your Veo3 bot 🤖';

            // Respon perintah /start
            if (text === '/start') {
                reply = 'Welcome to Veo3 Telegram Bot! 🎬\n\nYou can now generate videos easily!';
            }

            // Contoh perintah /help
            else if (text === '/help') {
                reply = 'Commands available:\n/start - Start bot\n/help - Show this message';
            }

            // Contoh balasan default
            else if (text) {
                reply = `You said: "${text}"\nI am Veo3 bot, ready to help!`;
            }

            // Kirim balasan ke Telegram
            if (chatId) {
                await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ chat_id: chatId, text: reply })
                });
            }

            return res.status(200).send('OK');
        } 
        else {
            // Jika bukan POST, bot alive check
            res.status(200).send('Veo3 Bot is running!');
        }
    } catch (error) {
        console.error('Error in handler:', error);
        res.status(500).send('Internal Server Error');
    }
}
