import React, { useState } from 'react'
import PropTypes from 'prop-types';
import './Login.css';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import login from '../../images/login-image.png';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/themes/theme-blue.css";


const Login = ({ setToken }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()
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
        try {
            const response = await axios.post(url, {
                email: email,
                password: password,
            },
                {
                    'Content-Type': 'application/json',
                }
            );
            const userUrl = "http://127.0.0.1:8000/auth/users/me/";
            const { data } = await axios.get(userUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${response.data.auth_token}`
                }
            });
            data.token = response.data.auth_token;
            setToken(data);
            navigate('/', { replace: true, });
        }
        catch (error) {
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
        }

    }
    const showError = () => {
        return (
            <p style={{ color: "red" }}>{error}</p>
        )
    }
    return (
        <div>
            <div className='container login-container mt-5'>
                <div class="card mb-5 shadow " style={{ maxWidth: "1000px", margin: "auto", borderRadius: "2%" }}>
                    <div class="row g-0">
                        <div class="col-md-6">
                            <img src={login} style={{ height: "100%", width: "100%", borderRadius: "2%" }} />
                        </div>
                        <div class="col-md-6 p-5">
                            <h1 className='text-center login-header mb-5'>LOGIN</h1>
                            <form onSubmit={(e) => onLogin(e)}>
                                <div class="mb-3 form-floating">
                                    <input
                                        type="email"
                                        class="form-control"
                                        id="email"
                                        placeholder="name@example.com"
                                        value={email} onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <label for="email" class="form-label">Email</label>
                                </div>
                                <div class="mb-3 form-floating">
                                    <input
                                        type="password"
                                        class="form-control"
                                        id="pw"
                                        placeholder="random password"
                                        value={password} onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <label for="pw" class="form-label">Password</label>
                                </div>
                                {showError()}
                                <div class="d-grid gap-2 mt-5">
                                    <AwesomeButton type="primary">LOGIN</AwesomeButton>
                                </div>
                                <div class='row mt-3'>
                                    <Link to="/registration" replace>
                                        <a href="">Don't have an Account? Register</a>
                                    </Link>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>


            </div >
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login
