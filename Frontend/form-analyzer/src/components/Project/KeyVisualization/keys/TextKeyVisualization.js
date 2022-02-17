import React, { useState, useEffect } from 'react'
import {
    Chart as ChartJS, CategoryScale,
    LinearScale,
    BarElement, Title, Tooltip, Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function TextKeyVisualization({ values }) {
    const [verticalBarData, setverticalBarData] = useState({
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
        setverticalBarData({
            labels: Object.keys(obj),
            data: Object.values(obj),
        })
    }, [values]);

    const showHorizontalBar = () => {
        const pieData = {
            labels: verticalBarData.labels,
            datasets: [
                {
                    label: "Labels",
                    data: verticalBarData.data,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
            ],
        }
        const options = {
            responsive: true,
            indexAxis: 'y',
        };

        return <Bar options={options} data={pieData} />;
    }


    return (
        showHorizontalBar()
    )
}
