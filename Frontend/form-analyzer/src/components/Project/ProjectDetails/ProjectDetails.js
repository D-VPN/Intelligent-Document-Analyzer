import React from 'react';

function ProjectDetails({name, date, totalForms}) {
  return (
    <div>
        <div class='row'>
            <div class='col-md-6'>
                <div class='header'>
                    <h1>{name}</h1>
                    <p><small>{totalForms} Forms Added</small></p>
                    <p><small>Project Created On: {date}</small></p>
                </div>
            </div>
            <div class='col-md-6 mt-3'>
                <button className="submit__btn me-5" type='submit'>Download Your Data</button>
                <button className="submit__btn" type='submit'>Add More Forms</button>
            </div>
            {/* <div class='col-md-3 mt-3'>
                <button className="submit__btn" type='submit'>Add More Forms</button>
            </div> */}

        </div>
        
    </div>
  )
}

export default ProjectDetails;