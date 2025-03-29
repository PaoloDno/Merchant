import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../features/api";
import { setError } from "../reducers/errorSlice";

// Helper function to construct API URL with pagination (fixed limit = 15)
const constructUrl = (endpoint, page) => {
  let url = `${endpoint}?limit=15`; // Fixed limit to 15
  if (page !== undefined) {
    url += `&page=${page}`;
  }
  return url;
};

export const getHotProductsActions = createAsyncThunk(
  "product/getHotProductsActions",
  async ( page , thunkAPI) => {
    try {
      console.log("Fetching hot products...");
      const token = thunkAPI.getState().auth.token;
      const response = await api.get(constructUrl("/product/hot", page), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(
        setError({
          message: error.response?.data?.message || "An error occurred",
          status: error.response?.status,
        })
      );
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error fetching hot products");
    }
  }
);

export const getProductsByCategoryActions = createAsyncThunk(
  "product/getProductsByCategoryActions",
  async ({ categoryId, page }, thunkAPI) => {
    try {
      console.log(`Fetching products for category ${categoryId}...`);
      const token = thunkAPI.getState().auth.token;
      const response = await api.get(constructUrl(`/product/category/${categoryId}`, page), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(
        setError({
          message: error.response?.data?.message || "An error occurred",
          status: error.response?.status,
        })
      );
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error fetching category products");
    }
  }
);

export const getNewProductsActions = createAsyncThunk(
  "product/getNewProductsActions",
  async (page , thunkAPI) => {
    try {
      console.log("Fetching new products...", page);
      const token = thunkAPI.getState().auth.token;
      const response = await api.get(constructUrl("/product/new", page), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(
        setError({
          message: error.response?.data?.message || "An error occurred",
          status: error.response?.status,
        })
      );
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error fetching new products");
    }
  }
);

export const getRandomProductsActions = createAsyncThunk(
  "product/getRandomProductsActions",
  async ( page , thunkAPI) => {
    try {
      console.log("Fetching random products...");
      const token = thunkAPI.getState().auth.token;
      const response = await api.get(constructUrl("/product/random", page), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(
        setError({
          message: error.response?.data?.message || "An error occurred",
          status: error.response?.status,
        })
      );
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error fetching random products");
    }
  }
);
