import React from 'react'
import './UploadForms.css';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/themes/theme-blue.css";


import multiAxios from '../../../helper/multipart_axios';
const UploadForms = ({ currentCreate }) => {
    let navigate = useNavigate();
    const [forms, setforms] = useState([])
    const [loading, setLoading] = useState(false)

    const onChange = (e) => {
        setforms(e.target.files);
    }

    var projectId = useParams().projectId;
    const onSubmit = async () => {
        if (forms.length == 0) {
            alert("Please add atleast one form");
            return;
        }
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
            <AwesomeButton type="primary" onPress={onSubmit}>{buttonString}</AwesomeButton>
            :
            <AwesomeButton type="disabled">LOADING...</AwesomeButton>
    }

    const successBanner = () => {
        return currentCreate ? <div class="alert mt-3 alert-success alert-dismissible fade show my-5" role="alert">
            <img src='https://cdn-icons.flaticon.com/png/512/5610/premium/5610944.png?token=exp=1645780521~hmac=c290eacdb1397fd7f379ccdb9cd2b25d' width={20} height={20}></img>
            <strong> Project created successfully!</strong> Upload all the forms you want processed.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div> : <div class='mt-5'></div>;
    }

    const skipLaterButton = () => {
        return currentCreate ? <Link to='/'>
            <div class='d-grid mt-2'>
                <AwesomeButton type="primary">ADD FORMS LATER</AwesomeButton>
            </div>
        </Link> : <div></div>
    }

    return (
        <div>
            <div class='container'>
                {successBanner()}
                <div class='row'>
                    <div class='col-md-3'></div>
                    <div class='col-md-6 box'>
                        <div class="mb-3">
                            <label for="bulkForms" class="form-label">Upload Your Forms</label>
                            <input class="form-control form-control-lg" type="file" id="bulkForms" multiple onChange={onChange} accept="image/png, image/jpeg" />
                        </div>
                        <div class="row mt-5">
                            <div class='d-grid'>
                                {button()}
                            </div>
                            {skipLaterButton()}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadForms;