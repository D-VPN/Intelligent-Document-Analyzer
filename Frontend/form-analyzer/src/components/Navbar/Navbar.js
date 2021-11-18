import React from 'react'
import './Navbar.css';

const Navbar = ({logout}) => {
    return (
        <div >
            <nav class="navbar navbar-expand-lg bg-info" className='navbar-color'>
            <div class="container-fluid">
                <a class="navbar-brand text-dark" href="#">Form Data Analyzer</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0"> </ul> {/* This is for keeping below code at RHS of navbar */}
                {/* <a><span class='text-light'> UserName </span></a> */}
                <button class='btn btn-primary bg-dark' onClick = {(e) => logout()} >Log Out</button>
                </div>
            </div>
            </nav>
        </div>
    )
}

export default Navbar;