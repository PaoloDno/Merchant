import { createSlice } from "@reduxjs/toolkit";
import { createProduct } from "../actions/productThunks";

const initialState = {
  products: [],
  product: {},
  isLoading: false,
  error: null
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(createProduct.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(createProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    })
    .addCase(createProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
  }
})

export default productSlice.reducer;