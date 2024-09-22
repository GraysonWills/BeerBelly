import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets//LandingPage/logo.png'; // Ensure the logo is in the correct path
import '../styles/customNavbar.css'; // Import the custom CSS file

const CustomNavbar = () => {
    return (
      <Navbar expand="lg" className="custom-navbar" sticky="top">
        <Navbar.Brand href="/">
          <img
            src={logo}
            alt="Logo"
            width="50"
            height="50"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto custom-nav-links">
            <Nav.Link href="/taste">Find By Taste</Nav.Link>
            <Nav.Link href="/how-to">How To</Nav.Link>
            <Nav.Link href="/locations">Locations</Nav.Link>
            <Nav.Link href="/recipes">Recipes</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  };
  
  export default CustomNavbar;