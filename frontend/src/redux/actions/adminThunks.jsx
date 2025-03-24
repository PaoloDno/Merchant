import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../features/api";
import { setError } from "../reducers/errorSlice";

export const adminGetProfileAction = createAsyncThunk(
  "admin/adminGetProfileAction",
  async ({ firstname = "", lastname = "", page = 1, limit = 15 }, thunkAPI) => {
    try {
      const response = await api.get("/admin/profile", {
        params: {
          firstname,
          lastname,
          page,
          limit,
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
      return thunkAPI.rejectWithValue(error.response?.data.message);
    }
  }
);

export const adminGetProductAction = createAsyncThunk(
  "admin/adminGetProductAction",
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
    },
    thunkAPI
  ) => {
    try {
      const response = await api.get("/admin/products", {
        params: {
          productName,
          category,
          subcategory,
          hot,
          new: isNew,
          bestSelling,
          page,
          limit,
        },
      });
      return response.data; // Contains products + pagination info
    } catch (error) {
      thunkAPI.dispatch(
        setError({
          message: error.response?.data?.message || "An error occured",
          status: error.response?.status,
        })
      );
      return thunkAPI.rejectWithValue(error.response?.data.message);
    }
  }
);
