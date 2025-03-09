import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  loginAction,
  registerAction,
  logoutAction,
  updateAddressAction,
  updateProfileAction,
  displayUserAction,
} from "../actions/authThunks";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    profile: null,
    address: null,
    token: localStorage.getItem("token") || null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setUser(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.profile = action.payload.profile;
        state.address = action.payload.address;
        state.isLoading = false;
        console.log(state.payload);
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(registerAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.profile = action.payload.profile;
        state.address = action.payload.address;
        state.isLoading = false;
        console.log(state.user, state.token);
      })
      .addCase(registerAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      .addCase(updateAddressAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateAddressAction.fulfilled, (state) => {
        state.address = action.payload.address;
      })
      .addCase(updateAddressAction.rejected, (state) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateProfileAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfileAction.fulfilled, (state) => {
        state.profile = action.payload.profile;
      })
      .addCase(updateProfileAction.rejected, (state) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(displayUserAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(displayUserAction.fulfilled, (state) => {
        state.profile = action.payload.profile;
      })
      .addCase(displayUserAction.rejected, (state) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addMatcher(
        isAnyOf(
          loginAction.pending,
          registerAction.pending,
          updateProfileAction.pending,
          updateAddressAction.pending,
          displayUserAction.pending
        ),
        (state) => {
          state.status = "loading";
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          loginAction.rejected,
          registerAction.rejected,
          updateProfileAction.rejected,
          updateAddressAction.rejected,
          displayUserAction.rejected
        ),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        }
      );
  },
});

export const { setUser, clearError } = authSlice.actions;
export default authSlice.reducer;
