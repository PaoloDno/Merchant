import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchData } from '../../redux/actions/errorThunks';

const TestThunk = () => {
    const dispatch = useDispatch();

    const fetchDataHandler = () => {
        dispatch(fetchData());
    };

    return <button onClick={fetchDataHandler}>Fetch Data</button>;
};

export default TestThunk;
