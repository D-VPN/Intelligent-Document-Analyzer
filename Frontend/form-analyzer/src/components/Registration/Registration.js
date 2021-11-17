import React, { useState } from 'react'
import axios from 'axios';
import './Registration.css';
import login from '../../images/login.jpg';
import NavbarLR from '../Navbar/NavbarLR';
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
    const [username, setUsername] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [organization, setOrganization] = useState("")
    const [password, setPassword] = useState("")
    const [repassword, setRepassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const onRegistration = async (e) => {
        e.preventDefault();
        setError("");
        if (username.length === 0) {
            setError("Username is required");
            return;
        } else if (email.length === 0) {
            setError("Email is required");
            return;
        }
        else if (firstName.length === 0) {
            setError("First Name is required");
            return;
        }
        else if (lastName.length === 0) {
            setError("Last Name is required");
            return;
        }
        else if (password.length === 0) {
            setError("Password is required");
            return;
        }
        else if (repassword.length === 0) {
            setError("Please re-type your password");
            return;
        }

        else if (repassword !== password) {
            setError("Passwords are not matching");
            return;
        }
        const url = "http://127.0.0.1:8000/auth/users/";
        await axios.post(url, {
            email: email,
            first_name: firstName,
            last_name: lastName,
            username: username,
            organization_name: organization,
            password: password,
            re_password: password,
        },
            {
                'Content-Type': 'application/json',
            }
        ).then((response) => {
            if (response.status === 201) {
                navigate("/login", { replace: true, });
            }
        }).catch((error) => {
            if (error.response) {
                if (error.response.data.email) {
                    setError(error.response.data.email[0]);
                }
                else if (error.response.data.first_name) {
                    setError(error.response.data.first_name[0]);
                }
                else if (error.response.data.last_name) {
                    setError(error.response.data.last_name[0]);
                }
                else if (error.response.data.username) {
                    setError(error.response.data.username[0]);
                }
                else if (error.response.data.organization_name) {
                    setError(error.response.data.organization_name[0]);
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
                <p style={{ color: "red" }}>{error}</p>
            )
    }
    return (
        <div>
            <NavbarLR></NavbarLR>
            <div className='container register-container'>
            
            <h1 className='text-center login-header'>REGISTER</h1>
            <div className='row register-row'>
                <div className='col-md-6'>
                    <img src={login} alt="Logo" style={{ height: "90%", width: "100%" }} className='img-fluid' />
                </div>
                <div className='col-md-6'>
                    <form onSubmit={(e) => onRegistration(e)}>
                        <div className='row g-2'>
                            <div className='col-md'>
                                <div class="form-floating mb-3">
                                    <input type="name" class="form-control" id="username" placeholder="darshan"
                                        value={username} onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <label for="username">Username</label>
                                </div>
                            </div>
                            <div className='col-md'>
                                <div class="form-floating mb-3">
                                    <input type="email" class="form-control" id="email" placeholder="name@example.com"
                                        value={email} onChange={(e) => setEmail(e.target.value)}

                                    />
                                    <label for="email">Email</label>
                                </div>
                            </div>
                        </div>

                        <div className='row g-2'>
                            <div className='col-md'>
                                <div class="form-floating mb-3">
                                    <input type="name" class="form-control" id="firstName" placeholder="darshan"

                                        value={firstName} onChange={(e) => setFirstName(e.target.value)}
                                    />
                                    <label for="firstName">First Name</label>
                                </div>
                            </div>
                            <div className='col-md'>
                                <div class="form-floating mb-3">
                                    <input type="name" class="form-control" id="lastName" placeholder="satra"

                                        value={lastName} onChange={(e) => setLastName(e.target.value)}
                                    />
                                    <label for="lastName">Last Name</label>
                                </div>
                            </div>
                        </div>
                        <div className='row g-2'>
                            <div className='col-md'>
                                <div class="form-floating mb-3">
                                    <input type="password" class="form-control" id="password" placeholder="Password"

                                        value={password} onChange={(e) => setPassword(e.target.value)}

                                    />
                                    <label for="password">Password</label>
                                </div>
                            </div>
                            <div className='col-md'>
                                <div class="form-floating mb-3">
                                    <input type="password" class="form-control" id="repassword" placeholder="Password"
                                        value={repassword} onChange={(e) => setRepassword(e.target.value)}

                                    />
                                    <label for="repassword">Re-Type Password</label>
                                </div>
                            </div>
                        </div>
                        <div className='col-md'>
                            <div class="form-floating mb-3">
                                <input type="name" class="form-control" id="organization" placeholder="D-VPN"
                                    value={organization} onChange={(e) => setOrganization(e.target.value)}

                                />
                                <label for="repassword">Organization</label>
                            </div>
                        </div>
                        {showError()}
                        <div class="d-grid gap-2">
                            <button className="submit__btn" type='submit'>Submit</button>
                        </div>
                        <div class='row mt-3'>
                            <div class='col-md-6 mx-auto'>

                                <Link to="/login" replace>
                                    <a href="">Already have an Account? Login</a>
                                </Link>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
        </div>
        



    )


}

export default Registration
