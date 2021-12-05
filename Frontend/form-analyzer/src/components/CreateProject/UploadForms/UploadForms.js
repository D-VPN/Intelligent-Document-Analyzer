import React from 'react'
import './UploadForms.css';

const UploadForms = ({ nextStep, values }) => {
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
                                <input class="form-control form-control-lg" type="file" id="bulkForms" multiple />
                            </div>
                        </form>
                        <div class="row mt-5">
                            <div class='d-grid '>
                                <button className="submit__btn" type='submit' onClick={nextStep}>NEXT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadForms;