import React from 'react'
import './HomePage.css';
import { AwesomeButton } from "react-awesome-button";
import { useNavigate } from 'react-router-dom';



function HomePage() {
    const navigate = useNavigate();

    const goToLoginIn = () => {
        navigate("/login", { replace: false });
    }
    const goToRegister = () => {
        navigate("/registration", { replace: false });
    }

  return (
    <div class='container'>
        <div class='row mt-5'>
            <div class='col-md-6 landing-text'>
                <p class='h1 mt-5 tracking-in-contract-bck-top'>TOO MANY FORMS?</p>
                <p class='h1 mt-5 tracking-in-contract-bck-top-2'>TOO MUCH MANUAL WORK ?</p>
                <p class='h1 mt-5 tracking-in-contract-bck-top-3 '>THIS IS YOU EVERYDAY &rarr;</p>
                <div class=''>
                    <AwesomeButton style={{ "margin-right": "50px", "margin-top":"10px" }} type="primary" onPress={(e) => goToRegister()}>REGISTER</AwesomeButton>
                    <AwesomeButton style={{ "margin-top":"10px" }} type="primary" onPress={(e) => goToLoginIn()}>LOG IN</AwesomeButton>
                </div>

            </div>
            <div class='col-md-6'>
                  <div class="tenor-gif-embed" data-postid="12504318" data-share-method="host" data-aspect-ratio="1.78" data-width="100%"></div> 
            </div>
        </div>

        <section id="section07" class="demo d-md-block d-none">
            <a href="#section08"><span></span><span></span><span></span>WE HAVE THE SOLUTION</a>
        </section>
        
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        {/* <div class='row mt-5 mb-5' id='section08'>
            <div class='col-md-6'>
                <img src={ourSolution} alt="our solution" width="100%"/>
            </div>
            <div class='col-md-6 landing-text '>
                <p class='h1 mt-5 text-center'>FORM ANALYZER</p>
                <div class='our-solution-points'>
                    <ul class='mt-5'>
                        <li class='pb-3'>We Take Your Forms</li>
                        <li class='pb-3'>Break Them Down</li>
                        <li class='pb-3'>Extract The Data</li>
                        <li class='pb-3'>Visualize The Data</li>
                    </ul>
                </div>
            </div>
        </div> */}

        <div class='row our-solution-points mt-5 mb-5 text-center' id='section08'>
            <p class='h1 mb-5 text-center'>FORM ANALYZER</p>
            <div class='col-md-3 col-sm-12'>
                <i class="icofont-file-document icofont-5x"></i><br/>
                <div>We Take Your Forms</div>
            </div>
            <div class='col-md-3 col-sm-12'>
                <i class="icofont-chart-flow-1 icofont-5x"></i><br/>
                <div>Break Them Down</div>
            </div>
            <div class='col-md-3 col-sm-12'>
                <i class="icofont-data icofont-5x"></i><br/>
                <div>Extract The Data</div>
            </div>
            <div class='col-md-3 col-sm-12'>
                <i class="icofont-chart-pie icofont-5x"></i><br/>
                <div>Visualize The Data</div>
            </div>
        </div>
        {/* <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/> */}
    </div>
    
  )
}


export default HomePage;
