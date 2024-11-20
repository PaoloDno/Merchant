import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../features/api";

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
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const registerAction = createAsyncThunk('auth/registerAction', async (data, thunkAPI) => {
  try {
    console.log(data);
    const response = await api.post('/user/register', data);
    const {user, token } =  response.data.locals;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  } catch (error){
    return thunkAPI.rejectWithValue(error.response.data.message)
  }   
});

export const logoutAction = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return {};
});
 