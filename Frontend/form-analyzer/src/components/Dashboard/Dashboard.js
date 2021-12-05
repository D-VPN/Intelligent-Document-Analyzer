import React from 'react'
// import './Dashboard.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const Dashboard = ({ setToken }) => {

    var projects = [
        {
            name : 'Product Survey',
            days : 1
        },
        {
            name : 'Employee Feedback',
            days : 2
        },
        {
            name : 'Employee Resignation',
            days :  4
        },
        {
            name : 'Product Survey',
            days : 7
        }
    ]
        
    

    const createDashboardUI = () => {
        return projects.map((el, i) => 
            <div key={i} class="col-lg-4 d-flex align-items-stretch mt-5">
                <div class="card shadow" style={{ width: "18rem" }}>
                    <div class="card-body p-4">
                        <h5 class="card-title">{el.name}</h5>
                        <div class="text-muted"> Created {el.days} days ago </div>
                        <a href="#" class="btn btn-primary mt-5">View Project</a>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div class='container'>
                <div class='row mt-5'>
                    <div class="col-md-4 d-flex ">
                        <div class="card shadow" style={{ width: "18rem" }}>
                            <Link to="/create">
                                <div class="card-body p-4" >
                                    <i class="fa fa-plus" style={{ fontSize: "60px", position: "absolute", bottom: "50%", left: "40%" }}></i>
                                    <h5 class="card-title" style={{ position: "absolute", bottom: "10%", left: "20%" }}>Create New Project</h5>
                                </div>
                            </Link>
                        </div>
                    </div>
                    {createDashboardUI()}
                </div>
            </div>

        </div >
    )
}

Dashboard.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Dashboard
