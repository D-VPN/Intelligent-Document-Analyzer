import './Visualizations.css';
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
import axios from '../../../helper/axios';
import { useParams } from 'react-router-dom';
import ReactLoading from 'react-loading';
import ProjectDetails from '../ProjectDetails/ProjectDetails';
import SideMenu from '../SideMenu/SideMenu';

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
    const [currentKey, setCurrentKey] = useState("");
    var projectId = useParams().projectId;

    useEffect(async () => {
        try {
            const { data } = await axios.post('/project-dashboard/', {
                project_id: projectId,
            });
            setProject(prevState => ({
                ...prevState,
                name: data.name,
                createdAt: data.created_at,
                formNumber: data.number_of_forms,
                keys: data.keys,
            }));
            if (data.keys.length >= 0) {
                setCurrentKey(data.keys[0]);
            }
            setLoading(false);
        } catch (e) {
            console.error(e);
        }
    }, []);

    return (
        loading ?
            <div className='loader'>
                <ReactLoading type='bars' color='#0d6efd'></ReactLoading>
            </div>
            :
            <div>
                <div class='row'>
                    <ProjectDetails name={project.name} date={project.createdAt} totalForms={project.formNumber} />
                    <SideMenu keys={project.keys} currentKey={currentKey} setCurrentKey={setCurrentKey} />
                </div>
            </div>
    )
}

export default Visualizations;