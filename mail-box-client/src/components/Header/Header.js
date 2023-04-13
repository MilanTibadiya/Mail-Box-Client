import React from "react";
import { NavLink ,Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { authAction } from "../../store/AuthSlicer";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  const IdToken = useSelector((state) => state.auth.IdToken)
  const dispatch = useDispatch();

    return (
        <>
        <Navbar bg="primary" variant="light">
        <Container>
          <Navbar.Brand className="mx-4 text-white">Mailbox App</Navbar.Brand>
          <Nav className="me-auto align-items-center">
            <NavLink to="/" className="mx-4 text-white">Home</NavLink>
            {/* <NavLink to="/sendmail" className="mx-4 text-white">Mail Box</NavLink> */}
            <NavLink to="/inbox" className="mx-4 text-white">Inbox</NavLink>
            {!IdToken ? (
                <NavLink to="/authform">
                  <button className="btn mx-4 text-white btn-outline-secondary">Login</button>
                </NavLink>
              ) : (
                <NavLink to="/authform">
                  <button
                    onClick={() => {
                      dispatch(authAction.logout());
                    }}
                    className="btn mx-4 text-white btn-outline-secondary"
                  >
                    Logout
                  </button>
                </NavLink>
                )}
          </Nav>
        </Container>
      </Navbar>
        <Outlet/>
        </>
    );
};

export default Header;