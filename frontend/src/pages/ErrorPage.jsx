import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <h1 className="text-4xl font-bold text-red-600 mb-4">Oops! Something went wrong.</h1>
            <p className="text-lg mb-6">The page you are looking for doesn't exist or an error occurred.</p>
            <button onClick={() => navigate("/")} className="px-4 py-2 rounded-md bg-blue-500 text-white">
                Go Back Home
            </button>
        </div>
    );
};

export default ErrorPage;