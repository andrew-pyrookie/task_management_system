import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Ensure you have a way to check authentication

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth(); // Check if the user is authenticated

    return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
