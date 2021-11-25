import React from 'react'
import './SelectFields.css';
import Navbar from '../../Navbar/Navbar';

/* https://stackoverflow.com/questions/42316604/how-to-implement-a-dynamic-form-with-controlled-components-in-reactjs */

const SelectFields = () => {

    var fields = [
        {
            key : 'Name',
            valueType : null,
            isSelected :  false
        },
        {
            key : 'Age',
            valueType : null,
            isSelected :  false
        },
        {
            key : 'Gender',
            valueType : null,
            isSelected :  false
        },
        {
            key : 'Email',
            valueType : null,
            isSelected :  false
        }
    ]

    const createUI = () => {
        return fields.map((el, i)=>
            <div key={i} >
                <div class='row' class='input-group'>
                    <div class='col-md-2'>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                        </div>
                    </div>
                    <div class='col-md-5'>
                        {el.key}
                    </div>
                    <div class='col-md-5'>
                        <select class="form-select" aria-label="Default select example">
                            <option selected>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                </div>
                
            </div>
        )
    }

    return (
        <div>
            <Navbar/>
            <div class='container'>
                <div class='header text-center'>
                    <h1>Project Name Dynamically Render Karna</h1>
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
                                <button className="submit__btn" type='submit'>PREVIOUS</button>
                            </div>
                            <div class='d-grid col-md-6'>
                                <button className="submit__btn" type='submit'>NEXT</button>
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