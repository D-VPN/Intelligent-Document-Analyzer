import React, { useState, useEffect } from 'react'
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
import axios from '../../helper/axios';
import { useParams } from 'react-router-dom';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Visualizations = () => {
    const [loading, setLoading] = useState(true)
    const [project, setProject] = useState({
        name: null,
        createdAt: null,
        formNumber: null,
        keys: [],
    });
    var projectId = useParams().projectId;

    useEffect(async () => {
        try {
            const { data } = await axios.post('/project-dashboard/', {
                project_id: projectId,
            });
            setProject(prevState => ({
                ...prevState,
                name: data.name,
                createdAt: new Date(data.created_at),
                formNumber: data.number_of_forms,
                keys: data.keys,
            }));
            setLoading(false);
        } catch (e) {
            console.error(e);
        }
    }, []);
    console.log(project);
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
    )
}

export default Visualizations;