import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../features/api";

export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {

    const response = await api.post('/users/login', credentials); 
   
    if (response){
      const { token, user } = response.data.locals;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return { token, user };
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const register = createAsyncThunk('auth/register', async (data, thunkAPI) => {
  try {
    const response = await api.post('/user/register', data);
    const {token, user} =  response.data.locals;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  } catch (error){
    return thunkAPI.rejectWithValue(error.response.data.message)
  }   
});

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return {};
});
 