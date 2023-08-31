import styled from 'styled-components'
import { useEffect, useState } from "react";
import CustomBarChart from './BarChartRelatorio';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
registerLocale('pt-BR', ptBR);
import 'dayjs/locale/pt-br';
import InfoProcess from './infoProcess';

export default function Relatorio({ chipBoxes, furoSelecionado, filtroConferencia, filtroMarcacao, filtroFotografia, filtroDensidade, filtroSerragem, filtroArquivamento, chipBoxesInternos }) {

    if (!furoSelecionado)
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                <text style={{ marginRight: 15, fontWeight: 'bold', fontSize: 30 }}>Selecione o furo acima</text>
            </div>
        )

    const [selectedDateRange, setSelectedDateRange] = useState({ startDate: null, endDate: null });
    const [process, setProcess] = useState(null);
    const processos = [
        { 'processo': 'Conferência' },
        { 'processo': 'Marcação' },
        { 'processo': 'Fotografia' },
        // { 'processo': 'Densidade' },
        // { 'processo': 'Serragem' },
        // { 'processo': 'Despacho' },
        { 'processo': 'Arquivamento' },

    ]

    function sett(selected) {
        setProcess(selected);
    }

    useEffect(() => {
        if (process == 'Conferência') {
            const dataArray = filtroConferencia[furoSelecionado?.index]
            const conferenciaData = dataArray.map(item => ({
                'id': item.id,
                'Tempo (segundos)': item.processos.conferencia.sai.seconds - item.processos.conferencia.ent.seconds,
                'caixa': item.cx,
                'user': item.processos.conferencia.user,
                'Data finalização': item.processos.conferencia.sai.seconds
            }));
            setArrayDataProcess(conferenciaData)
        }

        if (process == 'Marcação') {
            const dataArray = filtroMarcacao[furoSelecionado?.index]
            const marcacaoData = dataArray.map(item => ({
                'id': item.id,
                'Tempo (segundos)': item.processos.marcacao.sai.seconds - item.processos.marcacao.ent.seconds,
                'caixa': item.cx,
                'user': item.processos.marcacao.user,
                'Data finalização': item.processos.marcacao.sai.seconds
            }));
            setArrayDataProcess(marcacaoData)
        }
        if (process == 'Fotografia') {
            const dataArray = filtroFotografia[furoSelecionado?.index]
            const fotografiaData = dataArray.map(item => ({
                'id': item.id,
                'Tempo (segundos)': item.processos.fotografia.sai.seconds - item.processos.fotografia.ent.seconds,
                'caixa': item.cx,
                'user': item.processos.fotografia.user,
                'Data finalização': item.processos.fotografia.sai.seconds
            }));
            setArrayDataProcess(fotografiaData)
        }
        // if (process == 'Densidade') {
        //     const dataArray = filtroDensidade[furoSelecionado?.index]
        //     const densidadeData = dataArray.map(item => ({
        //         'id': item.id,
        //         'Tempo (segundos)': item.processos.densidade.sai.seconds - item.processos.densidade.ent.seconds,
        //         'caixa': item.cx,
        //         'user': item.processos.densidade.user
        //     }));
        //     setArrayDataProcess(densidadeData)
        // }
        // if (process == 'Serragem') {
        //     const dataArray = filtroSerragem[furoSelecionado?.index]
        //     const serragemData = dataArray.map(item => ({
        //         'id': item.id,
        //         'Tempo (segundos)': item.processos.serragem.sai.seconds - item.processos.serragem.ent.seconds,
        //         'caixa': item.cx,
        //         'user': item.processos.serragem.user
        //     }));
        //     setArrayDataProcess(serragemData)
        // }
        // if (process == 'Despacho') {
        //     const dataArray = filtroFotografia[furoSelecionado?.index]
        //     const despachoData = dataArray.map(item => ({
        //         'id': item.id,
        //         'Tempo (segundos)': item.processos.despacho.sai.seconds - item.processos.despacho.ent.seconds,
        //         'caixa': item.cx,
        //         'user': item.processos.despacho.user
        //     }));
        //     setArrayDataProcess(despachoData)
        // }
        if (process == 'Arquivamento') {
            const dataArray = filtroArquivamento[furoSelecionado?.index]
            const arquivamentoData = dataArray.map(item => ({
                'id': item.id,
                'Tempo (segundos)': item.processos.arquivamento.sai.seconds - item.processos.arquivamento.ent.seconds,
                'caixa': item.cx,
                'user': item.processos.arquivamento.user,
                'Data finalização': item.processos.arquivamento.sai.seconds
            }));
            setArrayDataProcess(arquivamentoData)
        }
    }, [process, furoSelecionado]);

    function motionIcon() {
        return (
            <motion.div
                style={{ marginLeft: 525, marginBottom: -20 }}
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                transition={{ repeat: Infinity, duration: 1, repeatType: 'reverse' }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="60"
                    height="60"
                    fill="currentColor"
                    className="bi bi-chevron-down"
                    viewBox="0 0 16 16"
                >
                    <path
                        fill-rule="evenodd"
                        d="M4.646 5.646a.5.5 0 0 1 .708 0L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z"
                    />
                </svg>
            </motion.div>
        )
    }
    const [arrayDataProcess, setArrayDataProcess] = useState()

    const [arrayDataProcessDateFilter, setArrayDataProcessDateFilterDateFilter] = useState()

    useEffect(() => {
        const filteredData = arrayDataProcess?.filter(item => {
            const dataFinalizacao = new Date(item["Data finalização"] * 1000);
            const dataFinalizacaoDay = dataFinalizacao.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to zero
            const startDateDay = selectedDateRange?.startDate ? selectedDateRange?.startDate.setHours(0, 0, 0, 0) : null;
            const endDateDay = selectedDateRange?.endDate ? selectedDateRange?.endDate.setHours(0, 0, 0, 0) : null;

            if (startDateDay === endDateDay && startDateDay === dataFinalizacaoDay) {
                return true;
            } else {
                return (
                    (!startDateDay || dataFinalizacaoDay >= startDateDay) &&
                    (!endDateDay || dataFinalizacaoDay <= endDateDay)
                );
            }
        });

        setArrayDataProcessDateFilterDateFilter(filteredData);
    }, [arrayDataProcess, selectedDateRange]);

    const [countFinalizadosSelectedProcess, setCountFinalizadosSelectedProcess] = useState()
    const [countProcessingBoxesSelectedProcess, setCountProcessingBoxesSelectedProcess] = useState()
    const [countNotStartedBoxesSelectedProcess, setCountNotStartedBoxesSelectedProcess] = useState()

    useEffect(()=>{

        if(process==='Conferência'){
            const arrayFinalizadoConferencia = chipBoxesInternos[furoSelecionado.index].filter(chipbox =>
                    chipbox.processos.conferencia.sai && chipbox.processos.conferencia.ent !== null
                )
            setCountFinalizadosSelectedProcess(arrayFinalizadoConferencia.length)
            
            const arrayIniciadoConferencia = chipBoxesInternos[furoSelecionado.index].filter(chipbox =>
                    chipbox.processos.conferencia.ent !== null && chipbox.processos.conferencia.sai === null
                )
            setCountProcessingBoxesSelectedProcess(arrayIniciadoConferencia.length)
            
            const arrayNotStartedConferencia = chipBoxesInternos[furoSelecionado.index].filter(chipbox =>
                chipbox.processos.conferencia.sai && chipbox.processos.conferencia.ent == null
            )
            setCountNotStartedBoxesSelectedProcess(arrayNotStartedConferencia.length)
            
        }
        if(process==='Marcação'){
            const arrayFinalizadomarcacao = chipBoxesInternos[furoSelecionado.index].filter(chipbox =>
                    chipbox.processos.marcacao.sai && chipbox.processos.marcacao.ent !== null
                )
            setCountFinalizadosSelectedProcess(arrayFinalizadomarcacao.length)
            
            const arrayIniciadomarcacao = chipBoxesInternos[furoSelecionado.index].filter(chipbox =>
                    chipbox.processos.marcacao.ent !== null && chipbox.processos.marcacao.sai === null
                )
            setCountProcessingBoxesSelectedProcess(arrayIniciadomarcacao.length)
            
            const arrayNotStartedmarcacao = chipBoxesInternos[furoSelecionado.index].filter(chipbox =>
                chipbox.processos.marcacao.sai && chipbox.processos.marcacao.ent == null
            )
            setCountNotStartedBoxesSelectedProcess(arrayNotStartedmarcacao.length)
            
        }
        if(process==='Fotografia'){
            const arrayFinalizadofotografia = chipBoxesInternos[furoSelecionado.index].filter(chipbox =>
                    chipbox.processos.fotografia.sai && chipbox.processos.fotografia.ent !== null
                )
            setCountFinalizadosSelectedProcess(arrayFinalizadofotografia.length)
            
            const arrayIniciadofotografia = chipBoxesInternos[furoSelecionado.index].filter(chipbox =>
                    chipbox.processos.fotografia.ent !== null && chipbox.processos.fotografia.sai === null
                )
            setCountProcessingBoxesSelectedProcess(arrayIniciadofotografia.length)
            
            const arrayNotStartedfotografia = chipBoxesInternos[furoSelecionado.index].filter(chipbox =>
                chipbox.processos.fotografia.sai && chipbox.processos.fotografia.ent == null
            )
            setCountNotStartedBoxesSelectedProcess(arrayNotStartedfotografia.length)
            
        }
        if(process==='Arquivamento'){
            const arrayFinalizadoarquivamento = chipBoxesInternos[furoSelecionado.index].filter(chipbox =>
                    chipbox.processos.arquivamento.sai && chipbox.processos.arquivamento.ent !== null
                )
            setCountFinalizadosSelectedProcess(arrayFinalizadoarquivamento.length)
            
            const arrayIniciadoarquivamento = chipBoxesInternos[furoSelecionado.index].filter(chipbox =>
                    chipbox.processos.arquivamento.ent !== null && chipbox.processos.arquivamento.sai === null
                )
            setCountProcessingBoxesSelectedProcess(arrayIniciadoarquivamento.length)
            
            const arrayNotStartedarquivamento = chipBoxesInternos[furoSelecionado.index].filter(chipbox =>
                chipbox.processos.arquivamento.sai && chipbox.processos.arquivamento.ent == null
            )
            setCountNotStartedBoxesSelectedProcess(arrayNotStartedarquivamento.length)
            
        }
        

    },[process, chipBoxesInternos[furoSelecionado.index]])

    console.log('total:', chipBoxesInternos[furoSelecionado.index].length)
    console.log('iniciado:', countProcessingBoxesSelectedProcess)
    console.log('finalizado:', countFinalizadosSelectedProcess)

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: 5, flexDirection: 'column', width: '100%' }} >
            <text style={{ fontSize: 25, fontWeight: 'bold', marginLeft: 50, marginTop: 5 }} >Selecione o processo para exibir o gráfico de tempo de processamento de cada caixa{motionIcon()} </text>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 5, marginLeft: 250 }} >
                <ul style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto', overflow: 'hidden' }} >
                    {processos.map((furo, index) => (
                        <li style={{ marginLeft: 30, marginRight: 0, backgroundColor: furo.processo == process ? '#008f83' : '#c4c4c4', padding: 8, borderRadius: 10 }} key={furo.id}>
                            <Button>
                                <h1 style={{ color: furo.processo !== process ? 'black' : '#f3c108', width: 120, fontWeight: 'bold' }} onClick={() => sett(furo.processo, index)} >
                                    {furo.processo}
                                </h1>
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
            {
                arrayDataProcess ?
                    <div style={{ marginLeft: '-2%', display: 'flex', flexDirection: 'row' }} >
                        <CustomBarChart data={selectedDateRange ? arrayDataProcessDateFilter : arrayDataProcess} />
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                            <text style={{ marginLeft: 15, fontWeight: 'bold' }} >Filtrar por data</text>
                            <DatePickerWrapper>
                                <DatePicker
                                    selected={selectedDateRange.startDate}
                                    onChange={dates => setSelectedDateRange({ startDate: dates[0], endDate: dates[1] })}
                                    startDate={selectedDateRange.startDate}
                                    endDate={selectedDateRange.endDate}
                                    selectsRange
                                    locale="pt-BR"
                                    inline
                                />
                            </DatePickerWrapper>
                            <InfoProcess total={chipBoxesInternos[furoSelecionado.index].length} 
                                         iniciado={countProcessingBoxesSelectedProcess} 
                                         finalizado={countFinalizadosSelectedProcess} 
                                         naoIniciado={countNotStartedBoxesSelectedProcess}
                            />
                        </div>

                    </div>
                    :
                    <></>
            }
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
const DatePickerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0px;
    margin-left: 20px;
`;