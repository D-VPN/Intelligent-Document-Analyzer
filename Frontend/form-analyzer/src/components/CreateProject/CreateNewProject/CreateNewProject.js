import React from 'react'
import './CreateNewProject.css';

const CreateNewProject = ({ nextStep, values, handleChange, onFileChange }) => {
    const Continue = e => {
        e.preventDefault();
        const { name, file } = values;
        if (name.length === 0) {
            alert("Project name is required");
            return;
        }
        else if (!file) {
            alert("Select a form template");
            return;
        }

        nextStep();
    }
    const onChange = (e) => {
        console.log(e.target.files);
        onFileChange(e.target.files[0]);
    }


    return (
        <div>
            <div class='container'>
                <div class='header text-center'>
                    <h1>Create New Project</h1>
                </div>
                <div class='form-container row'>
                    <div class='col-md-3'></div>
                    <div class='col-md-6'>
                        <form onSubmit={(e) => Continue(e)}>
                            <div class=" mb-3">
                                <label for="floatingInput">Project Name</label>
                                <input type="text" class="form-control" id="floatingInput" placeholder="My Project" value={values.name} onChange={handleChange('name')} />
                            </div>
                            <div class="upload">
                                <input type="file" accept="image/png, image/jpeg" class="form-control" id="floatingPassword" placeholder="Password" onChange={(e) => onChange(e)} />
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