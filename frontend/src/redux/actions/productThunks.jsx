import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import api from "../features/api";

export const createProduct = createAsyncThunk(
  'product/create',

  async (productData, { getState, rejectWithValue}) => {
    const {Store} = productData;
    const token = getState().auth.token;

    try {
      const response = await api.post(`/product/create/${Store}`, productData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }

);

export const updateProducts = createAsyncThunk(
  'product/update',
   async (productData, )
)