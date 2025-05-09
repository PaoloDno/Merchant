import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../features/api";
import { setError } from "../reducers/errorSlice";

export const getCartAction = createAsyncThunk("cart/getCartAction", async( thunkAPI ) => {
  try {
    console.log("get cart");
    const token = thunkAPI.getState().auth.token;
    const response = await api.get('cart/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("cart:", response.data);
    return response.data;
  } catch (error) {
    thunkAPI.dispatch(setError({
      message: error.response?.data?.message || 'An error occured',
      status: error.response?.status,
    }))
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const addToCartAction = createAsyncThunk("cart/addToCartAction", async ( cartData, thunkAPI) => {
  //cartData: {productId, quantity}
  try {
    console.log("add to cart");
    const token = thunkAPI.getState().auth.token;
    const response = await api.put('cart/add', cartData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    thunkAPI.dispatch(setError({
      message: error.response?.data?.message || 'An error occured',
      status: error.response?.status,
    }))
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const updateCartAction = createAsyncThunk("cart/updateCartAction", async ( cartData, thunkAPI) => {
  //cartData: {productId, quantity}
  try {
    console.log("update cart");
    const token = thunkAPI.getState().auth.token;
    const response = await api.put('cart/updt', cartData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    thunkAPI.dispatch(setError({
      message: error.response?.data?.message || 'An error occured',
      status: error.response?.status,
    }))
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const removeFromCartAction = createAsyncThunk("cart/removeFromCartAction", async ( cartData, thunkAPI) => {
  //cartData: {productId}
  try {
    console.log("remove from cart");
    const token = thunkAPI.getState().auth.token;
    const response = await api.put('cart/remove', cartData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    thunkAPI.dispatch(setError({
      message: error.response?.data?.message || 'An error occured',
      status: error.response?.status,
    }))
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});


export const clearCartAction = createAsyncThunk("cart/clearCartAction", async ( cartData, thunkAPI) => {
  //cartData: {cartId}
  try {
    console.log("clear cart");
    const token = thunkAPI.getState().auth.token;
    const response = await api.put('cart/remove', cartData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    thunkAPI.dispatch(setError({
      message: error.response?.data?.message || 'An error occured',
      status: error.response?.status,
    }))
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});
