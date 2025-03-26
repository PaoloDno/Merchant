import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../features/api";
import { setError } from "../reducers/errorSlice";

export const createProductAction = createAsyncThunk(
  "product/createProduct",
  async ({formData, storeId}, thunkAPI) => {
    // thunkAPI can be destructured
    console.log(formData, storeId);
    const token = thunkAPI.getState().auth.token;
    try {
      const response = await api.post(`/product/${storeId}`, formData, {
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
  }
);

export const getProductByIdAction = createAsyncThunk(
  "product/getProductById",
  async ( productId, { thunkAPI }) => {
    console.log(productId);
    // thunkAPI can be destructured
    try {
      const response = await api.get(`/product/${productId}`);
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

export const updateProductByIdAction = createAsyncThunk(
  "product/updateProductById",
  async ( {productId, productData}, { thunkAPI }) => {
    // thunkAPI can be destructured
    const token = thunkAPI.getState().auth.token;
    try {
      const response = await api.put(`/product/${productId}`, productData, {
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

export const deleteProductByIdAction = createAsyncThunk(
  "product/deleteProductById",
  async ( productId, { thunkAPI }) => {
    // thunkAPI can be destructured
    const token = thunkAPI.getState().auth.token;
    try {
      const response = await api.delete(`/product/${productId}`, {
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



