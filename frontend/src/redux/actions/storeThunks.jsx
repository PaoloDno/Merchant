import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../features/api";
import { setError } from "../reducers/errorSlice";

//name: store

export const createStoreAction = createAsyncThunk(
  "store/createStoreAction",
  async ( formData , thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      console.log(formData);
      const response = await api.post(`/store/`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        } 
      });

      if (response) {
        console.log("success :", response.data);
      }
      return response.data;
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(
        setError({
          message: error.response?.data?.message || "Failed to create Store",
          status: error.response?.status,
        })
      );
      return thunkAPI.rejectWithValue(error.response?.data.message);
    }
  }
);

export const getMyStoresAction = createAsyncThunk(
  "store/getMyStoreAction",
  async ( _, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
    
      const response = await api.get("/store/", {
        headers: {
          'Authorization': `Bearer ${token}`
        } 
      });
      if (response) {
        console.log("success :", response.data);
      }
      return response.data;
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(
        setError({
          message: error.response?.data?.message || "Failed to create Store",
          status: error.response?.status,
        })
      );
      return thunkAPI.rejectWithValue(error.response?.data.message);
    }
  }
);

export const updateMyStoreAction = createAsyncThunk(
  "store/updateMyStoreAction",
  async ( formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
    
      const response = await api.get("/store/", formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        } 
      });
      if (response) {
        console.log("success :", response.data);
      }
      return response.data;
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(
        setError({
          message: error.response?.data?.message || "Failed to update Store",
          status: error.response?.status,
        })
      );
      return thunkAPI.rejectWithValue(error.response?.data.message);
    }
  }
);

export const deleteMyStoreAction = createAsyncThunk(
  "store/deleteMyStoreAction",
  async ( storeId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
    
      const response = await api.get(`/store/${storeId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        } 
      });
      if (response) {
        console.log("success :", response.data);
      }
      return response.data;
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(
        setError({
          message: error.response?.data?.message || "Failed to delete Store",
          status: error.response?.status,
        })
      );
      return thunkAPI.rejectWithValue(error.response?.data.message);
    }
  }
);

export const viewStoreAction = createAsyncThunk(
  "store/viewStoreAction",
  async ( storeId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
    
      const response = await api.get(`/store/${storeId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        } 
      });
      if (response) {
        console.log("success :", response.data);
      }
      return response.data;
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(
        setError({
          message: error.response?.data?.message || "Failed to delete Store",
          status: error.response?.status,
        })
      );
      return thunkAPI.rejectWithValue(error.response?.data.message);
    }
  }
);

export const adminVerifySellerAction = createAsyncThunk(
  "store/adminVerifySellerAction",
  async ( storeId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
    
      const response = await api.get(`/store/${storeId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        } 
      });
      if (response) {
        console.log("success :", response.data);
      }
      return response.data;
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(
        setError({
          message: error.response?.data?.message || "Failed to verify Seller",
          status: error.response?.status,
        })
      );
      return thunkAPI.rejectWithValue(error.response?.data.message);
    }
  }
);

export const adminDeleteSellerAction = createAsyncThunk(
  "store/adminDeleteSellerAction",
  async ( storeId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
    
      const response = await api.get(`/store/${storeId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        } 
      });
      if (response) {
        console.log("success :", response.data);
      }
      return response.data;
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(
        setError({
          message: error.response?.data?.message || "Failed to delete Store",
          status: error.response?.status,
        })
      );
      return thunkAPI.rejectWithValue(error.response?.data.message);
    }
  }
);