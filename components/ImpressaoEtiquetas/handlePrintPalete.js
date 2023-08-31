import { defaultLayoutPalete } from './defaultLayoutPalete'

export default async function handlePrintPalete(palete) {
    const storedPrinter = JSON.parse(localStorage.getItem('printer'));

    if (!palete || palete === undefined) {
        console.log('sleecione a caixa')
        return
    } else {
        const etiquetas = await gerarEtiquetasParaImpressao(palete)
        Print(etiquetas)
    }
    async function gerarEtiquetasParaImpressao(palete) {
        try {
            const chipBoxLayout = defaultLayoutPalete
            let newEtiqueta = chipBoxLayout
                .split('@FURO')
                .join(palete.furo)
                .split('@PALETE')
                .join(palete.numero.toString().padStart(3, '0'))
                .split('@DE')
                .join(palete.de)
                .split('@ATE')
                .join(palete.ate)
                .split('@QR')
                .join(palete?.qrcode);
            return newEtiqueta;
        } catch (error) {
            console.log(error)
        }
    }

    const Print = async (content) => {
        try {
            const response = await fetch('/api/imprimir', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ zpl: content, config: storedPrinter }),
            });
            if (response.ok) {
                setMessage('ZPL enviado com sucesso para impressão.');
            } else {
                setMessage('Erro ao enviar ZPL para impressão.');
            }
        } catch (error) {
            console.log('Erro ao enviar a requisição.');
        }
    };
}