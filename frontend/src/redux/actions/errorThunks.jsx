import { createAsyncThunk } from "@reduxjs/toolkit";
import { setError } from "../reducers/errorSlice";
import api from "../features/api";



export const fetchData = createAsyncThunk(
    'data/fetch',
    async (_, { dispatch, rejectWithValue }) => {
        try {
             
            const response = await api.get('/api/data');
            return response.data;
        } catch (error) {
            dispatch(
                setError({
                    message: error.response?.data?.message || 'An error occurred',
                    status: error.response?.status,
                })
            );
            return rejectWithValue(error.response?.data);
        }
    }
);
