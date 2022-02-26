import React from 'react'
import './HomePage.css';
import ourSolution from '../../images/our-solution.svg';

function HomePage() {

  return (
    <div class='container'>
        <div class='row mt-5'>
            <div class='col-md-6 landing-text'>
                <p class='h1 mt-5 tracking-in-contract-bck-top'>TOO MANY FORMS?</p>
                <p class='h1 mt-5 tracking-in-contract-bck-top-2'>TOO MUCH MANUAL WORK ?</p>
                <p class='h1 mt-5 tracking-in-contract-bck-top-3 '>THIS IS YOU EVERYDAY &rarr;</p>
            </div>
            <div class='col-md-6'>
                  <div class="tenor-gif-embed" data-postid="12504318" data-share-method="host" data-aspect-ratio="1.78" data-width="100%"></div> 
            </div>
        </div>

        <section id="section07" class="demo">
            <a href="#section08"><span></span><span></span><span></span>WE HAVE THE SOLUTION</a>
        </section>
        
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <div class='row mt-5 mb-5' id='section08'>
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
        </div>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </div>
  )
}


export default HomePage;
