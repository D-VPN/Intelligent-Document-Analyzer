import React, { useEffect, useState } from 'react'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SentimentKeyVisualization({ values }) {
    const [doughnutChartData, setDoughnutChartData] = useState({
        labels: ["Positive", "Negative"],
        data: [],
        colors: [],
        positive: [],
        negative: [],
    });

    useEffect(() => {
        var data = []
        var colors = []
        for (let i = 0; i < 2; i++) {
            data.push(values[i].data.length)
            colors.push(defaultColors[i])
        }
        var positive = [];
        for (let i = 0; i < values[0].data.length; i++) {
            const obj = {
                sentiment: values[0].sentiment[i],
                data: values[0].data[i]
            }
            positive.push(obj)
        }
        positive.sort((a, b) => b.sentiment - a.sentiment);

        var negative = [];
        for (let i = 0; i < values[1].data.length; i++) {
            const obj = {
                sentiment: values[1].sentiment[i],
                data: values[1].data[i]
            }
            negative.push(obj)
        }
        negative.sort((a, b) => b.sentiment - a.sentiment);
        setDoughnutChartData(prevState => {
            return {
                ...prevState,
                data: data,
                colors: colors,
                positive: positive,
                negative: negative,
            }
        })
    }, [])

    const showDoughnutChart = () => {
        const chartData = {
            labels: doughnutChartData.labels,
            datasets: [
                {
                    label: "Sentiment",
                    data: doughnutChartData.data,
                    backgroundColor: doughnutChartData.colors,
                },
            ],
        }
        return <Doughnut data={chartData} />;
    }

    const createTable = (typeOfSentence, list, numOfSentences) => {
        return (
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">Level</th>
                        <th scope="col">Top {numOfSentences} {typeOfSentence} Sentences</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((item, ix) => {
                            return (
                                <tr key={ix}>
                                    <th scope='row'>{item.sentiment}</th>
                                    <td>{item.data}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    }

    const showTopPositive = () => {
        let limit = doughnutChartData.positive.length < 10 ? doughnutChartData.positive.length : 10;
        const list = []
        for (let i = 0; i < limit; i++) {
            list.push(doughnutChartData.positive[i])
        }
        return createTable('Positive', list, limit);
    }
    const showTopNegative = () => {
        let limit = doughnutChartData.negative.length < 10 ? doughnutChartData.negative.length : 10;
        const list = []
        for (let i = 0; i < limit; i++) {
            list.push(doughnutChartData.negative[i])
        }
        return createTable('Negative', list, limit);
    }

    const defaultColors = [
        "#1aff1a",
        "#ff1a1a",
        "#666666",
    ]

    return (
        <div>
            <div class='row'>
                <div class='col-md-2'></div>
                <div class='col-md-7'>{showDoughnutChart()}</div>
            </div>
            {/* <div class='row'>
                <div class='col-md-6'>{showTopPositive()}</div>
                <div class='col-md-6'>{showTopNegative()}</div>
            </div> */}
        </div>
    )
}
