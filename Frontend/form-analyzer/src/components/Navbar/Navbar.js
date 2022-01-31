import React, { Component } from 'react'
import './Navbar.css';
import logo from '../../images/logo-transparent.png'
import { useNavigate, Link } from 'react-router-dom';


class Navbar extends Component {
    constructor(props) {
        super(props)
    }

    logout = () => {
        this.props.setToken();
        this.props.navigate("/login", { replace: true });
    }

    getUser = () => {
        const userDetail = sessionStorage.getItem('user');
        const user = JSON.parse(userDetail);
        return <div class="text-light mx-5 fs-4" style={{
            "display": "inline-flex",
            "align-items": "center"
        }}>
            <img class="mx-2" src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/32/000000/external-user-interface-kiranshastry-gradient-kiranshastry-1.png" />
            {user.username}
        </div>;
    }

    render() {

        const body = this.props.token ?
            <div>
                < nav class="navbar navbar-expand-lg bg-dark px-3" >
                    <div class="container-fluid">
                        <div class="d-flex pt-3" >
                            <img src={logo} height={45} width={45} />
                            <Link to="/">
                                <a class="navbar-brand text-light" href="#"> <h2 class="mx-2">Form Data Analyzer</h2></a>
                            </Link>
                        </div>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-lg-0"> </ul>

                            {this.getUser()}
                            <button class='btn btn-primary' onClick={(e) => this.logout()} >Log Out</button>
                        </div>
                    </div>
                </nav >
            </div>
            : <div>
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark p-3">
                    <div class="container-fluid">
                        <div class="d-flex pt-3">
                            <img src={logo} height={45} width={45} />
                            <Link to="/">
                                <a class="navbar-brand text-light" href="#"> <h2 class="mx-2">Form Data Analyzer</h2></a>
                            </Link>
                        </div>
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