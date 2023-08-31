import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';

export default async function Telegram(req, res) {
  const { message } = req.body;
  dotenv.config();
  console.log(req.body);

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = '-707399392';

  const bot = new Telegraf(BOT_TOKEN);

  try {
    await bot.telegram.sendMessage(CHAT_ID, message);
    res.status(200).json({ success: true });
  } catch (error) {
    //console.error('Erro ao enviar mensagem:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
