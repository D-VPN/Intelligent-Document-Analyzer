import React, { useState, useEffect } from 'react';
// import './Dashboard.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from '../../helper/axios';
const Dashboard = ({ setToken }) => {
  const [projects, setProjects] = useState([]);

  useEffect(async () => {
    try {
      const { data } = await axios.get('/get-projects/');
      for (var i in data) {
        data[i]["created_at"] = new Date(data[i]["created_at"]);
      }
      setProjects(data);
    } catch (e) {
      console.error(e);
    }
  }, []);

  function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  const createDashboardUI = () => {
    let today = new Date();
    return projects.map((el, i) => {
      const createdAt = dateDiffInDays(today, el.created_at);
      var dateString = "";
      if (createdAt == 0) {
        dateString = "Created today";
      } else {
        dateString = `Create ${createdAt} days ago`;
      }
      return <div key={el.project_id} class="col-lg-4 d-flex align-items-stretch mt-4">
        <div class="card shadow" style={{ width: '18rem' }}>
          <div class="card-body p-4">
            <h5 class="card-title">{el.name}</h5>
            <div class="text-muted"> {dateString} </div>
            <Link to="/project/visualization" props={{ name: "Darshan" }}>
              <a href="#" class="btn btn-primary mt-5">
                View Project
              </a>
            </Link>
          </div>
        </div>
      </div>
    }
    );
  };

  return (
    <div>
      <div class="container">
        <div class="row mt-5">
          <div class="col-lg-4 d-flex align-items-stretch mt-4">
            <div class="card shadow" style={{ width: '18rem' }}>
              <Link to="/create">
                <div class="card-body p-4">
                  <i
                    class="fa fa-plus"
                    style={{
                      fontSize: '60px',
                      position: 'absolute',
                      bottom: '50%',
                      left: '40%',
                    }}
                  ></i>
                  <h5
                    class="card-title"
                    style={{ position: 'absolute', bottom: '10%', left: '20%' }}
                  >
                    Create New Project
                  </h5>
                </div>
              </Link>
            </div>
          </div>
          {createDashboardUI()}
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Dashboard;
