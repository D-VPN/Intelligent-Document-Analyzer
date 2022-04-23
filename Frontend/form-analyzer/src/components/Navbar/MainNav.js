import React from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const MainNav = ({ setToken, token, path }) => {
    const navigate = useNavigate();

    return <Navbar navigate={navigate} setToken={setToken} token={token} path={path} />
}

export default MainNav

