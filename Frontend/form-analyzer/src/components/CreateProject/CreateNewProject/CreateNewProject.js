import React from 'react'
import './CreateNewProject.css';
import multiAxios from '../../../helper/multipart_axios';
import { useState } from 'react';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/themes/theme-blue.css";

const CreateNewProject = ({ nextStep, values, handleChange, onFileChange, setFields, setIsHandwritten }) => {
    const [loading, setloading] = useState(false)
    const Continue = e => {
        e.preventDefault();
        const { name, file } = values;
        submit(file);
    }

    const submit = async (file) => {
        setloading(true);
        const data = new FormData();
        data.append('file', file);

        try {
            const form = "/extract-keys/";
            const response = await multiAxios.post(form, data);
            const fields = [];
            response.data.forEach((value) => {
                const ob = {
                    key: value,
                    valueType: "",
                };
                fields.push(ob);
            });
            setFields(fields);
            setloading(false)
            nextStep();
        }
        catch (error) {
            setloading(false)
        }
    }

    const onChange = (e) => {
        onFileChange(e.target.files[0]);
    }

    const checkboxChange = (e) => {
        setIsHandwritten(e.target.checked)
    }

    const button = () => {
        return !loading ?
            <AwesomeButton type="primary">NEXT</AwesomeButton>
            :
            <AwesomeButton type="disabled">LOADING...</AwesomeButton>
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
                                <input type="text" class="form-control" id="floatingInput" placeholder="My Project" value={values.name} onChange={handleChange('name')} required />
                            </div>
                            <div class="upload">
                                <input type="file" accept="image/png, image/jpeg" class="form-control" id="floatingPassword" placeholder="Password" onChange={(e) => onChange(e)} required />
                                <label for="floatingPassword">Upload Template Form</label>
                            </div>
                            <div class="form-check mt-4">
                                <input class="form-check-input" type="checkbox" checked={values.isHandwritten} id="flexCheckDefault" onChange={(e) => checkboxChange(e)} />
                                Forms contain handwritten data
                            </div>
                            <div class="d-grid gap-2 mt-5">
                                {button()}
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CreateNewProject