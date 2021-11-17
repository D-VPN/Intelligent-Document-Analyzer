import React, { useState } from 'react'
import axios from 'axios';
import './Registration.css';

const Registration = () => {
    const [username, setUsername] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [organization, setOrganization] = useState("")
    const [password, setPassword] = useState("")
    const [repassword, setRepassword] = useState("")
    const [error, setError] = useState("")
    const onRegistration = async (e) => {
        e.preventDefault();
        setError("");
        if (username.length === 0) {
            setError("Username is required");
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
        else if (email.length === 0) {
            setError("Email is required");
            return;
        }
        else if (password.length === 0) {
            setError("Password is required");
            return;
        }
        else if (repassword.length === 0) {
            setError("Please fill the last blank");
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
            console.log(response);
            if (response.data.status === 201) {
                // Yaha phir dashboard me navigate karna hai
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
                <input type="name" placeholder="Organization Name" value={organization} onChange={(e) => setOrganization(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="password" placeholder="Re-type Password" value={repassword} onChange={(e) => setRepassword(e.target.value)} />
                {showError()}
                <button type="submit" className="submit__btn">Submit</button>

            </form>

        </div>
    )


}

export default Registration
