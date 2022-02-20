import React, { useState } from 'react'
import './SelectFields.css';
import axios from '../../../helper/axios';
import { useNavigate } from 'react-router-dom';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/themes/theme-blue.css";


const SelectFields = ({ values, prevStep, setFields, setProjectId }) => {
    let navigate = useNavigate();

    const handleTypeChange = (e, index) => {
        const { fields } = values;
        fields[index].valueType = e.target.value;
        setFields(fields);
    }

    const submit = async () => {
        const url = "/create-project/";
        var error = false;
        const newFields = [];
        values.fields.forEach((value) => {
            if (error) return;
            if (value.valueType === "") {
                alert(`Please select a value type for ${value.key}`)
                error = true;
                return;
            }
            const a = {
                name: value.key,
                valueType: value.valueType,
            }
            newFields.push(a);
        });
        if (error) return;
        const body = {
            name: values.name,
            fields: newFields,
        }

        try {
            const { data } = await axios.post(url, body);
            setProjectId(data);
            navigate(`/create-project/upload-forms/${data}`);
        }
        catch (e) {
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
                        <div class=" mb-3">
                            {createUI()}
                        </div>

                        <div class="row mt-5">
                            <div class='d-grid col-md-6'>
                                <AwesomeButton type="primary" onPress={() => {
                                    prevStep();
                                }}>PREVIOUS</AwesomeButton>
                            </div>
                            <div class='d-grid col-md-6'>
                                <AwesomeButton type="primary" onPress={submit}>CREATE</AwesomeButton>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default SelectFields;