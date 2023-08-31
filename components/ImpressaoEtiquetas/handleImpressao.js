import { defaultLayout } from "./defaultLayout";
import { defaultLayoutAmostra } from './defaultLayoutBag'

export default async function handlePrint(paramsPrint, furoSelecionado, chipBoxes, selectedTipoImpressao) {
    const storedPrinter = JSON.parse(localStorage.getItem('printer'));

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
    if (paramsPrint.inicio == undefined || paramsPrint.fim == undefined) {
        console.log('digite inicio e fim')
        return
    } else {
        const caixasNoIntervalo = chipBoxes.filter(caixa => paramsPrint.inicio <= caixa.cx && caixa.cx <= paramsPrint.fim);
        const etiquetas = await gerarEtiquetasParaImpressao(caixasNoIntervalo, paramsPrint, selectedTipoImpressao)
        Print(etiquetas)
    }
    async function gerarEtiquetasParaImpressao(caixas, params, selectedTipoImpressao) {
        try {
            const chipBoxLayout = selectedTipoImpressao=='Caixa (Chip_Box)' ? defaultLayout : defaultLayoutAmostra;
            let etiquetasZpl = '';
            caixas.forEach(cx => {
                let newEtiqueta = chipBoxLayout
                    .split('@PROJETO')
                    .join(cx.furo.split('-').shift())
                    .split('@FURO')
                    .join(cx.furo)
                    .split('@CX')
                    .join(cx.cx.toString().padStart(3, '0'))
                    .split('@DE')
                    .join(cx.de.toFixed(2).padStart(6, '0').replace('.', ','))
                    .split('@ATE')
                    .join(cx.ate.toFixed(2).padStart(6, '0').replace('.', ','))
                    .split('@QR')
                    .join(cx.qrcode);
                // Adiciona a etiqueta para impressão apenas no intervalo de caixa definido para impressão
                //console.log(typeof(params.inicio));
                if (cx.cx >= params.inicio && cx.cx <= params.fim) {
                    etiquetasZpl += newEtiqueta + '\n';

                    // Duplica a etiqueta
                    if (params.imprimeduplo) {
                        etiquetasZpl += newEtiqueta + '\n';
                    }
                }
            });
            console.log(etiquetasZpl);
            return etiquetasZpl;
        } catch (error) {
            console.log(error)
        }
    }
}