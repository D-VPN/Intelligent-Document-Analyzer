import React, { Component } from 'react'
import './Navbar.css';
import logo from '../../images/logo-transparent.png'
import { useNavigate, Link } from 'react-router-dom';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/themes/theme-blue.css";


class Navbar extends Component {
    constructor(props) {
        super(props)
    }

    logout = () => {
        this.props.setToken();
        this.props.navigate("/login", { replace: true });
    }

    getUser = () => {
        const userDetail = localStorage.getItem('user');
        const user = JSON.parse(userDetail);
        return <div class="text-light mx-5 fs-4">
            <img class="mx-2" src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/32/000000/external-user-interface-kiranshastry-gradient-kiranshastry-1.png" />
            {user.username}
        </div>;
    }

    render() {
        const body = this.props.token ?
            /* Logged In Navbar */
            <nav class="navbar navbar-expand-md navbar-dark bg-dark">
                <div class="container-fluid">
                    <Link to="/" class='pt-3'>
                        <a class="navbar-brand text-light" href="/"> 
                            <img src={logo} height={45} width={45} class="d-inline-block mb-3" />
                            <span class="h3">Form Data Analyzer</span>
                        </a>
                    </Link>

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ms-auto md-2 mb-lg-0">
                            <li class="nav-item">
                                {this.getUser()}
                            </li>
                            <li class="nav-item">
                                <AwesomeButton type="secondary" onPress={(e)=>this.logout()}>Log Out</AwesomeButton>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav >
            : 
            /* Before Log In Navbar */
            <nav class="navbar navbar-expand-md navbar-dark bg-dark">
                <div class="container-fluid">
                    <Link to="/" class="pt-3">
                        <a class="navbar-brand text-light" href="/"> 
                            <img src={logo} height={45} width={45} class="d-inline-block mb-3" />
                            <span class="h3">Form Data Analyzer</span>
                        </a>
                    </Link>
                </div>
            </nav>
            ;
        return body;
    }
}

export default Navbar;