import { createSlice } from "@reduxjs/toolkit";
import {
  createProductAction,
  getProductByIdAction,
  updateProductByIdAction,
  deleteProductByIdAction,
} from "../actions/productThunks";

import {
  getHotProductsActions,
  getProductsByCategoryActions,
  getNewProductsActions,
  getRandomProductsActions,
} from "../actions/getProductThunks";

const initialState = {
  products: [],
  product: null,
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearProduct: (state) => {
      state.product = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE PRODUCT
      .addCase(createProductAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.push(action.payload);
        state.product = action.payload.product;
      })

      // FETCH SINGLE PRODUCT
      .addCase(getProductByIdAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
      })

      // UPDATE PRODUCT
      .addCase(updateProductByIdAction.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.products.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })

      // DELETE PRODUCT
      .addCase(deleteProductByIdAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = state.products.filter((p) => p._id !== action.payload);
      })

      // Fetch Product Lists
      .addCase(getHotProductsActions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
      })
      .addCase(getProductsByCategoryActions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
      })
      .addCase(getNewProductsActions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
      })
      .addCase(getRandomProductsActions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
      })

      // Matchers for Pending and Rejected
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.isLoading = false;
          state.error = action.error?.message || "Something went wrong";
        }
      );
  },
});

export const { clearProduct, clearError } = productSlice.actions;
export default productSlice.reducer;
