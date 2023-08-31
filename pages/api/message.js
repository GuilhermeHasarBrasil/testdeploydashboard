import { Telegraf } from "telegraf";

export default async function message(req, res){
    const {message} = req.body;
    const BOT_TOKEN = '6008836708:AAG-3x_Vr1QpuqW58rtgZxQ_qDEHwxFl2NM'
    const CHAT_ID = '-707399392';

    const bot = new Telegraf(BOT_TOKEN)

    try {
        await bot.telegram.sendMessage(CHAT_ID, message)
        res.status(200).send({status:'foi'})
    } catch (error) {
        res.status(500).send({status:'error', erro: error})
    }
}