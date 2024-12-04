import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './Styles/Navbar.css';
import { useNavigate } from 'react-router-dom';
import { RiLoginBoxLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxLine } from "react-icons/ri";
// import { FiShoppingCart } from "react-icons/fi";






const Nav = () => {
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if user is logged in (e.g., by checking localStorage)
        const user = localStorage.getItem('user');
        if (user) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        navigate('/login')
    };

    return (
        
        <header className="header">
            <nav className="nav">
                
                {isLoggedIn ? (
                        <li><Link to="/profile"><CgProfile/>Profile</Link></li>
                    ) : (
                    <></>
                    )}
                    {isLoggedIn ? (
                        <li onClick={handleLogout}><Link to="/login"><RiLogoutBoxLine />Logout</Link></li>
                    ) : (
                        <li><Link to="/login"><RiLoginBoxLine />Login</Link></li>
                    )}  
                
            </nav>
            <div class="main">
            <div className="logo">
                <h1>Flip-Flops</h1>
            </div>
            <nav className="navigation">
                <ul>
                    <li><Link to="/Home">Home</Link></li>
                    <li><Link to="/products?gender=Women">Women</Link></li>
                    <li><Link to="/products?gender=Men">Men</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                    
                </ul>
            </nav>
            </div>
        </header>
    );
};

export default Nav;