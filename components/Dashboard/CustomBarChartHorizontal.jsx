/* eslint-disable */

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CustomHorizontalBarChart = ({ data, maxValue }) => {
  return (
    <BarChart width={1300} height={data.length * 50 + 250} data={data} layout="vertical">
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" />
      <YAxis dataKey="name" type="category" width={120} />
      <Tooltip />
      <Legend />
      <Bar dataKey="processed" fill="#008f83" name="Processados" />
      <Bar dataKey="total" fill="#ef3a25" name="Total" />
    </BarChart>
  );
};

export default CustomHorizontalBarChart;
