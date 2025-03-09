import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  createStoreAction, getMyStoreAction, updatetMyStoreAction,
  deleteMyStoreAction, viewStoreAction, adminVerifySellerAction,
  adminDeleteSellerAction,

} from "../actions/storeThunks"

const storeSlice = createSlice({
  name: "store",
  initialState: {
    isLoading: false,
    error: null,
    store: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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
  }


});


export default storeSlice.reducer;