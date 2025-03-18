import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  createStoreAction,
  getMyStoreAction,
  updatetMyStoreAction,
  deleteMyStoreAction,
  viewStoreAction,
  adminVerifySellerAction,
  adminDeleteSellerAction,
} from "../actions/storeThunks";

import {
  displayUserAction
} from "../actions/authThunks";

const storeSlice = createSlice({
  name: "store",
  initialState: {
    isLoading: false,
    stores: [],
    error: null,
    store: null,
  },
  reducers: {
    setStore(state, action) {
      state.store = action.payload.store;
    }
  },
  extraReducers: (builder) => {
    builder
      //createStore
      .addCase(createStoreAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createStoreAction.fulfilled, (state, action) => {
        state.store = action.payload.store;
        state.isLoading = false;
      })
      .addCase(createStoreAction.rejected, (state) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //getMyStore
      .addCase(getMyStoreAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMyStoreAction.fulfilled, (state, action) => {
        state.store = action.payload.store;
        state.isLoading = false;
      })
      .addCase(getMyStoreAction.rejected, (state) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //updateMyStore
      .addCase(updatetMyStoreAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatetMyStoreAction.fulfilled, (state, action) => {
        state.store = action.payload.store;
        state.isLoading = false;
      })
      .addCase(updatetMyStoreAction.rejected, (state) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //deleteMyStore
      .addCase(deleteMyStoreAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteMyStoreAction.fulfilled, (state, action) => {
        state.store = null;
        state.isLoading = false;
      })
      .addCase(deleteMyStoreAction.rejected, (state) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //adminVerifyStore
      .addCase(adminVerifySellerAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(adminVerifySellerAction.fulfilled, (state, action) => {
        state.store = action.payload.store;
        state.isLoading = false;
      })
      .addCase(adminVerifySellerAction.rejected, (state) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //adminDeleteSeller
      .addCase(adminDeleteSellerAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(adminDeleteSellerAction.fulfilled, (state) => {
        state.store = null;
        state.isLoading = false;
      })
      .addCase(adminDeleteSellerAction.rejected, (state) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //viewStoreAction
      .addCase(viewStoreAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(viewStoreAction.fulfilled, (state, action) => {
        state.store = action.payload.store;
        state.isLoading = false;
      })
      .addCase(viewStoreAction.rejected, (state) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(displayUserAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stores = action.payload.stores || []; // Save the whole array to `stores`
        state.store = state.stores[0] || null; // Optionally set the first store as the `store`
        state.error = null;
    
        console.log("All Stores:", state.stores);
        console.log("First Store (for convenience):", state.store);
      })
      .addMatcher(
        isAnyOf(
          createStoreAction.pending,
          getMyStoreAction.pending,
          updatetMyStoreAction.pending,
          deleteMyStoreAction.pending,
          viewStoreAction.pending,
          adminVerifySellerAction.pending,
          adminDeleteSellerAction.pending
        ),
        (state) => {
          state.status = "loading";
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          createStoreAction.rejected,
          getMyStoreAction.rejected,
          updatetMyStoreAction.rejected,
          deleteMyStoreAction.rejected,
          viewStoreAction.rejected,
          adminVerifySellerAction.rejected,
          adminDeleteSellerAction.rejected
        ),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        }
      );
  },
});

export const {setStore} = storeSlice.actions
export default storeSlice.reducer;
