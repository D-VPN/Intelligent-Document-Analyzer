import React, { Component } from 'react'
import './Navbar.css';
import { useNavigate } from 'react-router-dom';


class Navbar extends Component {
    constructor(props) {
        super(props)
    }

    logout = () => {
        this.props.setToken();
        this.props.navigate("/login", { replace: true });
    }
    render() {

        const body = this.props.token ?
            <div>
                < nav class="navbar navbar-expand-lg bg-dark p-3" >
                    <div class="container-fluid">
                        <a class="navbar-brand text-light" href="#">Form Data Analyzer</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0"> </ul> {/* This is for keeping below code at RHS of navbar */}
                            {/* <a><span class='text-light'> UserName </span></a> */}
                            <button class='btn btn-primary' onClick={(e) => this.logout()} >Log Out</button>
                        </div>
                    </div>
                </nav >
            </div>
            : <div>
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark p-3">
                    <div class="container-fluid">
                        <a class="navbar-brand text-light" href="#">Form Data Analyzer</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </nav>
            </div>
            ;
        return body;
    }
}

export default Navbar;