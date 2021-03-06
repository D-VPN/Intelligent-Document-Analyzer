import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function DateKeyVisualization({ values }) {
    const [yearData, setYearData] = useState({
        labels: [],
        data: [],
    })
    const [monthData, setMonthData] = useState({
        labels: [],
        data: [],
    })
    useEffect(async () => {
        var data = []
        var yearLabel = {}
        var monthLabel = {}
        for (let i = 0; i < values.length; i++) {
            data.push(new Date(values[i]))
            let year = data[i].getFullYear()
            if (yearLabel[year]) {
                yearLabel[year] = yearLabel[year] + 1;
            } else {
                yearLabel[year] = 1
            }
            let month = data[i].getMonth()
            if (monthLabel[month]) {
                monthLabel[month] = monthLabel[month] + 1;
            } else {
                monthLabel[month] = 1
            }
        }
        setYearData(prevState => {
            return {
                ...prevState,
                labels: Object.keys(yearLabel),
                data: Object.values(yearLabel),
            };
        });
        setMonthData(prevState => {
            return {
                ...prevState,
                labels: Object.keys(monthLabel),
                data: Object.values(monthLabel),
            };
        });
    }, [])

    const showYearLineChart = () => {
        const options = {
            responsive: true,
            animation: {
                duration: 500,
            },
            plugins: {
                legend: {
                    position: 'top',
                },
            },
        };


        const chartData = {
            labels: yearData.labels,
            datasets: [
                {
                    label: "Years",
                    data: yearData.data,
                    backgroundColor: "#187bd1",
                    borderWidth: 1,
                    borderColor: "#000000",
                },
            ],
        }

        return <Line options={options} data={chartData} />;
    }

    const showMonthLineChart = () => {
        const options = {
            responsive: true,
            animation: {
                duration: 500,
            },
            plugins: {
                legend: {
                    position: 'top',
                },
            },
        };


        const chartData = {
            labels: monthData.labels,
            datasets: [
                {
                    label: "Months",
                    data: monthData.data,
                    backgroundColor: "#187bd1",
                    borderWidth: 1,
                    borderColor: "#000000",
                },
            ],
        }

        return <Line options={options} data={chartData} />;
    }

    return (
        /* <div>
            {showYearLineChart()}
            {showMonthLineChart()}
        </div> */

        <div>
            <div class='row'>
                <div class='col-md-1'></div>
                <div class='col-md-10'>{showYearLineChart()}</div>
            </div>
            <div class='row'>
                <div class='col-md-1'></div>
                <div class='col-md-10'>{showMonthLineChart()}</div>
            </div>
        </div>
    )
}
