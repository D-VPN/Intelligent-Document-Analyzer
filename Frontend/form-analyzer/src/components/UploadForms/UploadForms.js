import React from 'react'
import './Visualizations.css';
import Navbar from '../Navbar/Navbar';

const UploadForms = () => {
    return (
        <div>
            <Navbar/>
            <div class='container'>
                <div class='header text-center'>
                    <h1>Project Name Dynamically Render Karna</h1>
                </div>
                <div class='row'>
                    <div class='col-md-3 '></div>
                    <div class='col-md-6 box'>
                        <div class="mb-3">
                            <label for="bulkForms" class="form-label">Upload Your Forms</label>
                            <input class="form-control form-control-lg" type="file" id="bulkForms" multiple/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadForms;