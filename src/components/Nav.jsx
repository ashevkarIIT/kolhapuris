import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './Styles/Navbar.css';
import Login from './Login';
import { useNavigate } from 'react-router-dom';


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
            <div className="logo">
                <h1>Flip-Flops</h1>
            </div>
            <nav className="navigation">
                <ul>
                    <li><Link to="/Home">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                    {isLoggedIn ? (
                        <li><Link to="/profile">Profile</Link></li>
                    ) : (
                    <></>
                    )}
                    {isLoggedIn ? (
                        <li onClick={handleLogout}>Logout</li>
                    ) : (
                        <li><Link to="/login">Login</Link></li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Nav;