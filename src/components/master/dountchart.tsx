"use client"
import styles from "./master.module.css"
import React from 'react';
import { Chart } from 'react-google-charts';

const Page = () => {
  const data = [
    ['Task', 'Hours per Day'],
    ['Work', 11],
    ['Eat', 2],
    ['Commute', 2],
    ['Watch TV', 2],
    ['Sleep', 7],
  ];

  const options = {
    title: 'My Daily Activities',
    pieHole: 0.4,
    backgroundColor: 'transparent',
    pieSliceText: 'value', // Texto a ser exibido nas fatias
    slices: {
      0: { offset: 0, color: '#ff9999' }, // Primeira fatia
      1: { offset: 0, color: '#66b3ff' }, // Segunda fatia
      2: { offset: 0, color: '#99ff99' }, // Terceira fatia
      3: { offset: 0, color: '#ffcc99' }, // Quarta fatia
      4: { offset: 0, color: '#c2c2f0' }, // Quinta fatia
    },
    titleTextStyle: {
      color: '#4caf50',
      fontSize: 24,
      bold: true,
      italic: true,
    },
    legend: {
      position: 'right',
      textStyle: {
        color: '#007bff',
        fontSize: 16,
      },
    },
    pieStartAngle: 45, // Ângulo de início do gráfico
    chartArea: {
      width: '90%',
      height: '80%',
      backgroundColor: {
        stroke: '#ccc',
        strokeWidth: 2,
      },
    },
    tooltip: {
      textStyle: {
        color: '#000',
        fontSize: 12,
      },
      showColorCode: true,
      trigger: 'selection',
    },
    animation: {
      startup: true,
      easing: 'linear',
      duration: 1500,
    },
  };
    return(
        <Chart
            chartType="PieChart"
            width="900px"
            height="500px"
            data={data}
            options={options}
        />
    );
}
export default Page;