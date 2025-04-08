import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../features/api";
import { setError } from "../reducers/errorSlice";

// Helper function to get headers
const getAuthHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Fetch Admin Profiles
export const adminGetProfiles = createAsyncThunk(
  "admin/adminGetProfiles",
  async (
    {
      firstname = "",
      lastname = "",
      page = 1,
      limit = 15,
      sortBy = "createdAt",
      sortOrder = "desc",
    },
    thunkAPI
  ) => {
    const token = thunkAPI.getState().auth.token;
    try {
      const response = await api.get("/admin/profiles", {
        params: { firstname, lastname, page, limit, sortBy, sortOrder },
        ...getAuthHeaders(token),
      });
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(
        setError({
          message: error.response?.data?.message || "An error occurred",
          status: error.response?.status,
        })
      );
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

// Fetch Admin Stores
export const adminGetStores = createAsyncThunk(
  "admin/adminGetStores",
  async (
    {
      storeName = "",
      rating,
      isVerified,
      page = 1,
      limit = 15,
      sortBy = "createdAt",
      sortOrder = "desc",
    },
    thunkAPI
  ) => {
    const token = thunkAPI.getState().auth.token;
    try {
      const response = await api.get("/admin/stores", {
        params: { storeName, rating, isVerified, page, limit, sortBy, sortOrder },
        ...getAuthHeaders(token),
      });
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(
        setError({
          message: error.response?.data?.message || "An error occurred",
          status: error.response?.status,
        })
      );
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

// Fetch Admin Products
export const adminGetProducts = createAsyncThunk(
  "admin/adminGetProducts",
  async (
    {
      productName = "",
      category = "",
      subcategory = "",
      hot = false,
      isNew = false,
      bestSelling = false,
      page = 1,
      limit = 15,
      sortBy = "createdAt",
      sortOrder = "desc",
    },
    thunkAPI
  ) => {
    const token = thunkAPI.getState().auth.token;
    try {
      const response = await api.get("/admin/products", {
        params: { productName, category, subcategory, hot, isNew, bestSelling, page, limit, sortBy, sortOrder },
        ...getAuthHeaders(token),
      });
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(
        setError({
          message: error.response?.data?.message || "An error occurred",
          status: error.response?.status,
        })
      );
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

// Fetch Admin Categories
export const adminGetCategories = createAsyncThunk(
  "admin/adminGetCategories",
  async (
    {
      name = "",
      page = 1,
      limit = 15,
      sortBy = "createdAt",
      sortOrder = "desc",
    },
    thunkAPI
  ) => {
    const token = thunkAPI.getState().auth.token;
    try {
      const response = await api.get("/admin/categories", {
        params: { name, page, limit, sortBy, sortOrder },
        ...getAuthHeaders(token),
      });
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(
        setError({
          message: error.response?.data?.message || "An error occurred",
          status: error.response?.status,
        })
      );
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

// Fetch Admin Subcategories
export const adminGetSubCategories = createAsyncThunk(
  "admin/adminGetSubCategories",
  async ({ 
    name = "",
    page = 1,
    limit = 15,
    sortBy = "createdAt",
    sortOrder = "desc", }, thunkAPI
  ) => {
    const token = thunkAPI.getState().auth.token;
    try {
      const response = await api.get("/admin/subcategories", {
        params: { name, page, limit, sortBy, sortOrder },
        ...getAuthHeaders(token),
      });
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(
        setError({
          message: error.response?.data?.message || "An error occurred",
          status: error.response?.status,
        })
      );
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

// Fetch Admin Reviews
export const adminGetReviews = createAsyncThunk(
  "admin/adminGetReviews",
  async ({ product = "", page = 1, limit = 15 }, thunkAPI
  ) => {
    const token = thunkAPI.getState().auth.token;
    try {
      const response = await api.get("/admin/reviews", {
        params: { product, page, limit },
        ...getAuthHeaders(token),
      });
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(
        setError({
          message: error.response?.data?.message || "An error occurred",
          status: error.response?.status,
        })
      );
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

// Fetch Admin Orders
export const adminGetOrders = createAsyncThunk(
  "admin/adminGetOrders",
  async ({ user = "", page = 1, limit = 15 }, thunkAPI
  ) => {
    const token = thunkAPI.getState().auth.token;
    try {
      const response = await api.get("/admin/orders", {
        params: { user, page, limit },
        ...getAuthHeaders(token),
      });
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(
        setError({
          message: error.response?.data?.message || "An error occurred",
          status: error.response?.status,
        })
      );
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);
