import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../features/api";
import { setError } from "../reducers/errorSlice";

export const loginAction = createAsyncThunk('auth/loginAction', async (credentials, thunkAPI) => {
  try {
    console.log(credentials);
    const response = await api.post('/user/login', credentials); 
    console.log("Login response:", response.data);

    if (response){
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      console.log("success");
      }
      return response.data;
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(setError({
        message: error.response?.data?.message || 'Failed to login',
        status: error.response?.status,
      }))
      return thunkAPI.rejectWithValue(error.response?.data.message);
    }
});

export const registerAction = createAsyncThunk('auth/registerAction', async (data, thunkAPI) => {
  try {
    console.log(data);
    const response = await api.post('/user/register', data);
    console.log(data);
    console.log("a");
    const {user, token } =  response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return response.data;
  } catch (error){
    thunkAPI.dispatch(setError({
      message: error.response?.data?.message || 'An error occured',
      status: error.response?.status,
    }))
    return thunkAPI.rejectWithValue(error.response?.data.message)
  }   
});

export const logoutAction = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return {};
});
 
export const updateProfileAction = createAsyncThunk('auth/updateProfileAction', async (data, thunkAPI) => {
  try {
    console.log(data);
    const response = await api.put('/user/profile', data);
    return response.data;
  } catch (error){
    thunkAPI.dispatch(setError({
      message: error.response?.data?.message || 'An error occured',
      status: error.response?.status,
    }))
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
});


export const updateAddressAction = createAsyncThunk('auth/updateAddressAction', async (data, thunkAPI) => {
  try {
    console.log(data);
    const response = await api.put('/user/address', data);
    return response.data;
  } catch (error){
    thunkAPI.dispatch(setError({
      message: error.response?.data?.message || 'An error occured',
      status: error.response?.status,
    }))
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
});

export const displayUserAction = createAsyncThunk('auth/displayUserAction', async (data, thunkAPI) => {
  try {
    console.log(data);
    const response = await api.get('/user/', data);
    return response.data;
  } catch (error){
    thunkAPI.dispatch(setError({
      message: error.response?.data?.message || 'An error occured',
      status: error.response?.status,
    }))
    return thunkAPI.rejectWithValue(error.response.data.message)
  }
});