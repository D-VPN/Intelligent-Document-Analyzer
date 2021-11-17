import React, { useState } from 'react'
import PropTypes from 'prop-types';
import './Login.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

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
        <div className="login">
            <form className="login__form" onSubmit={(e) => onLogin(e)}>
                <h1>
                    Login Here
                </h1>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {showError()}
                <button type="submit" className="submit__btn">Submit</button>

            </form>

        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login
