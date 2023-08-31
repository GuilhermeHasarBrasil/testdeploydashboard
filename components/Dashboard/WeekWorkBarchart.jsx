/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import styled from 'styled-components'

export default function BarChartWeek({ contagensPorDiaConferencia, contagensPorDiaMarcacao, contagensPorDiaFotografia, contagensPorDiaDensidade, contagensPorDiaSerragem, contagensPorDiaDespacho, contagensPorDiaArquivamento, chipBoxes }) {

    const diasDaSemana = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'];
    const [arrayDiasProcesso, setArrayDiasProcesso] = useState()
    const [process, setProcess] = useState('Conferência');
    const processos = [
        { 'processo': 'Conferência' },
        { 'processo': 'Marcação' },
        { 'processo': 'Fotografia' },
        { 'processo': 'Densidade' },
        { 'processo': 'Serragem' },
        { 'processo': 'Despacho' },
        { 'processo': 'Arquivamento' },
    ]
    function sett(selected) {
        setProcess(selected);
    }

    useEffect(() => {
        if (process == 'Conferência') {
            const data = diasDaSemana.map(dia => ({ dia, 'Quantidade de caixas processadas': contagensPorDiaConferencia[dia] || 0 }));
            setArrayDiasProcesso(data)
        }
        if (process == 'Marcação') {
            const data = diasDaSemana.map(dia => ({ dia, 'Quantidade de caixas processadas': contagensPorDiaMarcacao[dia] || 0 }));
            setArrayDiasProcesso(data)
        }
        if (process == 'Fotografia') {
            const data = diasDaSemana.map(dia => ({ dia, 'Quantidade de caixas processadas': contagensPorDiaFotografia[dia] || 0 }));
            setArrayDiasProcesso(data)
        }
        if (process == 'Densidade') {
            const data = diasDaSemana.map(dia => ({ dia, 'Quantidade de caixas processadas': contagensPorDiaDensidade[dia] || 0 }));
            setArrayDiasProcesso(data)
        }
        if (process == 'Serragem') {
            const data = diasDaSemana.map(dia => ({ dia, 'Quantidade de caixas processadas': contagensPorDiaSerragem[dia] || 0 }));
            setArrayDiasProcesso(data)
        }
        if (process == 'Despacho') {
            const data = diasDaSemana.map(dia => ({ dia, 'Quantidade de caixas processadas': contagensPorDiaDespacho[dia] || 0 }));
            setArrayDiasProcesso(data)
        }
        if (process == 'Arquivamento') {
            const data = diasDaSemana.map(dia => ({ dia, 'Quantidade de caixas processadas': contagensPorDiaArquivamento[dia] || 0 }));
            setArrayDiasProcesso(data)
        }
    }, [process, chipBoxes])


    return (
        <div style={{marginTop:10, marginLeft:100}} >
            <h1 style={{marginLeft:40, marginTop:10, marginBottom:5, fontSize:20, fontWeight:'bold'}} >Caixas processadas por dia da semana (por processo)</h1>
            <ul style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto', overflow: 'hidden', marginLeft:20, marginBottom:10 }} >
                {processos.map((furo, index) => (
                    <li style={{ marginLeft: 15, marginRight: 0, backgroundColor: furo.processo == process ? '#008f83' : '#c4c4c4', padding: 8, borderRadius: 10 }} key={furo.id}>
                        <Button>
                            <h1 style={{ color: furo.processo !== process ? 'black' : '#f3c108', width: 120, fontWeight: 'bold' }} onClick={() => sett(furo.processo, index)} >
                                {furo.processo}
                            </h1>
                        </Button>
                    </li>
                ))}
            </ul>
            <BarChart width={900} height={550} style={{marginLeft:100}} data={arrayDiasProcesso}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dia" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Quantidade de caixas processadas" fill="#008F83" />
            </BarChart>
        </div>
    );
}

const Button = styled.button`
    transition: opacity 0.3s;
    align-items: center;
    justify-content: center;
    &:hover {
        opacity: 0.2;
    }

`

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