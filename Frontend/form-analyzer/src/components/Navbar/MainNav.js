import React from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const MainNav = ({ setToken, token }) => {
    const navigate = useNavigate();

    return <Navbar navigate={navigate} setToken={setToken} token={token} />
}

export default MainNav

