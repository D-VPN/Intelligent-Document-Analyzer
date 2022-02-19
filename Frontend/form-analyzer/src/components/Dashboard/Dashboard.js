import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from '../../helper/axios';
import add from '../../images/add2.png';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/themes/theme-blue.css";

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
      const createdAt = dateDiffInDays(el.created_at, today);
      var dateString = "", begin = `Created ${createdAt} `;
      if (createdAt == 0) {
        dateString = "Created today";
      } else {
        if (createdAt == 1) dateString = begin + "day ago";
        else dateString = begin + "days ago";
      }
      return <div key={el.project_id} class="col-md-4 mt-4">
        <div class="card shadow" style={{ width: '18rem' }}>
          <div class="card-body p-4">
            <h5 class="card-title">{el.name}</h5>
            <div class="text-muted"> {dateString} </div>
            <Link to={`/project/visualization/${el.project_id}`}>
              <div class="mt-5">
              <AwesomeButton type="link">View Project</AwesomeButton>
              </div>
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
          <div class="col-md-4 mt-4">
            <Link to="/create">
            <div class="card shadow" style={{ width: '18rem' }}>
              <img src={add} class="card-img card-img-top mt-3" style={{width: "35%", height: "35%"}}/>
              <div class="card-body">
                <p class="card-text text-center">
                  CREATE NEW PROJECT
                </p>
              </div>
            </div>
            </Link>
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
