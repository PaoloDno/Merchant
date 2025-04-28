import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  getCartAction,
  addToCartAction,
  updateCartAction,
  removeFromCartAction,
  clearCartAction,
} from "../actions/cartThunks";
import {
  displayUserAction
} from "../actions/authThunks";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: {},
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload.cart;
      })
      .addCase(addToCartAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload.cart;
      })
      .addCase(updateCartAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload.cart;
      })
      .addCase(removeFromCartAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload.cart;
      })
      .addCase(clearCartAction.fulfilled, (state) => {
        state.isLoading = false;
        state.cart = null;
      })
      .addCase(displayUserAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload.cart;
      })

      // Matchers for Pending and Rejected
      .addMatcher(isPending(
          getCartAction,
          addToCartAction,
          updateCartAction,
          removeFromCartAction,
          clearCartAction
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
      })
      .addMatcher(isRejected(
          getCartAction,
          addToCartAction,
          updateCartAction,
          removeFromCartAction,
          clearCartAction
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload || "Something went wrong but this code dont know";
      });
  },
});

export default cartSlice.reducer;