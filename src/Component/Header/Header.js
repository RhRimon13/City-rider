import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import './Header.css';
import ridersLogo from '../Image/icons8-public-transportation-50.png';
import { useParams } from 'react-router';

const Header = () => {
    return (
        <div>
            <Navbar bg="light" expand="md">
                <Navbar.Brand href="/home"><img src={ridersLogo} alt="" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/destination">Destination</Nav.Link>
                        <Nav.Link href="/blog">Blog</Nav.Link>
                        <Nav.Link href="/contact">Contact</Nav.Link>
                        <Nav.Link href="/login"><button>Log In</button></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Header;



