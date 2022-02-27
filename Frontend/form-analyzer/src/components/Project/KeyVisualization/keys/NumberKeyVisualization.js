import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS, CategoryScale,
    RadialLinearScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    BarElement, Title, Tooltip, Legend
} from 'chart.js';
import { Bar, Radar } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    RadialLinearScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Filler,
    Tooltip,
    Legend
);
export default function NumberKeyVisualization({ values, currentKey }) {

    const [horizontalBarData, sethorizontalBarData] = useState({
        labels: [],
        data: [],
    });
    useEffect(async () => {
        var obj = {}
        for (let i = 0; i < values.length; i++) {
            if (obj[values[i]]) {
                obj[values[i]] = obj[values[i]] + 1;
            } else {
                obj[values[i]] = 1
            }
        }
        sethorizontalBarData({
            labels: Object.keys(obj),
            data: Object.values(obj),
        })
    }, [values]);


    const showHorizontalBar = () => {
        const chartData = {
            labels: horizontalBarData.labels,
            datasets: [
                {
                    label: `Counts Of Every `+ currentKey,
                    data: horizontalBarData.data,
                    backgroundColor: "#187bd1",
                    borderWidth: 1,
                    borderColor: "#000000",
                },
            ],
        }
        const options = {
            responsive: true,
            indexAxis: 'y',
            animation: {
                duration: 500,
            },
            scales: {
                x: {
                  grid: {
                    display: false
                  }
                },
                y: {
                  grid: {
                    display: false
                  }
                }
              }
        };

        return <Bar options={options} data={chartData} />;
    }

    const showRadarBar = () => {
        const chartData = {
            labels: horizontalBarData.labels,
            datasets: [
                {
                    label: `Counts Of Every `+ currentKey,
                    data: horizontalBarData.data,
                    backgroundColor: "#187bd1",
                    borderWidth: 1,
                    borderColor: "#000000",
                },
            ],
        }
        const options = {
            animation: {
                duration: 500,
            },
            
        }

        return <Radar options={options} data={chartData} />;
    }


    return (

        <div>
            <div class='row'>
                <div class='col-md-1'></div>
                <div class='col-md-10'>{showHorizontalBar()}</div>
            </div>

            <div class='row'>
                <div class='col-md-1'></div>
                <div class='col-md-10'>{showRadarBar()}</div>
            </div>
        </div>
    )
}
