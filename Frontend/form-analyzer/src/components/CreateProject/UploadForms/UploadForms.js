import React from 'react'
import './UploadForms.css';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


import multiAxios from '../../../helper/multipart_axios';
const UploadForms = ({ currentCreate }) => {
    let navigate = useNavigate();
    const [forms, setforms] = useState([])
    const [loading, setLoading] = useState(false)

    const onChange = (e) => {
        setforms(e.target.files);
    }
    var projectId = useParams().projectId;
    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const formData = new FormData();

        formData.append("project_id", projectId);

        for (let idx = 0; idx < forms.length; idx++) {
            formData.append("file" + idx, forms[idx]);
        }
        try {
            const url = "/upload-forms/";
            const response = await multiAxios.post(url, formData);
            setLoading(false);
            if (currentCreate) {
                navigate("/");
            } else {
                navigate(-1);
            }

        }
        catch (error) {
            setLoading(false);
        }
    }
    const button = () => {
        var buttonString = currentCreate ? "NEXT" : "SUBMIT";
        return !loading ?
            <button className="submit__btn" type='submit' onClick={onSubmit}>{buttonString}</button>
            :
            <button disabled={true} className="submit__btn" type='submit'>LOADING...</button>
    }

    const successBanner = () => {
        return currentCreate ? <div class="alert mt-3 alert-success alert-dismissible fade show" role="alert">
            <strong>PROJECT CREATED SUCCESSFULLY.</strong> Upload All The Forms You Want Processed.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div> : <div></div>;
    }

    return (
        <div>
            <div class='container'>
                {successBanner()}
                <div class='row'>
                    <div class='col-md-3'></div>
                    <div class='col-md-6 box'>
                        <form>
                            <div class="mb-3">
                                <label for="bulkForms" class="form-label">Upload Your Forms</label>
                                <input class="form-control form-control-lg" type="file" id="bulkForms" multiple onChange={onChange} accept="image/png, image/jpeg" />
                            </div>
                        </form>
                        <div class="row mt-5">
                            <div class='d-grid'>
                                {button()}
                            </div>
                            <Link to='/'>
                                <div class='d-grid'>
                                    <button className="submit__btn">ADD FORMS LATER</button>
                                </div>
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadForms;