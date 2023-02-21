import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = (props) => {

    const token = useSelector(state => state.auth.IdToken)
    // let token = localStorage.getItem('idToken');

    return token ? props.children : <Navigate to='/authform' />
};

export default PrivateRoute;