import React, { useState } from 'react'
import './SelectFields.css';
import multiAxios from '../../../helper/multipart_axios';


const SelectFields = ({ nextStep, values, prevStep, setFields, setProjectId }) => {
    const handleTypeChange = (e, index) => {
        const { fields } = values;
        fields[index].valueType = e.target.value;
        setFields(fields);
    }

    const submit = async (e) => {
        e.preventDefault();
        const url = "/create-project/";
        var error = false;
        var isCheckbox = false;
        values.fields.forEach((value) => {
            if (error) return;
            if (value.valueType === "") {
                alert(`Please select a value type for ${value.key}`)
                error = true;
                return;
            }
            if (value.valueType === "Checkbox") isCheckbox = true;
        });
        if (error) return;

        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("fields", JSON.stringify(values.fields));
        if (isCheckbox) {
            formData.append("file", values.file);
        }
        try {
            const { data } = await multiAxios.post(url, formData);
            console.log(data);
            setProjectId(data);
            nextStep();
        }
        catch (e) {
            console.log(e);
        }
    }

    const createUI = () => {
        return values.fields.map((el, i) =>
            <div key={i} >
                <div class='row' class='input-group'>
                    <div class='col-md-5'>
                        {el.key}
                    </div>
                    <div class='col-md-5'>
                        <select value={el.valueType} onChange={(e) => handleTypeChange(e, i)} class="form-select" aria-label="Default select example">
                            <option selected>Open this select menu</option>
                            <option value="Text">Text</option>
                            <option value="Number">Number</option>
                            <option value="Date">Date</option>
                            <option value="Checkbox">Checkbox</option>
                            <option value="Sentiment">Sentiment</option>
                        </select>
                    </div>
                </div>

            </div>
        )
    }



    return (
        <div>
            <div class='container'>
                <div class='header text-center'>
                    <h1>{values.name}</h1>
                    <p><small>Choose Data Type Of Each Field</small></p>
                </div>

                <div class='form-container row'>
                    <div class='col-md-3'></div>
                    <div class='col-md-6'>
                        <form>
                            <div class=" mb-3">
                                {createUI()}
                            </div>


                            <div class="row mt-5">
                                <div class='d-grid col-md-6'>
                                    <button className="submit__btn" type='submit' onClick={(e) => {
                                        e.preventDefault();
                                        prevStep();
                                    }} >PREVIOUS</button>
                                </div>
                                <div class='d-grid col-md-6'>
                                    <button className="submit__btn" type='submit' onClick={submit}>CREATE</button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default SelectFields;