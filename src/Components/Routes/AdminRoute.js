import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ element }) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userRole = currentUser ? currentUser.role.roleName : null;
    if (userRole !== "ROLE_ADMIN") {
        return <Navigate to="*" />;
    }

    return element;
};

export default AdminRoute;
