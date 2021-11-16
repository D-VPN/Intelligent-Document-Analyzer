import React, { useState } from 'react'
import PropTypes from 'prop-types';
import './Login.css';
import axios from 'axios';

const Login = ({ setToken }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const onLogin = async (e) => {
        e.preventDefault();
        setError("");
        if (email.length == 0) {
            setError("Email is required");
        }
        else if (password.length == 0) {
            setError("Password is required");
        }
        if (error.length != 0)
            return;
        const url = "http://127.0.0.1:8000/auth/token/login";
        await axios.post(url, {
            email: email,
            password: password,
        },
            {
                'Content-Type': 'application/json',
            }
        ).then((response, error) => {
            console.log(response);
            const user = {
                email: "darshansatra1@gmail.com",
                username: "darshansatra1",
                token: "token",
            }
            setToken(user);
            console.log(error)

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
