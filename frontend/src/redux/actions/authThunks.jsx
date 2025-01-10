import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../features/api";
import { setError } from "../reducers/errorSlice";

export const loginAction = createAsyncThunk('auth/loginAction', async (credentials, thunkAPI) => {
  try {
    console.log(credentials);
    const response = await api.post('/user/login', credentials); 
    if (response){
      const { token, user } = response.data.locals;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return { token, user };
      }
    } catch (error) {
      dispatch(setError({
        message: error.response?.data?.message || 'An error occured',
        status: error.response?.status,
      }))
      return thunkAPI.rejectWithValue(error.response?.data);
    }
});

export const registerAction = createAsyncThunk('auth/registerAction', async (data, thunkAPI) => {
  try {
    console.log(data);
    const response = await api.post('/user/register', data);
    console.log(data);
    console.log("a");
    const {user, token } =  response.data.locals;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  } catch (error){
    dispatch(setError({
      message: error.response?.data?.message || 'An error occured',
      status: error.response?.status,
    }))
    return thunkAPI.rejectWithValue(error.response.data.message)
  }   
});

export const logoutAction = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return {};
});
 