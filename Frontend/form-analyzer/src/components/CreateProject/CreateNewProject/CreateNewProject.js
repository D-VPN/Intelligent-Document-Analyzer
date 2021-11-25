import React from 'react'
import Navbar from '../../Navbar/Navbar';
import './CreateNewProject.css';

const CreateNewProject = () => {
    return (
        <div>
            <Navbar/>
            <div class='container'>
                <div class='header text-center'>
                    <h1>Create New Project</h1>
                </div>
                <div class='form-container row'>
                    <div class='col-md-3'></div>
                    <div class='col-md-6'>
                    <form>
                        <div class=" mb-3">
                            <label for="floatingInput">Project Name</label>
                            <input type="text" class="form-control" id="floatingInput" placeholder="My Project"/>
                        </div>
                        <div class="upload">
                            <input type="file" accept="image/png, image/jpeg" class="form-control" id="floatingPassword" placeholder="Password"/>
                            <label for="floatingPassword">Upload Template Form</label>
                        </div>
                        <div class="d-grid gap-2 mt-5">
                            <button className="submit__btn" type='submit'>NEXT</button>
                        </div>
                    </form>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default CreateNewProject