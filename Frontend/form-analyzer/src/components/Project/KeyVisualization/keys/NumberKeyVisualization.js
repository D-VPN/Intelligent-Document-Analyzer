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
export default function NumberKeyVisualization({ values }) {

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
                    label: "Labels",
                    data: horizontalBarData.data,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
            ],
        }
        const options = {
            responsive: true,
            indexAxis: 'y',
        };

        return <Bar options={options} data={chartData} />;
    }

    const showRadarBar = () => {
        const chartData = {
            labels: horizontalBarData.labels,
            datasets: [
                {
                    label: "Labels",
                    data: horizontalBarData.data,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderWidth: 1,
                },
            ],
        }

        return <Radar data={chartData} />;
    }


    return (
        <div class='col-md-10 mt-5'>

            {showHorizontalBar()}
            {showRadarBar()}
        </div>
    )
}
