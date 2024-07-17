"use client"
import styles from "./master.module.css"
import React from 'react';
import { Chart } from 'react-google-charts';

const Page = () => {
  const data = [
    ["Element", "Density", { role: "style" }],
    ["Copper", 8.94, "#a6ecb7"],
    ["Silver", 10.49, "#81d494"],
    ["Gold", 19.30, "#53bb6b"],
    ["Platinum", 21.45, "color: #28a745"]
  ];

  const options = {
    title: "Density of Precious Metals, in g/cm^3",
    titleTextStyle: {
      color: '#28a745', // Cor do título do eixo horizontal
      italic: true,
      fontSize: 24,
    }, 
    width: 600,
    height: 300,
    bar: { groupWidth: "95%" },
    legend: { position: "none" },
    backgroundColor: 'transparent', // Example customization
    hAxis: {
      title: 'Density',
      minValue: 0,
      titleTextStyle: {
        color: '#007bff', // Cor do título do eixo horizontal
        italic: true,
      },
      gridlines: {
        color: '404040',  // Cor das linhas principais
      },
      minorGridlines: {
        color: '#303030',  // Cor das linhas menores
      },  
      textStyle: {
        color: '#ffc107',
        fontSize: 12,
        italic: true,
      },
    },
    vAxis: {
      title: 'Element',
      textStyle: {
        color: '#ffc107',
        fontSize: 12,
        bold: true,
      },
      
    },
    
    annotations: {
      alwaysOutside: true,
      textStyle: {
        fontSize: 12,
        auraColor: 'none',
        color: '#fff',
      },
    },
  };
    return(
        <main className={styles.boxbar}>
          <Chart
            chartType="BarChart"
            width="100%"
            height="300px"
            data={data}
            options={options}
        />
        </main>
    );
}
export default Page;