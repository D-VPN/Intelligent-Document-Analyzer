import React from 'react';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/themes/theme-blue.css";
import { useNavigate } from 'react-router-dom';
import './ProjectDetails.css';
import moment from 'moment';

function ProjectDetails({ projectId, name, date, totalForms }) {
    const navigate = useNavigate();
    var dateTime = new Date(date);
    const uploadFormPressed = () => {
        navigate(`/project/upload-forms/${projectId}`);
    }
    return (
        <div>
            <div class='row'>
                <div class='col-md-6'>
                    <div class='header'>
                        <h1>{name}</h1>
                        <p><small>{totalForms} Forms Added</small></p>
                        <p><small>Project Created On: {moment(dateTime).format('DD/MM/YYYY')}</small></p>
                    </div>
                </div>
                <div class="col-md-2">

                </div>
                <div class='col-md-4 mt-3'>
                    <AwesomeButton type="primary" style={{ "margin": "10px", }}>
                        Download Your Data
                    </AwesomeButton>
                    <AwesomeButton
                        type="primary"
                        style={{ "margin": "10px", }}
                        onPress={() => {
                            uploadFormPressed();
                        }}
                    >
                        Add More Forms
                    </AwesomeButton>
                </div>
            </div>



        </div>
    )
}

export default ProjectDetails;