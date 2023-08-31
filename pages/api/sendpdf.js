import fs from 'fs';
import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import 'firebase/storage';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

dotenv.config();
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = '-707399392';
const bot = new Telegraf(BOT_TOKEN);

// Fazer o upload do arquivo PDF para o Firebase Storage
async function uploadPdfToStorage(pdfFilePath, arquivo,  furo, data, processos) {
 
    const storage = getStorage();
    const storageRef = ref(storage, `pdfs/${arquivo}.pdf`); // Caminho no Storage
    const fileBlob = fs.readFileSync(pdfFilePath);
    
    try {
        const snapshot = await uploadBytes(storageRef, fileBlob);
        const downloadToken = snapshot.metadata.downloadTokens;
        const fileDownloadUrl = `https://firebasestorage.googleapis.com/v0/b/hsbrsampledata-dev.appspot.com/o/pdfs%2F${arquivo}.pdf?alt=media&token=${downloadToken}`;

        await sendFileLink(fileDownloadUrl, arquivo, furo, data, processos);
    } catch (error) {
        console.error('Erro ao enviar o arquivo para o Firebase Storage:', error);
    }
}

// Enviar link do arquivo pelo bot do Telegram
async function sendFileLink(fileUrl, arquivo, furo, data, processos) {
    try {
        await bot.telegram.sendMessage(CHAT_ID, `Link para download do relatório sobre o furo ${furo}, gerado em ${data}, que inclui dados de ${processos}:`);
        await bot.telegram.sendMessage(CHAT_ID, fileUrl);
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
    }
}

export default async function handler(req, res) {
    
    const {arquivo} = req.body
    const {furo} = req.body
    const {data} = req.body
    const {processos} = req.body

    const pdfFilePath = `C:\\Users\\Hasar\\Downloads\\${arquivo}.pdf`; 

    try {
        
        await uploadPdfToStorage(pdfFilePath, arquivo, furo, data, processos);
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}
