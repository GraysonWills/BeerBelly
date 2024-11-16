import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import navlinks from '../../content/navlinks.json';
import './customNavbar.css';

const CustomNavbar = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    setLinks(Object.entries(navlinks));
  }, []);

  return (
    <Navbar expand="lg" className="custom-navbar" sticky="top">
      <Navbar.Brand as={Link} to="/">
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
            <Nav.Link key={name} as={Link} to={link}>
              {name}
            </Nav.Link>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;