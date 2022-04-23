import React from 'react'
import './HomePage.css';
import homeImage from '../../images/home.jpg';
import uiIMage from '../../images/ui.png';
import { useNavigate } from 'react-router-dom';



function HomePage() {
    const navigate = useNavigate();
    const goToRegister = () => {
        navigate("/registration", { replace: false });
    }

    return (
        <div>
            <div class="container">
                <div class='row mt-5 mb-5 py-5'>
                    <div class='col-md-6 landing-text'>
                        <h1 class='display-4 mt-3 pt-5 tracking-in-contract-bck-top'>Tired of manually entering data from documents?</h1>
                        <p class='mt-3 text-muted'>Form Analyzer is a complete end-to-end tool to process, store and visualize scanned documents.</p>
                        <button class="home_btn" onClick={() => goToRegister()}>Get Started</button>
                    </div>
                    <div class='col-md-6'>
                        <img class="mt-3" src={homeImage} style={{ height: "90%", width: "100%" }} />
                    </div>
                </div>
            </div>

            <div class="container pb-5">
                <div class='row bg-light our-solution-points my-5 text-center p-5' id='section08'>
                    <h3 class='display-5 mb-5 mt-3 text-center'>How Form Analyzer Works?</h3>
                    <div class="row" style={{ margin: "auto" }}>
                        <div class='col-md-3'>
                            <div class="card shadow p-4" style={{ width: "15rem" }}>
                                <i class="icofont-file-document icofont-5x" ></i><br />
                                <div>Takes Forms As Input</div>
                            </div>
                        </div>
                        <div class='col-md-3'>
                            <div class="card shadow p-4" style={{ width: "15rem" }}>
                                <i class="icofont-chart-flow-1 icofont-5x"></i><br />
                                <div>Breaks The Form Into Fields</div>
                            </div>
                        </div>
                        <div class='col-md-3'>
                            <div class="card shadow p-4" style={{ width: "15rem" }}>
                                <i class="icofont-data icofont-5x"></i><br />
                                <div>Extracts The Data</div>
                            </div>
                        </div>
                        <div class='col-md-3'>
                            <div class="card shadow p-4" style={{ width: "15rem" }}>
                                <i class="icofont-chart-pie icofont-5x"></i><br />
                                <div>Shows Visualizations</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container">
                <div class="row py-5">
                    <div class="col-md-7">
                        <img class="mt-3 shadow text-center" src={uiIMage} style={{ margin: "auto", height: "620px", width: "700px", borderRadius: "3%" }} />
                    </div>
                    <div class="col-md-5 data px-5">
                        <h3 class="display-5">Data Visualization</h3>
                        <p class='mt-3 text-muted'>See all types of visualizations related to your data at one place.</p>
                        <button onClick={(e) => goToRegister()} class="home_btn">Create Your First Project</button>
                    </div>
                </div>
            </div>


        </div >

    )
}


export default HomePage;
