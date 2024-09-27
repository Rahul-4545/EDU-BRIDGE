import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavStudent.css'; // Update to the student-specific CSS

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <nav className="navbarstudent">
                <div className="logostudent">EDU-BRIDGE</div>
                <ul className={`nav-linkstudent ${isOpen ? 'active' : ''}`}>
                    <li><Link to="/" onClick={toggleMenu}>Virtual Classroom</Link></li>
                    <li><Link to="/" onClick={toggleMenu}>Study Materials</Link></li>
                    <li><Link to="/" onClick={toggleMenu}>E-Learning</Link></li>
                    <li><Link to="/" onClick={toggleMenu}>Quizzes</Link></li>
                    <li><Link to="/" onClick={toggleMenu}>Resource Request</Link></li>
                    <li><Link to="/" onClick={toggleMenu}>Logout</Link></li>
                </ul>
                <div className="menu-togglestudent" onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </nav>
        </>
    );
};

export default Navbar;