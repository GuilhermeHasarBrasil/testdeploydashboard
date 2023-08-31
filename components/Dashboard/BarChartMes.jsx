/* eslint-disable */

import styled from 'styled-components';
import { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
registerLocale('pt-BR', ptBR);
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ArrowBackCircleSharp, ArrowForwardCircleSharp } from 'react-ionicons'
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

export default function CustomBarChartMes({ chipBoxes, furoSelecionado }) {
    const [selectedDateRange, setSelectedDateRange] = useState({ startDate: null, endDate: null });
    const [numberCarrousel, setNumberCarrousel] = useState(1)
    const [arrayDataProcessConferencia, setArrayDataProcessConferencia] = useState([]);
    const [arrayDataProcessMarcacao, setArrayDataProcessMarcacao] = useState([]);
    const [arrayDataProcessFotografia, setArrayDataProcessFotografia] = useState([]);
    const [arrayDataProcessArquivamento, setArrayDataProcessArquivamento] = useState([]);

    useEffect(() => {
        const filteredCaixasConferencia = chipBoxes.filter(caixa => {
            const saidaConferencia = caixa.processos?.conferencia?.sai;
            if (!selectedDateRange.startDate || !selectedDateRange.endDate) {
                return false; // Intervalo de datas não selecionado, então não precisa filtrar
            }
            if (saidaConferencia) {
                const saidaTimestamp = saidaConferencia.seconds * 1000 + saidaConferencia.nanoseconds / 1000000;
                return saidaTimestamp >= selectedDateRange.startDate.getTime() && saidaTimestamp <= selectedDateRange.endDate.getTime();
            }
            return false;
        });
        setArrayDataProcessConferencia(filteredCaixasConferencia);

        const filteredCaixasMarcacao = chipBoxes.filter(caixa => {
            const saidamarcacao = caixa.processos?.marcacao?.sai;
            if (!selectedDateRange.startDate || !selectedDateRange.endDate) {
                return false; // Intervalo de datas não selecionado, então não precisa filtrar
            }
            if (saidamarcacao) {
                const saidaTimestamp = saidamarcacao.seconds * 1000 + saidamarcacao.nanoseconds / 1000000;
                return saidaTimestamp >= selectedDateRange.startDate.getTime() && saidaTimestamp <= selectedDateRange.endDate.getTime();
            }
            return false;
        });
        setArrayDataProcessMarcacao(filteredCaixasMarcacao);

        const filteredCaixasFotografia = chipBoxes.filter(caixa => {
            const saidafotografia = caixa.processos?.fotografia?.sai;
            if (!selectedDateRange.startDate || !selectedDateRange.endDate) {
                return false; // Intervalo de datas não selecionado, então não precisa filtrar
            }
            if (saidafotografia) {
                const saidaTimestamp = saidafotografia.seconds * 1000 + saidafotografia.nanoseconds / 1000000;
                return saidaTimestamp >= selectedDateRange.startDate.getTime() && saidaTimestamp <= selectedDateRange.endDate.getTime();
            }
            return false;
        });
        setArrayDataProcessFotografia(filteredCaixasFotografia);

        const filteredCaixasArquivamento = chipBoxes.filter(caixa => {
            const saidaarquivamento = caixa.processos?.arquivamento?.sai;
            if (!selectedDateRange.startDate || !selectedDateRange.endDate) {
                return false; // Intervalo de datas não selecionado, então não precisa filtrar
            }
            if (saidaarquivamento) {
                const saidaTimestamp = saidaarquivamento.seconds * 1000 + saidaarquivamento.nanoseconds / 1000000;
                return saidaTimestamp >= selectedDateRange.startDate.getTime() && saidaTimestamp <= selectedDateRange.endDate.getTime();
            }
            return false;
        });
        setArrayDataProcessArquivamento(filteredCaixasArquivamento);

    }, [chipBoxes, selectedDateRange]);

    const [conferenciaData, setConferenciaData] = useState()
    const [marcacaoData, setMarcacaoData] = useState()
    const [fotografiaData, setFotografiaData] = useState()
    const [arquivamentoData, setArquivamentoData] = useState()

    useEffect(() => {
        if (arrayDataProcessConferencia.length > 0) {
            const dataForChart = [];
            selectedDateRange.startDate.setDate(selectedDateRange.startDate.getDate() - 1); // Adicionar um dia para incluir o início do intervalo
            selectedDateRange.endDate.setDate(selectedDateRange.endDate.getDate() + 1); // Adicionar um dia para incluir o final do intervalo
            const interval = (selectedDateRange.endDate - selectedDateRange.startDate) / (24 * 60 * 60 * 1000); // Calcula o número de dias no intervalo
            for (let i = 0; i < interval; i++) {
                const currentDate = new Date(selectedDateRange.startDate);
                currentDate.setDate(currentDate.getDate() + i);
                const boxesOnDate = arrayDataProcessConferencia.filter(caixa => {
                    const saidaConferencia = caixa.processos?.conferencia?.sai;
                    if (saidaConferencia) {
                        const caixaDate = new Date(saidaConferencia.seconds * 1000 + saidaConferencia.nanoseconds / 1000000);
                        return currentDate.toDateString() === caixaDate.toDateString();
                    }
                    return false;
                });

                const sumMetragem = boxesOnDate.reduce((sum, caixa) => sum + (caixa.ate - caixa.de), 0);
                dataForChart.push({ date: currentDate.toISOString().substr(0, 10), metragem: sumMetragem });
            }
            setConferenciaData(dataForChart);
        }
        if (arrayDataProcessMarcacao.length > 0) {
            const dataForChart = [];
            selectedDateRange.startDate.setDate(selectedDateRange.startDate.getDate() - 1); // Adicionar um dia para incluir o início do intervalo
            selectedDateRange.endDate.setDate(selectedDateRange.endDate.getDate() + 1); // Adicionar um dia para incluir o final do intervalo
            const interval = (selectedDateRange.endDate - selectedDateRange.startDate) / (24 * 60 * 60 * 1000); // Calcula o número de dias no intervalo
            for (let i = 0; i < interval; i++) {
                const currentDate = new Date(selectedDateRange.startDate);
                currentDate.setDate(currentDate.getDate() + i);
                const boxesOnDate = arrayDataProcessMarcacao.filter(caixa => {
                    const saidamarcacao = caixa.processos?.marcacao?.sai;
                    if (saidamarcacao) {
                        const caixaDate = new Date(saidamarcacao.seconds * 1000 + saidamarcacao.nanoseconds / 1000000);
                        return currentDate.toDateString() === caixaDate.toDateString();
                    }
                    return false;
                });

                const sumMetragem = boxesOnDate.reduce((sum, caixa) => sum + (caixa.ate - caixa.de), 0);
                dataForChart.push({ date: currentDate.toISOString().substr(0, 10), metragem: sumMetragem });
            }
            setMarcacaoData(dataForChart);
        }
        if (arrayDataProcessFotografia.length > 0) {
            const dataForChart = [];
            selectedDateRange.startDate.setDate(selectedDateRange.startDate.getDate() - 1); // Adicionar um dia para incluir o início do intervalo
            selectedDateRange.endDate.setDate(selectedDateRange.endDate.getDate() + 1); // Adicionar um dia para incluir o final do intervalo
            const interval = (selectedDateRange.endDate - selectedDateRange.startDate) / (24 * 60 * 60 * 1000); // Calcula o número de dias no intervalo
            for (let i = 0; i < interval; i++) {
                const currentDate = new Date(selectedDateRange.startDate);
                currentDate.setDate(currentDate.getDate() + i);
                const boxesOnDate = arrayDataProcessFotografia.filter(caixa => {
                    const saidafotografia = caixa.processos?.fotografia?.sai;
                    if (saidafotografia) {
                        const caixaDate = new Date(saidafotografia.seconds * 1000 + saidafotografia.nanoseconds / 1000000);
                        return currentDate.toDateString() === caixaDate.toDateString();
                    }
                    return false;
                });

                const sumMetragem = boxesOnDate.reduce((sum, caixa) => sum + (caixa.ate - caixa.de), 0);
                dataForChart.push({ date: currentDate.toISOString().substr(0, 10), metragem: sumMetragem });
            }
            setFotografiaData(dataForChart);
        }
        if (arrayDataProcessArquivamento.length > 0) {
            const dataForChart = [];
            selectedDateRange.startDate.setDate(selectedDateRange.startDate.getDate() - 1); // Adicionar um dia para incluir o início do intervalo
            selectedDateRange.endDate.setDate(selectedDateRange.endDate.getDate() + 1); // Adicionar um dia para incluir o final do intervalo
            const interval = (selectedDateRange.endDate - selectedDateRange.startDate) / (24 * 60 * 60 * 1000); // Calcula o número de dias no intervalo
            for (let i = 0; i < interval; i++) {
                const currentDate = new Date(selectedDateRange.startDate);
                currentDate.setDate(currentDate.getDate() + i);
                const boxesOnDate = arrayDataProcessArquivamento.filter(caixa => {
                    const saidaarquivamento = caixa.processos?.arquivamento?.sai;
                    if (saidaarquivamento) {
                        const caixaDate = new Date(saidaarquivamento.seconds * 1000 + saidaarquivamento.nanoseconds / 1000000);
                        return currentDate.toDateString() === caixaDate.toDateString();
                    }
                    return false;
                });

                const sumMetragem = boxesOnDate.reduce((sum, caixa) => sum + (caixa.ate - caixa.de), 0);
                dataForChart.push({ date: currentDate.toISOString().substr(0, 10), metragem: sumMetragem });
            }
            setArquivamentoData(dataForChart);
        }
    }, [arrayDataProcessConferencia, arrayDataProcessMarcacao, arrayDataProcessFotografia, arrayDataProcessArquivamento])

    useEffect(() => {
        if (numberCarrousel < 1) {
            setNumberCarrousel(4)
        }
        if (numberCarrousel > 4) {
            setNumberCarrousel(1)
        }
    }, [numberCarrousel])

    console.log(selectedDateRange.startDate?.toISOString().substr(0, 10))

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: 5, flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            {
                selectedDateRange?.startDate ?
                    <text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>
                        Processo de {
                            numberCarrousel === 1 ? 'conferência'
                                :
                                numberCarrousel === 2 ? 'marcação'
                                    :
                                    numberCarrousel === 3 ? 'fotografia'
                                        :
                                        numberCarrousel === 4 ? 'arquivamento' : 'conferência'
                        }{' '}
                        - dia {selectedDateRange.startDate ? dayjs(selectedDateRange.startDate).locale('pt-br').format('DD/MM/YYYY') : 'Data não selecionada'} até{' '}
                        {selectedDateRange.endDate ? dayjs(selectedDateRange.endDate).locale('pt-br').format('DD/MM/YYYY') : 'Data não selecionada'}
                    </text>
                    :
                    <></>
            }

            {
                arrayDataProcessConferencia.length > 0 ?

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 4 }} >
                            <text>Alternar para</text>
                            <text>
                                {numberCarrousel === 1 ? 'Arquivamento'
                                    :
                                    numberCarrousel === 2 ? 'Conferência'
                                        :
                                        numberCarrousel === 3 ? 'Marcação'
                                            :
                                            numberCarrousel === 4 ? 'Fotografia' : 'Arquivamento'
                                }
                            </text>
                            <BgIcon>
                                <ArrowBackCircleSharp
                                    color={'#00000'}
                                    title={'voltar'}
                                    height="40px"
                                    width="40px"
                                    onClick={() => setNumberCarrousel(numberCarrousel - 1)}
                                />
                            </BgIcon>
                        </div>
                        <BarChart style={{ backgroundColor: '#D9D9D9' }} width={1200} height={345}
                            data={
                                numberCarrousel === 1 ? conferenciaData
                                    :
                                    numberCarrousel === 2 ? marcacaoData
                                        :
                                        numberCarrousel === 3 ? fotografiaData
                                            :
                                            numberCarrousel === 4 ? arquivamentoData : conferenciaData
                            }
                        >
                            <XAxis dataKey="date" tickFormatter={(tick) => {
                                const [year, month, day] = tick.split("-");
                                return `${day}/${month}/${year.substr(2)}`;
                            }}
                                label={{ fontWeight: 'bold', fontSize: 18 }}
                            />
                            <YAxis label={{ value: 'Metros', angle: -90, position: 'insideLeft', fontWeight: 'bold', fontSize: 18 }} />
                            <Tooltip />
                            <CartesianGrid stroke="#f5f5f5" />
                            <Bar dataKey="metragem" fill="#008F83" />
                        </BarChart>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: 4 }} >
                            <text>Alternar para</text>
                            <text>
                                {numberCarrousel === 1 ? 'Marcação'
                                    :
                                    numberCarrousel === 2 ? 'Fotografia'
                                        :
                                        numberCarrousel === 3 ? 'Arquivamento'
                                            :
                                            numberCarrousel === 4 ? 'Conferência' : 'Marcação'
                                }
                            </text>
                            <BgIcon>
                                <ArrowForwardCircleSharp
                                    color={'#00000'}
                                    title={'avançar'}
                                    height="40px"
                                    width="40px"
                                    onClick={() => setNumberCarrousel(numberCarrousel + 1)}
                                />
                            </BgIcon>
                        </div>
                    </div>
                    :
                    <></>

            }
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
        </div>
    );
}

const DatePickerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
`;

const BgIcon = styled.button`
    transition: opacity 0.3s;
    height: 45px;
    width: 45px;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background-color:'white';
    &:hover {
        opacity: 0.2;
    }

`
