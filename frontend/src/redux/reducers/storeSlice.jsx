import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  createStoreAction,
  getMyStoresAction,
  updateMyStoreAction,
  deleteMyStoreAction,
  viewStoreAction,
  adminVerifySellerAction,
  adminDeleteSellerAction,
} from "../actions/storeThunks";

import { displayUserAction } from "../actions/authThunks";

//paginate through stores

const storeSlice = createSlice({
  name: "store",
  initialState: {
    stores: [],
    store: null,
    pagination: { currentPage: 1, totalPages: 0, totalProducts: 0 },
    isLoading: false,
    error: null,
  },
  reducers: {
    setStore(state, action) {
      state.store = action.payload.store;
    },
  },
  extraReducers: (builder) => {
    builder

      // Handle Display User Stores
      .addCase(displayUserAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stores = action.payload.stores || []; // Save all stores
        state.store = state.stores[0] || null; // Default to first store if available
        state.error = null;

        console.log("All Stores:", state.stores);
        console.log("First Store (for convenience):", state.store);
      })
      // Handle Pending Cases
      .addMatcher(
        isAnyOf(
          createStoreAction.pending,
          getMyStoresAction.pending,
          updateMyStoreAction.pending,
          deleteMyStoreAction.pending,
          viewStoreAction.pending,
          adminVerifySellerAction.pending,
          adminDeleteSellerAction.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )

      // Handle Fulfilled Cases
      .addMatcher(
        isAnyOf(
          createStoreAction.fulfilled,
          updateMyStoreAction.fulfilled,
          adminVerifySellerAction.fulfilled,
          viewStoreAction.fulfilled
        ),
        (state, action) => {
          state.store = action.payload.store;
          state.isLoading = false;
        }
      )
      .addMatcher(isAnyOf(getMyStoresAction.fulfilled), (state, action) => {
        state.stores = action.payload;
        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(
          deleteMyStoreAction.fulfilled,
          adminDeleteSellerAction.fulfilled
        ),
        (state) => {
          state.store = null;
          state.isLoading = false;
        }
      )

      // Handle Rejected Cases
      .addMatcher(
        isAnyOf(
          createStoreAction.rejected,
          getMyStoresAction.rejected,
          updateMyStoreAction.rejected,
          deleteMyStoreAction.rejected,
          viewStoreAction.rejected,
          adminVerifySellerAction.rejected,
          adminDeleteSellerAction.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { setStore } = storeSlice.actions;
export default storeSlice.reducer;
