import React from 'react';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/themes/theme-blue.css";
import { useNavigate } from 'react-router-dom';
import './ProjectDetails.css';
import axios from '../../../helper/content_axios';
import moment from 'moment';
import DeleteProjectButton from './DeleteProjectButton/DeleteProjectButton';

var fileDownload = require('js-file-download');

function ProjectDetails({ projectId, name, date, totalForms, setLoading }) {
    const navigate = useNavigate();
    var dateTime = new Date(date);
    const uploadFormPressed = () => {
        navigate(`/project/upload-forms/${projectId}`);
    }

    const downloadCsvData = async () => {
        try {
            const res = await axios.post('/export-data/', {
                project_id: projectId,
                responseType: "blob",
            });
            fileDownload(res.data, `${name}` + ".csv");
        } catch (e) {

        }
    }
    return (
        <div class="mt-4">
            <div class='row'>
                <div class='col-md-6'>
                    <div class='header'>
                        <h1>{name} <AwesomeButton
                            type="primary"
                            style={{ "margin": "10px", }}
                            onPress={() => {
                                uploadFormPressed();
                            }}
                        >
                            Add More Forms
                        </AwesomeButton></h1>
                        <p><span class="badge bg-primary">{totalForms} forms</span> | Project created on {moment(dateTime).format('DD/MM/YYYY')}</p>

                    </div>
                </div>
                <div class="col-md-2">

                </div>
                <div class='col-md-4 mt-3'>
                    <AwesomeButton type="primary" style={{ "margin": "10px", }}
                        onPress={() => {
                            downloadCsvData();
                        }
                        }>
                        Download Your Data
                    </AwesomeButton>

                    <DeleteProjectButton projectId={projectId} setLoading={setLoading} />

                </div>
            </div>



        </div>
    )
}

export default ProjectDetails;