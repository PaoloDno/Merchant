import { createAsyncThunk} from "@reduxjs/toolkit";
import api from "../features/api";

export const createProduct = createAsyncThunk(
  'product/create',

  async (productData, { getState, rejectWithValue}) => {
    
    const token = getState().auth.token;
    try {
      const response = await api.post(`/product/create`, productData, {
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
