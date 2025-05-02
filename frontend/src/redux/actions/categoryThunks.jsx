import { createAsyncThunk } from "@reduxjs/toolkit";
import { setError } from "../reducers/errorSlice";
import api from "../features/api";

export const createCategoryActions = createAsyncThunk(
  "category/createCategoryActions",
  async (categoryData, thunkAPI) => {
    try {
      console.log(categoryData);
      const token = thunkAPI.getState().auth.token;
       
      const response = await api.post("/category/", categoryData, {
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

export const getCategoryByIdActions = createAsyncThunk(
  "category/getCategoryByIdActions",
  async (categoryId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
       
      const response = await api.get(`/category/${categoryId}`, {
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

export const updateCategoryActions = createAsyncThunk(
  "category/updateCategoryActions",
  async (categoryData, thunkAPI) => {
    try {
      const { categoryId } = categoryData;
      const token = thunkAPI.getState().auth.token;
       
      const response = await api.put(`/category/${categoryId}`, categoryData, {
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

export const deleteCategoryActions = createAsyncThunk(
  "category/deleteCategoryActions",
  async (categoryId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
       
      const response = await api.delete(`/category/${categoryId}`, {
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

export const createSubCategoryActions = createAsyncThunk(
  "category/createSubCategoryActions",
  async (categoryData, thunkAPI) => {
    try {
      console.log(categoryData);
      const token = thunkAPI.getState().auth.token;
       
      const response = await api.post("/category/sub", categoryData, {
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

export const getSubCategoryByIdActions = createAsyncThunk(
  "category/getSubCategoryByIdActions",
  async (categoryId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
       
      const response = await api.get(`/category/sub/${categoryId}`, {
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

export const updateSubCategoryActions = createAsyncThunk(
  "category/updateSubCategoryActions",
  async (categoryData, thunkAPI) => {
    try {
      const { categoryId } = categoryData;
      const token = thunkAPI.getState().auth.token;
       
      const response = await api.put(`/category/sub/${categoryId}`, {
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

export const deleteSubCategoryActions = createAsyncThunk(
  "category/deleteSubCategoryActions",
  async (categoryId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
       
      const response = await api.delete(`/category/sub/${categoryId}`, {
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

export const getAllCategoriesActions = createAsyncThunk(
  "category/getAllCategoriesActions",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
       
      const response = await api.post("/category/all", categoryData, {
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

export const getAllSubCategoriesActions = createAsyncThunk(
  "category/getAllSubCategoriesActions",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
       
      const response = await api.post("/category/sub/all", categoryData, {
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

export const getProductByCategoryIdActions = createAsyncThunk(
  "category/getProductByCategoryIdActions",
  async (categoryId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
       
      const response = await api.post(`/category/${categoryId}`, {
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

export const getProductBySubCategoryIdActions = createAsyncThunk(
  "category/getProductBySubCategoryIdActions",
  async (categoryId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
       
      const response = await api.post(`/category/sub/${categoryId}`, {
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
