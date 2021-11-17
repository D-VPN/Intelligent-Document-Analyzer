import React, { useState } from 'react'
import PropTypes from 'prop-types';
import './Login.css';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import login from '../../images/login-image.png';
import NavbarLR from '../Navbar/NavbarLR';

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
        await axios.post(url, {
            email: email,
            password: password,
        },
            {
                'Content-Type': 'application/json',
            }
        ).then((response) => {
            if (response.status === 200) {
                const user = {
                    email: email,
                    token: response.data.auth_token,
                };
                setToken(user);
                navigate('/', { replace: true, });
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
        return (
            <p style={{ color: "red" }}>{error}</p>
        )
    }
    return (

        <div className='container login-container mt-5'>
            <div class="card mb-5 shadow " style={{ maxWidth: "800px", margin: "auto", borderRadius: "2%" }}>
                <div class="row g-0">
                    <div class="col-md-6">
                        <img src={login} style={{ height: "100%", width: "100%", borderRadius: "2%" }} />
                    </div>
                    <div class="col-md-6 p-5">
                        <h1 className='text-center login-header mb-5'>LOGIN</h1>
                        <form onSubmit={(e) => onLogin(e)}>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input
                                    type="email"
                                    class="form-control"
                                    id="email"
                                    placeholder="name@example.com"
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div class="mb-3">
                                <label for="pw" class="form-label">Password</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    id="pw"
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            {showError()}
                            <div class="d-grid gap-2 mt-5">
                                <button className="submit__btn" type='submit'>Submit</button>
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


            {/* <div className='row login-row'>
        <div>
            <NavbarLR></NavbarLR>
            <div className='container login-container'>
            
            <h1 className='text-center login-header'>LOGIN</h1>
            <div className='row login-row'>
                <div className='col-md-6'>
                    <img src={login} alt="Logo" style={{ height: "50%", width: "70%" }} className='img-fluid' />
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
                        <div class="d-grid gap-2">
                            <button className="submit__btn" type='submit'>Submit</button>
                        </div>
                        <div class='row mt-3'>
                            <div class='col-md-6 mx-auto'>

                                <Link to="/registration" replace>
                                    <a href="">Don't have an Account? Register</a>
                                </Link>
                            </div>
                        </div>

                    </form>

                </div>
            </div> */}
        </div >


        /* <div className="login">
            <form className="login__form" onSubmit={(e) => onLogin(e)}>
                <h1>
                    Login Here
                </h1>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {showError()}
                <button type="submit" className="submit__btn">Submit</button>

            </form> */

    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login
