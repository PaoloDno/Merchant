//product
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../features/api";
import { setError } from "../reducers/errorSlice";


export const createReviewAction = createAsyncThunk(
  "review/createReviewAction",
  async (reviewData, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    try {
      const response = await api.post(`/product/review`, reviewData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(
        setError({
          message: error.response?.data?.message || "Failed to create products",
          status: error.response?.status,
      }));
      return thunkAPI.rejectWithValue(error.response?.data);
    }
});

export const deleteReviewAction = createAsyncThunk(
  "review/deleteReviewAction",
  async ( _ , thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    try {
      const response = await api.delete(`/product/review`, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(
        setError({
          message: error.response?.data?.message || "Failed to create products",
          status: error.response?.status,
      }));
      return thunkAPI.rejectWithValue(error.response?.data);
    }  
});

export const getReviewProductAction = createAsyncThunk(
  "review/getReviewProductAction",
  async ( productId , thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    try {
      const response = await api.get(`/product/review/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(
        setError({
          message: error.response?.data?.message || "Failed to create products",
          status: error.response?.status,
      }));
      return thunkAPI.rejectWithValue(error.response?.data);
    }
});

export const getReviewUserAction = createAsyncThunk(
  "review/getReviewProduct",
  async ( _ , thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    try {
      const response = await api.get(`/product/review/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(
        setError({
          message: error.response?.data?.message || "Failed to create products",
          status: error.response?.status,
      }));
      return thunkAPI.rejectWithValue(error.response?.data);
    }
});