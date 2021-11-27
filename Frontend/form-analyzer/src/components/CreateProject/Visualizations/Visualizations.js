import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
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

const Visualizations = ({ values }) => {
    return (
        <div>
            <div class='container'>
                <div class='header text-center'>
                    <h1>Your Data Insights</h1>
                    <p><small>69 Forms Added</small></p>
                </div>
                <div class='row'>
                    {/* <div class='visualization-box'>
                        Yahape Visualizations Aayenge
                    </div>
                    <div>
                        <canvas id="myChart"></canvas>
                    </div> */}
                    <Bar
                        height = {100}
                        width = {300}
                        options ={{
                            responsive: true,
                        }}
                        data = {{
                            labels : ['Male','Female'],
                            datasets: [{
                                label: '# of Employees',
                                data: [50, 80],
                                backgroundColor:[

                                ]
                            }]
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Visualizations;