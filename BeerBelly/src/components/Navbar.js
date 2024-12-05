import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import navlinks from '../content/navlinks.json';
import './customNavbar.css';
  const CustomNavbar = () => {
    const [links, setLinks] = useState([]);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
      setLinks(Object.entries(navlinks));
    }, []);

    const handleNavClick = () => {
      setTimeout(() => {
        setExpanded(false);
      }, 400); // Small delay to let fade out start
    };

    return (
      <Navbar 
        expand="lg" 
        className="custom-navbar" 
        sticky="top"
        expanded={expanded}
        onToggle={(isExpanded) => setExpanded(isExpanded)}
      >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto custom-nav-links">
            {links.map(([name, { link }]) => (
              <Nav.Link 
                key={name} 
                as={Link} 
                to={link}
                onClick={handleNavClick}
              >
                {name}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  };
export default CustomNavbar;