import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


export default function CheckBoxKeyVisualization({ values }) {
    const [keyData, setKeyData] = useState({
        labels: [],
        data: [],
        colors: [],
    });
    useEffect(async () => {
        const labels = Object.keys(values)
        const data = Object.values(values)
        var colors = [
        ]
        for (let i = 0; i < labels.length; i++) {
            colors.push(defaultColors[i])
        }
        setKeyData({
            labels: labels,
            data: data,
            colors: colors,
        });
    }, [values]);

    const defaultColors = [
        "#ffcccc",
        "#4d94ff",
        "#ff66ff",
        "#80ff80",
        "#ff9966",
        "#ff80bf",
    ]

    const showPieChart = () => {
        const pieData = {
            labels: keyData.labels,
            datasets: [
                {
                    label: 'Keys',
                    data: keyData.data,
                    backgroundColor: keyData.colors,
                    borderColor: keyData.colors,
                    borderWidth: 1,
                },
            ],
        }
        return <Pie data={pieData} />;
    }


    return (
        <div class='row'>
            <div class='col-md-1'></div>
            <div class='col-md-10'>{showPieChart()}</div>
        </div>
    )
}