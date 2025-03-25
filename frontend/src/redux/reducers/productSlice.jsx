import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
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

// Group actions for uniform matching
const productActions = [
  createProductAction,
  getProductByIdAction,
  updateProductByIdAction,
  deleteProductByIdAction,
  getHotProductsActions,
  getProductsByCategoryActions,
  getNewProductsActions,
  getRandomProductsActions
];

const initialState = {
  products: [],
  product: null,
  pagination: { currentPage: 1, totalPages: 0, totalProducts: 0 },
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
        const updatedProduct = action.payload;
        const index = state.products.findIndex((p) => p._id === updatedProduct._id);
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
        if (state.product?._id === updatedProduct._id) {
          state.product = updatedProduct;
        }
      })

      // DELETE PRODUCT
      .addCase(deleteProductByIdAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = state.products.filter((p) => p._id !== action.payload);
        if (state.product?._id === action.payload) {
          state.product = null;
        }
      })

      // FETCH PRODUCT LISTS
      .addCase(getHotProductsActions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
        state.pagination = action.payload.pagination || state.pagination;
      })
      .addCase(getProductsByCategoryActions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
        state.pagination = action.payload.pagination || state.pagination;
      })
      .addCase(getNewProductsActions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
        state.pagination = action.payload.pagination || state.pagination;
      })
      .addCase(getRandomProductsActions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
        state.pagination = action.payload.pagination || state.pagination;
      })

      // Handle all pending actions uniformly
      .addMatcher(
        (action) => productActions.some((thunk) => isPending(thunk)(action)),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )

      // Handle all rejected actions uniformly
      .addMatcher(
        (action) => productActions.some((thunk) => isRejected(thunk)(action)),
        (state, action) => {
          state.isLoading = false;
          state.error = action.error?.message || "Something went wrong";
        }
      );
  },
});

export const { clearProduct, clearError } = productSlice.actions;
export default productSlice.reducer;
