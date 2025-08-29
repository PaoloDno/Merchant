import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutAction } from '../../redux/actions/authThunks';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token);
    const isAdmin = useSelector(state => state.auth.isAdmin);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                try {
                    await dispatch(logoutAction());
                } catch (error) {
                    console.log(error);
                } finally {
                    navigate("/login");
                    return;
                }
            } else if (adminOnly && !isAdmin) {
                navigate("/not-authorized");
                return;
            }

            setLoading(false);
        };

        const timeout = setTimeout(verifyToken, 300);
        return () => clearTimeout(timeout);
    }, [token, dispatch, navigate, adminOnly, isAdmin]);

    if (loading) return <div>Verifying...</div>;

    return children;
};

export default ProtectedRoute;
