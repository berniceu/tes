import React, { Children } from "react";
import { Navigate, Outlet, redirect } from "react-router-dom";

const ProtectedRoute = ({ isAllowed, redirectPath = '/login', children}) => {
    if(!isAllowed){
        return <Navigate to={redirectPath}/>
    }

    return children ? children : <Outlet/>
}

export default ProtectedRoute;