import React from 'react'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SentimentKeyVisualization({ values }) {
    const [doughnutChartData, setdoughnutChartData] = useState({
        labels: [],
        data: [],
        colors: [],
    });
    const showDoughnutChart = () => {
        const doughnutData = {
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

        return <Bar options={options} data={doughnutData} />;
    }

    const defaultColors = [
        "#1aff1a",
        "#ff1a1a",
        "#666666",
    ]

    return (
        <div>SentimentKeyVisualization</div>
    )
}
