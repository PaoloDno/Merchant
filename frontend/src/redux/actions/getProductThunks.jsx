import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../features/api";
import { setError} from "../reducers/errorSlice";

export const getHotProductsActions = createAsyncThunk(
  "product/getHotProductsActions",
  async (_ , thunkAPI) => {
    try {
      console.log("get hor products");
      const response = await api.get("/product/hot", {
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

export const getProductsByCategoryActions = createAsyncThunk(
  "product/getProductsByCategoryActions",
  async ( categoryId, thunkAPI) => {
    try {
      console.log("get hor products");
      const response = await api.get(`/product/category/${categoryId}`, {
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


export const getNewProductsActions = createAsyncThunk(
  "product/getProductsByCategoryActions",
  async ( _ , thunkAPI) => {
    try {
      console.log("get new products");
      const response = await api.get(`/product/new`, {
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

export const getRandomProductsActions = createAsyncThunk(
  "product/getRandomProductsActions",
  async( _ , thunkAPI) => {
    try {
      console.log("get random products");
      const response = await api.get(`/product/new`, {
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
)
