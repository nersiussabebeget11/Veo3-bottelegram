// api/index.js
import 'dotenv/config';
import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Pilih aspek rasio:\n📱 9:16 (Vertikal)\n💻 16:9 (Horizontal)');
});

bot.on('message', async (msg) => {
  if (msg.text.toLowerCase().includes('video')) {
    bot.sendMessage(msg.chat.id, '🎬 Membuat video, tunggu sebentar...');
    try {
      const response = await axios.post(
        `${process.env.VEO_API_URL}?key=${process.env.VEO_API_KEY}`,
        {
          contents: [{ parts: [{ text: msg.text }] }]
        }
      );

      bot.sendMessage(msg.chat.id, '✅ Video berhasil dibuat!');
      console.log(response.data);
    } catch (error) {
      console.error(error);
      bot.sendMessage(msg.chat.id, '❌ Terjadi kesalahan saat membuat video.');
    }
  }
});
