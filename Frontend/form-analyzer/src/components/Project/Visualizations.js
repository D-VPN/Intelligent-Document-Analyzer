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

export default class Visualizations extends React.Component {
    constructor(props) {
        super(props)
        console.log(props);
    }


    render() {
        return (
            <div>
                <div class='container'>
                    <div class='header text-center'>
                        <h1>Your Data Insights</h1>
                        <p><small>5 Forms Added</small></p>
                    </div>
                    <div class='row'>
                        {/* <div class='visualization-box'>
                        Yahape Visualizations Aayenge
                    </div>
                    <div>
                        <canvas id="myChart"></canvas>
                    </div> */}
                        <Bar
                            height={100}
                            width={300}
                            options={{
                                responsive: true,
                            }}
                            data={{
                                labels: ['Male', 'Female'],
                                datasets: [{
                                    label: '# of Employees',
                                    data: [2, 3],
                                    backgroundColor: [

                                    ]
                                }]
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
} 