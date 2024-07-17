"use client"
import styles from "./master.module.css"
import React from 'react';
import { Chart } from 'react-google-charts';

const Page = () => {
  const data = [
    [{ type: "date", id: "Date" }, { type: "number", id: "Won/Loss" }],
    [new Date(2012, 3, 13), 37032],
    [new Date(2012, 3, 14), 38024],
    [new Date(2012, 3, 15), 38024],
    [new Date(2012, 3, 16), 38108],
    [new Date(2012, 3, 17), 38229], 
  ];

  const options = {
    title: "Red Sox Attendance",
    height: 350,
    calendar: {
      cellSize: 10,
      dayOfWeekLabel: {
        fontName: 'Times-Roman',
        fontSize: 12,
        color: '#1a8763',
        bold: true,
        italic: true,
      },
      monthLabel: {
        fontName: 'Times-Roman',
        fontSize: 12,
        color: '#981b48',
        bold: true,
        italic: true,
      },
      underMonthSpace: 16, // Bottom padding for the month labels.
      yearLabel: {
        fontName: 'Times-Roman',
        fontSize: 32,
        color: '#1A8763',
        bold: true,
        italic: true,
      },
    },
    noDataPattern: {
      backgroundColor: '#f8bbd0',
      color: '#e91e63'
    },
    colorAxis: {
      minValue: 0,
      colors: ['#f6c7b6', '#ce502d'] // color gradient for values.
    }
  };
    return(
        <main className={styles.boxbar}>
          <Chart
            chartType="Calendar"
            width="100%"
            height="300px"
            data={data}
            options={options}
        />
        </main>
    );
}
export default Page;