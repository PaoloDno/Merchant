import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../features/api";
import { setError } from "../reducers/errorSlice";

export const processOrderAction = createAsyncThunk(
  "order/processOrderAction",
  async (orderData, thunkAPi) => {
    try {
      console.log(orderData);
      const token = thunkAPI.getState().auth.token;
      const response = await api.post("/check/checkout", categoryData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(
        setError({
          message: error.response?.data?.message || "An error occured",
          status: error.response?.status,
        })
      );
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getOrderHistoryUserAction = createAsyncThunk(
  "order/getOrderHistoryUserAction",
  async ( _ , thunkAPI) => {
    try {
      console.log(categoryData);
      const token = thunkAPI.getState().auth.token;
      const response = await api.get("/check/", categoryData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(
        setError({
          message: error.response?.data?.message || "An error occured",
          status: error.response?.status,
        })
      );
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const getOrderByIdAction = createAsyncThunk(
  "order/getOrderByIdAction",
  async (orderId, thunkAPI) => {
    try {
      console.log(categoryData);
      const token = thunkAPI.getState().auth.token;
      const response = await api.get(`/check/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(
        setError({
          message: error.response?.data?.message || "An error occured",
          status: error.response?.status,
        })
      );
      return thunkAPI.rejectWithValue(error.response.data.message);
    } 
});

export const getAllOrderAction = createAsyncThunk(
  "order/getAllOrderAction",
  async ( _ , thunkAPI) => {
    try {
      console.log(categoryData);
      const token = thunkAPI.getState().auth.token;
      const response = await api.get(`/check/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(
        setError({
          message: error.response?.data?.message || "An error occured",
          status: error.response?.status,
        })
      );
      return thunkAPI.rejectWithValue(error.response.data.message);
    } 
});

