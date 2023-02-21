import React from "react";
import { NavLink ,Outlet } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
    return (
        <>
        <Navbar bg="primary" variant="light">
        <Container>
          <Navbar.Brand className="mx-4 text-white">Mail Box App</Navbar.Brand>
          <Nav className="me-auto">
            <NavLink to="/" className="mx-4 text-white">Home</NavLink>
            <NavLink to="/" className="mx-4 text-white">Mail Box</NavLink>
            <NavLink to="/authform" className="mx-4 text-white">Signup</NavLink>
          </Nav>
        </Container>
      </Navbar>
        <Outlet/>
        </>
    );
};

export default Header;