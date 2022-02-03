import React from 'react';
import { AwesomeButton } from "react-awesome-button";
import './ProjectDetails.css';
import "react-awesome-button/dist/styles.css";
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import SideMenu from '../SideMenu/SideMenu';

function ProjectDetails({ name, date, totalForms }) {
    const navigate = useNavigate();
    var dateTime = new Date(date);
    const uploadFormPressed = () => {
        navigate(`/project/upload-forms/${name}`);
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
                    {/* <button className="submit__btn me-5" type='submit'>Download Your Data</button> */}
                    {/* <button className="submit__btn" type='submit'>Add More Forms</button> */}
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
                {/* <div class='col-md-3 mt-3'>
                <button className="submit__btn" type='submit'>Add More Forms</button>
            </div> */}


            </div>

            <div class='row'>
                <SideMenu/>
            </div>

        </div>
    )
}

export default ProjectDetails;