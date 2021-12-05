import React from 'react'
import './UploadForms.css';
import { useState } from 'react';

import multiAxios from '../../../helper/multipart_axios';
const UploadForms = ({ nextStep, values }) => {
    const [forms, setforms] = useState([])

    const onChange = (e) => {
        setforms(e.target.files);
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("name", values.name);

        for(let idx = 0; idx < forms.length; idx++) {
            formData.append("file" + idx, forms[idx]);
        }
        // formData.append("file", forms);
        // if (forms.length >= 0) {
        //     formData.append("file", forms[0]);
        // }
        try {
            const url = "/upload-forms/";
            const response = await multiAxios.post(url, formData);
            nextStep();
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div class='container'>
                <div class='header text-center'>
                    <h1>{values.name}</h1>
                </div>
                <div class='row'>
                    <div class='col-md-3 '></div>
                    <div class='col-md-6 box'>
                        <form>
                            <div class="mb-3">
                                <label for="bulkForms" class="form-label">Upload Your Forms</label>
                                <input class="form-control form-control-lg" type="file" id="bulkForms" multiple onChange={onChange} accept="image/png, image/jpeg" />

                            </div>
                        </form>
                        <div class="row mt-5">
                            <div class='d-grid '>
                                <button className="submit__btn" type='submit' onClick={onSubmit}>NEXT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadForms;