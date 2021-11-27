import React from 'react'
// import './Dashboard.css';
import PropTypes from 'prop-types';
import Navbar from '../Navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
const Dashboard = ({ setToken }) => {
    const navigate = useNavigate();
    const logout = () => {
        setToken();
        navigate("/login", { replace: true });
    }
    return (
        <div>
            <div class='container'>
                <div class='row mt-5'>
                    <div class="col-lg-4 d-flex align-items-stretch">
                        <Link to="/create">
                            <div class="card shadow d-flex" style={{ width: "18rem" }}>
                                <div class="card-body p-4" >
                                    <i class="fa fa-plus" style={{ fontSize: "60px", position: "absolute", bottom: "50%", left: "40%" }}></i>
                                    <h5 class="card-title" style={{ position: "absolute", bottom: "10%", left: "20%" }}>Create New Project</h5>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div class="col-lg-4 d-flex align-items-stretch">
                        <div class="card shadow" style={{ width: "18rem" }}>
                            <div class="card-body p-4">
                                <h5 class="card-title">Product Survey </h5>
                                <div class="text-muted"> Created 2 days ago </div>
                                <a href="#" class="btn btn-primary mt-5">View Project</a>
                            </div>
                        </div>
                    </div>
                    {/* <div class='col-md-4'>
                        <div class="card shadow text-center" style={{ width: "18rem" }}>
                            <div class="card-body">
                                <h5 class="card-header">Have a New Form?</h5>
                                <div class='card-textarea'>
                                    <a href='#' class=' card-link'><p class="card-text">CREATE PROJECT</p></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-4'>
                        <div class="card shadow text-center" style={{ width: "18rem" }}>
                            <div class="card-body">
                                <h5 class="card-header">PRODUCT SURVEY</h5>
                                <h6 class="card-subtitle mb-2 text-muted">Created 4 days ago...</h6>
                                <div class='card-textarea'>
                                    <button class='btn btn-primary'>View Project</button>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>

        </div >
    )
}

Dashboard.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Dashboard
