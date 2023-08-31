import { defaultLayoutWhiteBox } from './defaultLayoutWhiteBox'

export default async function handlePrintWhiteBox(whiteBox) {
    const storedPrinter = JSON.parse(localStorage.getItem('printer'));

    if (!whiteBox || whiteBox === undefined) {
        console.log('sleecione a caixa')
        return
    } else {
        const etiquetas = await gerarEtiquetasParaImpressao(whiteBox)
        Print(etiquetas)
    }
    async function gerarEtiquetasParaImpressao(whiteBox) {
        try {
            const chipBoxLayout = defaultLayoutWhiteBox
            let newEtiqueta = chipBoxLayout
                .split('@FURO')
                .join(whiteBox.furo)
                .split('@CAIXA')
                .join(whiteBox.cx.toString().padStart(3, '0'))
                .split('@DE')
                .join(whiteBox.de)
                .split('@ATE')
                .join(whiteBox.ate)
                .split('@QR')
                .join(whiteBox?.cx + ';' + whiteBox?.furo + ';' + whiteBox?.de + ';' + whiteBox?.ate);
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