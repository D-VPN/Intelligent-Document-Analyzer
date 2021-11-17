import React from 'react'
import './Dashboard.css';
import PropTypes from 'prop-types';
import Navbar from '../Navbar/Navbar';
const Dashboard = ({ setToken }) => {
    return (
        <div>
            <Navbar />
            This is a dashboard
        </div>
    )
}

Dashboard.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Dashboard
