import styled from 'styled-components'
import { useEffect } from "react";
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

export default function DadosProcessamento({ chipBoxes, furoSelecionado, filtroConferencia, filtroMarcacao, filtroFotografia, filtroDensidade, filtroSerragem, filtroArquivamento, chipBoxesInternos }) {

    const COLORS = ['#008F83', '#ef3a25 '];
    const conferencia = [
        { name: 'Executada', value: filtroConferencia[furoSelecionado?.index]?.length },
        { name: 'Restante', value: chipBoxesInternos[furoSelecionado?.index]?.length - filtroConferencia[furoSelecionado?.index]?.length }
    ];
    const marcacao = [
        { name: 'Executada', value: filtroMarcacao[furoSelecionado?.index]?.length },
        { name: 'Restante', value: chipBoxesInternos[furoSelecionado?.index]?.length - filtroMarcacao[furoSelecionado?.index]?.length }
    ];
    const fotografia = [
        { name: 'Executada', value: filtroFotografia[furoSelecionado?.index]?.length },
        { name: 'Restante', value: chipBoxesInternos[furoSelecionado?.index]?.length - filtroFotografia[furoSelecionado?.index]?.length }
    ];
    const densidade = [
        { name: 'Executada', value: filtroDensidade[furoSelecionado?.index]?.length },
        { name: 'Restante', value: chipBoxesInternos[furoSelecionado?.index]?.length - filtroDensidade[furoSelecionado?.index]?.length }
    ];
    const serragem = [
        { name: 'Executada', value: filtroSerragem[furoSelecionado?.index]?.length },
        { name: 'Restante', value: chipBoxesInternos[furoSelecionado?.index]?.length - filtroSerragem[furoSelecionado?.index]?.length }
    ];
    const arquivamento = [
        { name: 'Executada', value: filtroArquivamento[furoSelecionado?.index]?.length },
        { name: 'Restante', value: chipBoxesInternos[furoSelecionado?.index]?.length - filtroArquivamento[furoSelecionado?.index]?.length }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            window.location.reload();
        }, 5 * 60 * 1000); // 5 minutos em milissegundos

        return () => {
            clearInterval(interval);
        };
    }, []);

    if(!furoSelecionado)
    return(
        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}} >
            <text style={{ marginRight: 15, fontWeight: 'bold', fontSize:30 }}>Selecione o furo acima</text>
        </div>
    )

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', padding: 5, fontWeight: 'bold', color: '#008F83', fontSize: 35 }} >
                <text>Furo: {furoSelecionado.furo}</text>
            </div>
            <Row>
                <Column>
                    <text style={{ marginRight: 15, fontWeight: 'bold' }}>Conferência: {(filtroConferencia[furoSelecionado.index]?.length / chipBoxesInternos[furoSelecionado.index]?.length) * 100}% </text>
                    <PieChart width={320} height={320}>
                        <Pie
                            data={conferencia}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="35%"
                            outerRadius={110}
                            fill="#84d8b1"
                            label
                        >
                            {conferencia.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="top" height={36} />
                    </PieChart>
                </Column>
                <Column>
                    <text style={{ marginRight: 15, fontWeight: 'bold' }}>Marcação: {(filtroMarcacao[furoSelecionado.index]?.length / chipBoxesInternos[furoSelecionado.index]?.length) * 100}% </text>
                    <PieChart width={320} height={320}>
                        <Pie
                            data={marcacao}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="35%"
                            outerRadius={110}
                            fill="#84d8b1"
                            label
                        >
                            {conferencia.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="top" height={36} />
                    </PieChart>
                </Column>
                <Column>
                    <text style={{ marginRight: 15, fontWeight: 'bold' }} >Fotografia: {(filtroFotografia[furoSelecionado.index]?.length / chipBoxesInternos[furoSelecionado.index]?.length) * 100}% </text>
                    <PieChart width={320} height={320}>
                        <Pie
                            data={fotografia}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="35%"
                            outerRadius={110}
                            fill="#84d8b1"
                            label
                        >
                            {conferencia.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="top" height={36} />
                    </PieChart>
                </Column>
                <Column>
                    <text style={{ marginRight: 15, fontWeight: 'bold' }} >Arquivamento: {(filtroArquivamento[furoSelecionado.index]?.length / chipBoxesInternos[furoSelecionado.index]?.length) * 100}% </text>
                    <PieChart width={320} height={320}>
                        <Pie
                            data={arquivamento}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="35%"
                            outerRadius={110}
                            fill="#84d8b1"
                            label
                        >
                            {conferencia.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="top" height={36} />
                    </PieChart>
                </Column>
            </Row>
        </>
    )
}

const Mt = styled.div({
    marginTop: -60
})

const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
`;
const Column = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
})

