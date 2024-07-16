"use client"
import styles from "./master.module.css"
import React from 'react';
import { Chart } from 'react-google-charts';

const Page = () => {
  const data = [
    ['Year', 'Sales', 'Expenses', ],
    ['2004', 1000, 400],
    ['2005', 1170, 460],
    ['2006', 660, 1120],
    ['2007', 1030, 540],
  ];

  const options = {
    title: 'Company Performance',
    backgroundColor: 'transparent',
    legend: {
      position: 'bottom',
      textStyle: {
        color: '#007bff', // Cor da legenda
        fontSize: 14,
      },
    },
    titleTextStyle: {
      color: '#dc3545', // Cor do título
      fontSize: 18,
      bold: true,
    },
    hAxis: {
      title: 'Year',
      textStyle: {
        color: '#28a745', // Cor do texto do eixo horizontal
      },
      titleTextStyle: {
        color: '#28a745', // Cor do título do eixo horizontal
        italic: true,
      },
      gridlines: {
        color: '#fff', // Cor das linhas de grade horizontais
      },
    },
    vAxis: {
      title: 'Amount',
      textStyle: {
        color: '#ffc107', // Cor do texto do eixo vertical
      },
      titleTextStyle: {
        color: '#ffc107', // Cor do título do eixo vertical
        italic: true,
      },
      gridlines: {
        color: '#505050', // Cor das linhas de grade verticais
      },
      baselineColor: 'transparent', // Linha do meio transparente
      minorGridlines: {
        color: '#373737',
        count: 5, // Desabilita as linhas de grade menores
      },
    },
    series: {
      0: { color: '#17a2b8', lineWidth: 2 }, // Cor da série de dados de 'Sales'
      1: { color: '#ff6347', lineWidth: 2 }, // Cor da série de dados de 'Expenses'
    },
    chartArea: {
      width: '80%', // Largura da área do gráfico
      height: '70%', // Altura da área do gráfico
      backgroundColor: {
        stroke: '#000', // Cor da borda da área do gráfico
        strokeWidth: 1, // Largura da borda da área do gráfico
      },
    },
  };
    return(
        <Chart
            chartType="LineChart"
            width="900px"
            height="500px"
            data={data}
            options={options}
        />
    );
}
export default Page;