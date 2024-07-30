import React, { Children } from "react";
import { Navigate, Outlet, redirect } from "react-router-dom";

const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
  };

const ProtectedRoute = ({ redirectPath = '/login', children }) => {
    const isAllowed = isAuthenticated();
    
    if (!isAllowed) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute;