import TableFuros from "./tableFuros"
import { useState } from "react";
import styled from 'styled-components'
import Dropdown from 'react-dropdown-select';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'; // localização
dayjs.locale('pt-br'); //localização
import { imageB64 } from "./image";

export default function Relatorios({ furos, chipBoxes, furoSelecionado, filtroConferencia, filtroMarcacao, filtroFotografia, filtroDensidade, filtroSerragem, filtroArquivamento, chipBoxesInternos, setFuroSelecionado, authUser }) {
    function sett(selected, index, selectedInicio, selectedFim, quantidadeCaixas) {
        const inicio = dayjs.unix(selectedInicio?.seconds);
        const fim = dayjs.unix(selectedFim?.seconds);
        const diffInSeconds = fim.diff(inicio, 'second'); // Diferença em segundos
        const hours = Math.floor(diffInSeconds / 3600);
        const minutes = Math.floor((diffInSeconds % 3600) / 60);
        const seconds = diffInSeconds % 60;
        const formattedDate = dayjs.unix(selectedInicio.seconds).format('DD/MM/YYYY HH:mm:ss');

        setFuroSelecionado({
            furo: selected,
            index: index,
            tempoProcessamento: selectedInicio && selectedFim ? hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0') : 'Furo não finalizado',
            quantidadeCaixas: quantidadeCaixas,
            importadoEm: formattedDate
        })
    }

    function secondsToHMS(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
    
        return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    function generatePDF(data) {
        const sortedChipBoxes = chipBoxesInternos[furoSelecionado?.index].slice().sort((a, b) => a.cx - b.cx);
        const doc = new jsPDF();
        const formattedDate = dayjs().format('DD/MMM/YYYY') + ', ' + dayjs().format('HH:mm:ss ');
        const data1 = [
            ['Usuário', 'Furo', 'Tempo em processamento', 'Caixas'],
            [authUser.email, furoSelecionado.furo, furoSelecionado.tempoProcessamento, furoSelecionado.quantidadeCaixas],
        ];
        const img = imageB64
        //primeira pagina do pdf: capa
        doc.addImage(img, 'jpg', 60, 10)
        doc.setFont('helvetica', 'normal', 'bold')

        doc.text(`Relatório de processamento do furo`, 64, 80)
        doc.text(`${furoSelecionado.furo}`, 94, 87)

        doc.text(`Paraupebas, ${formattedDate}`, 65, 135)
        if(selectedProcesses.length > 3) {
            doc.text(`Processos incluídos: ${selectedProcesses.slice(0,3).join(', ')},`, 38, 145)
            doc.text(`${selectedProcesses.slice(3,6).join(', ')}`, 38, 155)
            doc.text(`${selectedProcesses.slice(6,9).join(', ')}`, 38, 165)
            doc.text(`${selectedProcesses.slice(9,12).join(', ')}`, 38, 175)

        }else{
            doc.text(`Processos incluídos: ${selectedProcesses.join(', ')}`, 38, 145)
        }
        doc.text(`Relatório exportado por ${authUser.email}`, 10, 260)
        // segunda pagina do pdf
        doc.addPage(1, 'p')
        doc.text('Dados gerais do furo:', 10, 10)
        doc.autoTable({
            head: [data1[0]],
            body: data1.slice(1),
        });
        doc.text(`Furo importado no sistema em: ${furoSelecionado.importadoEm}h`, 15, 40)
        
        if (selectedProcesses.includes('Conferência')) {
            doc.addPage();
            doc.text('Tabela de Conferência:', 10, 9);
    
            const tableData = [
                ['Usuário', 'Furo', 'Tempo em processamento', 'Caixa'],
            ];
    
            sortedChipBoxes.forEach(caixa => {
                const conferenciaProcess = caixa.processos.conferencia;
                const startTimestamp = conferenciaProcess.ent ? conferenciaProcess.ent.seconds : 0;
                const endTimestamp = conferenciaProcess.sai ? conferenciaProcess.sai.seconds : 0;
    
                const timeInSeconds = endTimestamp - startTimestamp;
                const formattedTime = secondsToHMS(timeInSeconds);
    
                const user = conferenciaProcess.user || '-';
    
                tableData.push([user, caixa.furo, formattedTime, caixa.cx]);
            });
    
            doc.autoTable({
                head: [tableData[0]],
                body: tableData.slice(1),
            });
        }
        if (selectedProcesses.includes('Marcação')) {
            doc.addPage();
            doc.text('Tabela de Marcação:', 10, 9);
    
            const tableData = [
                ['Usuário', 'Furo', 'Tempo em processamento', 'Caixa'],
            ];
    
            sortedChipBoxes.forEach(caixa => {
                const conferenciaProcess = caixa.processos.marcacao;
                const startTimestamp = conferenciaProcess.ent ? conferenciaProcess.ent.seconds : 0;
                const endTimestamp = conferenciaProcess.sai ? conferenciaProcess.sai.seconds : 0;
    
                const timeInSeconds = endTimestamp - startTimestamp;
                const formattedTime = secondsToHMS(timeInSeconds);
    
                const user = conferenciaProcess.user || '-';
    
                tableData.push([user, caixa.furo, formattedTime, caixa.cx]);
            });
    
            doc.autoTable({
                head: [tableData[0]],
                body: tableData.slice(1),
            });
        }
        if (selectedProcesses.includes('Fotografia')) {
            doc.addPage();
            doc.text('Tabela de Fotografia:', 10, 9);
    
            const tableData = [
                ['Usuário', 'Furo', 'Tempo em processamento', 'Caixa'],
            ];
    
            sortedChipBoxes.forEach(caixa => {
                const conferenciaProcess = caixa.processos.fotografia;
                const startTimestamp = conferenciaProcess.ent ? conferenciaProcess.ent.seconds : 0;
                const endTimestamp = conferenciaProcess.sai ? conferenciaProcess.sai.seconds : 0;
    
                const timeInSeconds = endTimestamp - startTimestamp;
                const formattedTime = secondsToHMS(timeInSeconds);
    
                const user = conferenciaProcess.user || '-';
    
                tableData.push([user, caixa.furo, formattedTime, caixa.cx]);
            });
    
            doc.autoTable({
                head: [tableData[0]],
                body: tableData.slice(1),
            });
        }
        //add outros processos que são por furo
        if (selectedProcesses.includes('Arquivamento')) {
            doc.addPage();
            doc.text('Tabela de Arquivamento:', 10, 9);
    
            const tableData = [
                ['Usuário', 'Furo', 'Tempo em processamento', 'Caixa'],
            ];
    
            sortedChipBoxes.forEach(caixa => {
                const conferenciaProcess = caixa.processos.arquivamento;
                const startTimestamp = conferenciaProcess.ent ? conferenciaProcess.ent.seconds : 0;
                const endTimestamp = conferenciaProcess.sai ? conferenciaProcess.sai.seconds : 0;
    
                const timeInSeconds = endTimestamp - startTimestamp;
                const formattedTime = secondsToHMS(timeInSeconds);
    
                const user = conferenciaProcess.user || '-';
    
                tableData.push([user, caixa.furo, formattedTime, caixa.cx]);
            });
    
            doc.autoTable({
                head: [tableData[0]],
                body: tableData.slice(1),
            });
        }

        const dataNow = new Date()
        const dia = String(dataNow.getDate()).padStart(2, '0');
        const mes = String(dataNow.getMonth() + 1).padStart(2, '0');
        const ano = dataNow.getFullYear();
        const hora = String(dataNow.getHours()).padStart(2, '0');
        const minuto = String(dataNow.getMinutes()).padStart(2, '0');
        const NomeArquivo = `-DIA${dia}-${mes}-${ano}--HORA${hora}-${minuto}`;

        doc.save(`${furoSelecionado.furo + '-' + NomeArquivo}.pdf`);
        setTimeout(() => {
            sendPdfToApi(NomeArquivo, formattedDate, selectedProcesses.join(', '));
        }, 5000);
    }

    async function sendPdfToApi(NomeArquivo, formattedDate, processos) {

        const arquivo = furoSelecionado.furo + '-' + NomeArquivo
        const data = formattedDate
        const furo = furoSelecionado.furo

        try {
            const response = await fetch('/api/sendpdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ arquivo, furo, data, processos }),
            });

            if (response.ok) {
                console.log('Arquivo enviado com sucesso');
            }
        } catch (error) {
            console.error('Erro na solicitação:', error);
        }
    }

    const [selectedProcesses, setSelectedProcesses] = useState([]);
    const processos = [
        { 'processo': 'Conferência' },
        { 'processo': 'Marcação' },
        { 'processo': 'Fotografia' },
        { 'processo': 'Densidade' },
        { 'processo': 'Serragem' },
        { 'processo': 'Despacho' },
        { 'processo': 'Arquivamento' },

    ]

    function toggleProcess(processo) {
        if (selectedProcesses.includes(processo)) {
            setSelectedProcesses(selectedProcesses.filter(selected => selected !== processo));
        } else {
            setSelectedProcesses([...selectedProcesses, processo]);
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
            <TableFuros furos={furos} />
            <Dropdown
                style={{ width: 577, marginTop: '4%', marginLeft: '2%', borderRadius: 10 }}
                options={furos.map((option, index) => ({ value: option.numero, label: option.numero, index: index, inicio: option.createdAt, fim: option.dataFinalizado, quantidadeCaixas: option.profundidade }))}
                onChange={(values) => {
                    if (values.length > 0) {
                        const selectedValue = values[0].value;
                        const selectedIndex = values[0].index;
                        const selectedInicio = values[0].inicio;
                        const selectedFim = values[0].fim
                        const selectedQtdCx = values[0].quantidadeCaixas
                        sett(selectedValue, selectedIndex, selectedInicio, selectedFim, selectedQtdCx);
                    }
                }}
                placeholder="Selecione um furo"
                multi={false}
            />

            <ul style={{ display: 'flex', flexDirection: 'row', marginTop: '2%' }}>
                {processos.map((furo, index) => (
                    <li
                        style={{
                            marginLeft: 30,
                            marginRight: 0,
                            backgroundColor: selectedProcesses.includes(furo.processo) ? '#008f83' : '#c4c4c4',
                            padding: 8,
                            borderRadius: 10
                        }}
                        key={index}
                    >
                        <button onClick={() => toggleProcess(furo.processo)}>
                            <h1
                                style={{
                                    color: selectedProcesses.includes(furo.processo) ? '#f3c108' : 'black',
                                    width: 120,
                                    fontWeight: 'bold'
                                }}
                            >
                                {furo.processo}
                            </h1>
                        </button>
                    </li>
                ))}
            </ul>
            {furoSelecionado?.furo && (
                <div style={{ marginTop: 40, alignItems: 'center', display: 'flex', flexDirection: 'column' }} >
                    <p>Furo selecionado: {furoSelecionado.furo}</p>
                    <p>Processos selecionados: {selectedProcesses.join(', ')}</p>

                    <div style={{ height: 50 }} />

                    <Button onClick={() => {
                        generatePDF(chipBoxesInternos[furoSelecionado?.index]);
                    }}>
                        <h1 style={{ padding: 15, fontSize: 18, fontWeight: 'bold', color: 'white', backgroundColor: '#074F92', borderRadius: 10 }} >
                            Enviar PDF
                        </h1>
                    </Button>

                </div>
            )}
        </div>
    )
}

const Button = styled.button`
    transition: opacity 0.3s;
    align-items: center;
    justify-content: center;
    &:hover {
        opacity: 0.2;
    }

`