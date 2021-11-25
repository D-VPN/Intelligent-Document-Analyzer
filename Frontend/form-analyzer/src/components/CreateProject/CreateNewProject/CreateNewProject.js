import React from 'react'
import NavbarLR from '../../Navbar/NavbarLR';

const CreateNewProject = () => {
    return (
        <div>
            <NavbarLR/>
            <div class='container'>
                <div class='header'>
                    <h1>Create New Project</h1>
                </div>
                <div>
                    <form>
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="floatingInput" placeholder="My Project"/>
                            <label for="floatingInput">Project Name</label>
                        </div>
                        <div class="form">
                            <input type="file" class="form-control" id="floatingPassword" placeholder="Password"/>
                            <label for="floatingPassword">Upload Template Form</label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateNewProject