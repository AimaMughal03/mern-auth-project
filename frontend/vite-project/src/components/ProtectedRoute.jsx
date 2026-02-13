import { Outlet, Navigate } from "react-router-dom";



function ProtectedRoute() {

    const isLoggedIn = localStorage.getItem("token");
    return isLoggedIn? <Outlet/> : <Navigate to="/login"/>
}

export default ProtectedRoute;
