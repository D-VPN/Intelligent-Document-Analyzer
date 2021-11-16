import React, { useState } from 'react'
import './Registration.css';

const Registration = () => {
    const [username, setUsername] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repassword, setRepassword] = useState("")
    const [error, setError] = useState("")
    const onRegistration = async (e) => {
        e.preventDefault();
        setError("");
        if (username.length == 0) {
            setError("Username is required");
        }
        else if (firstName.length == 0) {
            setError("First Name is required");
        }
        else if (lastName.length == 0) {
            setError("Last Name is required");
        }
        else if (email.length == 0) {
            setError("Email is required");
        }
        else if (password.length == 0) {
            setError("Password is required");
        }
        else if (repassword.length == 0) {
            setError("Please fill the last blank");
        }

        else if (repassword !== password) {
            setError("Passwords are not matching");
        }
        const url = "https:/auth/token/login";
        // await axios.post(url, {
        //     email: email,
        //     password: password,
        // },
        //     {
        //         'Content-Type': 'application/json',
        //     }
        // ).then((response, error) => {
        //     const user = {
        //         email: "darshansatra1@gmail.com",
        //         username: "darshansatra1",
        //         token: "token",
        //     }
        //     setToken(user);

        // });

        const user = {
            email: email,
            username: password,
            token: "token",
        }
    }

    const showError = () => {
        if (error.length > 0)
            return (
                <h4 style={{ color: "red" }}>{error}</h4>
            )
    }
    return (
        <div className="registration">
            <form className="registration__form" onSubmit={(e) => onRegistration(e)}>
                <h1>
                    Register Here
                </h1>
                <input type="name" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="name" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <input type="name" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="password" placeholder="Re-type Password" value={repassword} onChange={(e) => setRepassword(e.target.value)} />
                {showError()}
                <button type="submit" className="submit__btn">Submit</button>

            </form>

        </div>
    )


}

export default Registration
