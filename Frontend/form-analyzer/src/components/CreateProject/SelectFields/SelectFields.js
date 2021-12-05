import React from 'react'
import './SelectFields.css';
import axios from '../../../helper/axios';


const SelectFields = ({ nextStep, values, prevStep, setFields, setProjectId }) => {
    const checkboxChange = (e, index) => {
        const { fields } = values;
        fields[index].isSelected = e.target.checked;
        setFields(fields);
    }

    const handleTypeChange = (e, index) => {
        const { fields } = values;
        fields[index].valueType = e.target.value;
        setFields(fields);
    }

    const submit = async (e) => {
        e.preventDefault();
        const url = "/create-project/";
        const newFields = [];
        values.fields.forEach((value) => {
            if (value.isSelected) {
                if (value.valueType === "") {
                    return;
                }
                const a = {
                    name: value.key,
                    valueType: value.valueType,
                }
                newFields.push(a);
            }
        });
        const body = {
            name: values.name,
            fields: newFields,
        }
        try {
            const { data } = await axios.post(url, body);
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
                    <div class='col-md-2'>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" checked={el.isSelected} id="flexCheckDefault" onChange={(e) => checkboxChange(e, i)} />
                        </div>
                    </div>
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
                    <h1>Project Name</h1>
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