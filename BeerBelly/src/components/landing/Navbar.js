import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import logo from '/assets/LandingPage/logo.png'; // Ensure the logo is in the correct path
import navlinks from '../../content/navlinks.json'; // Import the navlinks JSON
import './customNavbar.css'; // Import the custom CSS file

const CustomNavbar = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    // Set the links from navlinks.json
    setLinks(Object.entries(navlinks));
  }, []);

  return (
    <Navbar expand="lg" className="custom-navbar" sticky="top">
      <Navbar.Brand href="/">
        <img
          src={'/assets/LandingPage/logo.png'}
          alt="Logo"
          width="50"
          height="50"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto custom-nav-links">
          {links.map(([name, { link }]) => (
            <Nav.Link key={name} href={link}>
              {name}
            </Nav.Link>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;