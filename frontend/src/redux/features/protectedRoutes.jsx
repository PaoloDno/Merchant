import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { logoutAction } from '../actions/authThunks';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token);
    const isAdmin = useSelector(state => state.auth.isAdmin);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyToken = () => {
            if (!token) {
                dispatch(logoutAction());
                navigate("/login");
            } else if (adminOnly && !isAdmin) {
              navigate("/not-authorized");
            }
            setLoading(false);
        };

        // Simulate token expiration check (Optional)
        const timeout = setTimeout(verifyToken, 500); // Short delay for a smoother transition
        return () => clearTimeout(timeout);

    }, [token, dispatch, navigate, adminOnly]);

    if (loading) return <div>Verifying...</div>;

    return children;
};

export default ProtectedRoute;