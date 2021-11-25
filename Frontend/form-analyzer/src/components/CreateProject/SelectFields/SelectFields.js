import React from 'react'
import './SelectFields.css';
import Navbar from '../../Navbar/Navbar';

/* https://stackoverflow.com/questions/42316604/how-to-implement-a-dynamic-form-with-controlled-components-in-reactjs */

import React, { Component } from 'react'

class SelectFields extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            
        }
    }

    createUI(){
        return this.state.fields.map((keyName, i) =>(
            <div key={i}>
                <select class="form-select" aria-label="Default select example">
                    <option selected>Open this select menu</option>
                    <option value="text">String</option>
                    <option value="int">Int</option>
                    <option value="long-int">Long Int</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="radio">Radio</option>
                </select>
            </div>
        ))
    }
    
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default SelectFields;

const SelectFields = () => {
    return (
        <div>
            <Navbar/>
            <div class='container'>
                <div class='header'>
                    <h1>Project Name Dynamically Render Karna</h1>
                    <p><small>Choose Data Type Of Each Field</small></p>
                </div>
                
                <div class='form-container row'>
                    <div class='col-md-3'></div>
                    <div class='col-md-6'>
                    <form>
                        <div class=" mb-3">
                            <label for="floatingInput">Project Name</label>
                            <input type="text" class="form-control" id="floatingInput" placeholder="My Project"/>
                        </div>
                        <div class="upload">
                            <input type="file" accept="image/png, image/jpeg" class="form-control" id="floatingPassword" placeholder="Password"/>
                            <label for="floatingPassword">Upload Template Form</label>
                        </div>
                        <div class="d-grid gap-2 mt-5">
                            <button className="submit__btn" type='submit'>NEXT</button>
                        </div>
                    </form>
                    </div>
                    
                </div>

            </div>
            
        </div>
    )
}

export default SelectFields;