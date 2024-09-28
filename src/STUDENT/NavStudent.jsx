import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavStudent.css'; 


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <nav className="navbar">
                <div className="logo1">EDU-BRIDGE</div>
                <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
                    <li><Link to="/" onClick={toggleMenu}>Virtual Classroom</Link></li>
                    <li><Link to="/" onClick={toggleMenu}>E-learning</Link></li>
                    <li><Link to="/" onClick={toggleMenu}>Resource Sharing</Link></li>
                    <li><Link to="/" onClick={toggleMenu}>Quizzes</Link></li>
                    <li><Link to="/" onClick={toggleMenu}>Resource Request</Link></li>
                    <li><Link to="/" onClick={toggleMenu}>Logout</Link></li>
                </ul>
                <div className="menu-toggle" onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </nav>
        </>
    );
};

export default Navbar;



