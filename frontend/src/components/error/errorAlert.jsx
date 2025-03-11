import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearError} from '../../redux/reducers/errorSlice';
import TestThunk from './testThunk';

const ErrorAlert = () => {
    const dispatch = useDispatch();
    const { message, status } = useSelector((state) => state.error);

    if (!message) return null;

    return (
        <div className="bg-red-500 text-white font-bold px-10 py-4 border-red-400 text-center
        flex flex-row my-5 text-2xl justify-center w-screen gap-x-5
        " >
            <p className='w-3/5 text-style3 justify-center text-center'>Status:{status}; Message: {message}</p >
            <button 
            onClick={() => dispatch(clearError())}
            className='bg-white text-red-700 p-2 px-5 rounded-md cursor-pointer font-bold w-1/5'
            >
                Dismiss
            </button>
            <TestThunk />
        </div>
    );
};

export default ErrorAlert;
