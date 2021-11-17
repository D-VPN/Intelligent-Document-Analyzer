import React from 'react'
import './Dashboard.css';
import PropTypes from 'prop-types';
import Navbar from '../Navbar/Navbar';
const Dashboard = ({ setToken }) => {
    return (
        <div>
            <Navbar />
            <div class='body'>
                <div class='row'>
                    <div class='col-md-4'>
                        <div class="card shadow text-center" style={{width: "18rem"}}>
                            <div class="card-body">
                                <h5 class="card-header">Have a New Form?</h5>
                                <div class='card-textarea'>
                                    <a href='#' class=' card-link'><p class="card-text">CREATE PROJECT</p></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-4'>
                        <div class="card shadow text-center" style={{width: "18rem"}}>
                            <div class="card-body">
                                <h5 class="card-header">PRODUCT SURVEY</h5>
                                <h6 class="card-subtitle mb-2 text-muted">Created 4 days ago...</h6>
                                <div class='card-textarea'>
                                    <button class='btn btn-primary'>View Project</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

Dashboard.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Dashboard
