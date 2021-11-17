import React, { useState } from 'react'
import PropTypes from 'prop-types';
import './Login.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import login from '../../images/login.jpg';
import NavbarLR from '../Navbar/NavbarLR';

const Login = ({ setToken }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const onLogin = async (e) => {
        e.preventDefault();
        setError("");
        if (email.length === 0) {
            setError("Email is required");
            return;
        }
        else if (password.length === 0) {
            setError("Password is required");
            return;
        }
        const url = "http://127.0.0.1:8000/auth/token/login";
        await axios.post(url, {
            email: email,
            password: password,
        },
            {
                'Content-Type': 'application/json',
            }
        ).then((response) => {
            console.log(response);
            if (response.data.status === 200) {
                // Yaha phir dashboard me navigate karna hai
            }
        }).catch((error) => {
            if (error.response) {
                if (error.response.data.email) {
                    setError(error.response.data.email[0]);
                }
                else if (error.response.data.password) {
                    setError(error.response.data.password[0]);
                }
                else if (error.response.data.non_field_errors) {
                    setError(error.response.data.non_field_errors[0]);

                }
            }
        });
    }
    const showError = () => {
        if (error.length > 0)
            return (
                <h4 style={{ color: "red" }}>{error}</h4>
            )
    }
    return (
        <div>
            <NavbarLR></NavbarLR>
            <div className='container login-container'>
            
            <h1 className='text-center login-header'>LOGIN</h1>
            <div className='row login-row'>
                <div className='col-md-6'>
                    <img src={login} alt="Logo" style={{height:"90%", width:"100%"}}  className='img-fluid' />
                </div>
                <div className='col-md-6'>
                    <form onSubmit={(e) => onLogin(e)}>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email:</label>
                            <input 
                                type="email" 
                                class="form-control" 
                                id="email" 
                                placeholder="name@example.com"
                                value={email} onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div class="mb-3">
                            <label for="pw" class="form-label">Password:</label>
                            <input 
                                type="password" 
                                class="form-control" 
                                id="pw"
                                value={password} onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {showError()}
                        <div class='d-grid gap-2 '>
                            <button class='btn btn-primary' type='submit'>Submit</button>
                            <button class='btn btn-primary' type='submit'>Don't Have An Account? Register</button>
                        </div>
                    </form>
                    
                </div>
            </div>
        </div>
        </div>
        
        
        /* <div className="login">
            <form className="login__form" onSubmit={(e) => onLogin(e)}>
                <h1>
                    Login Here
                </h1>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {showError()}
                <button type="submit" className="submit__btn">Submit</button>

            </form>

        </div> */
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login
