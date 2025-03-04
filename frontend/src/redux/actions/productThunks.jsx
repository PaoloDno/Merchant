import { createAsyncThunk} from "@reduxjs/toolkit";
import api from "../features/api";

export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (productData, thunkAPI) => {  //thunkAPI can be destructured
    const token = thunkAPI.getState().auth.token;
    const user = thunkAPI.getState().auth.isAuthenticated;
    console.log("productThunk: ", token, "user: ", user);
    try {
      const response = await api.post(`/product/`, productData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.log(error);
            thunkAPI.dispatch(setError({
              message: error.response?.data?.message || 'Failed to login',
              status: error.response?.status,
            }))
            return thunkAPI.rejectWithValue(error.response?.data);
    }
  }

);

export const fetchProducts = createAsyncThunk('product/fetchProduct',
  async (_, {thunkAPI}) => {
    try {
      const response = await api.get("/product/");
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(setError({
        message: error.response?.data?.message || 'An error occured',
        status: error.response?.status,
        }))
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async( productId, thunkAPI) => {
    try {
      const response = await api.get(`/product/${productId}`);
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(setError({
        message: error.response?.data?.message || 'An error occured',
        status: error.response?.status,
        }))
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async(productId, productData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      
      const response = await api.put(`/${productId}`, productData, {
        headers: {Authorization: `Bearer ${token}`},
      });

      return response.data;
    } catch(error) {
      thunkAPI.dispatch(setError({
        message: error.response?.data?.message || 'An error occured',
        status: error.response?.status,
        }))
      return thunkAPI.rejectWithValue(error.response.data.message)

    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async( productId, thunkAPI ) => {
    try{
      const token = getState.auth.token;
      await api.delete(`product/${productId}`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      return { success: true, productId };
    } catch (error){
      thunkAPI.dispatch(setError({
        message: error.response?.data?.message || 'An error occured',
        status: error.response?.status,
        }))
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)