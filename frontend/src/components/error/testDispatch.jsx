import React from 'react';
import { useDispatch } from 'react-redux';
import { setError } from '../../redux/reducers/errorSlice';

const TestError = () => {
    const dispatch = useDispatch();

    const triggerError = () => {
        dispatch(setError({ message: 'This is a test error!', status: 400 }));
    };

    return <button onClick={triggerError}>Trigger Error</button>;
};

export default TestError;
