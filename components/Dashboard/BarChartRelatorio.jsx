/* eslint-disable */

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';

const CustomBarChart = ({ data }) => (
  <BarChart width={1100} height={500} data={data}> {/* Aumente o valor de width */}
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="id" />
    <YAxis>
      <Label value="Segundos" angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fontWeight:'bold', fontSize:20 }} />
    </YAxis>
    <Tooltip content={CustomTooltip} /> {/* Adicione o tooltip personalizado */}
    <Legend />
    <Bar dataKey="Tempo (segundos)" fill="#008F83" />
  </BarChart>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{ background: 'white', border: '1px solid #ccc', padding: '10px', fontSize: '14px' }}>
        <p><strong>Furo-Caixa:</strong> {data.id}</p>
        <p><strong>Tempo (segundos):</strong> {data['Tempo (segundos)']}</p>
        <p><strong>Caixa:</strong> {data.caixa}</p>
        <p><strong>Usuário:</strong> {data.user}</p> {/* Exibir o nome do usuário */}
      </div>
    );
  }
  return null;
}

export default CustomBarChart;
