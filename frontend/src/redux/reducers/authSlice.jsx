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
    isAdmin: null,
    token: localStorage.getItem("token") || null,
    isLoading: false,
    error: null,
    status: "idle",
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
      .addCase(logoutAction.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.profile = null;
        state.address = null;
        state.isAdmin = null;
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
          state.isLoading = true;
          state.status = "loading";
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          loginAction.fulfilled,
          registerAction.fulfilled
        ),
        (state, action) => {
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.profile = action.payload.profile;
          state.address = action.payload.address;
          state.isAdmin = action.payload.user.isAdmin;
          state.isLoading = false;
          state.status = "succeeded";
        }
      )
      .addMatcher(
        isAnyOf(
          updateProfileAction.fulfilled,
          updateAddressAction.fulfilled,
          displayUserAction.fulfilled
        ),
        (state, action) => {
          state.profile = action.payload.profile || state.profile;
          state.address = action.payload.address || state.address;
          state.isLoading = false;
          state.status = "succeeded";
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
          state.isLoading = false;
          state.status = "failed";
          state.error = action.payload;
        }
      );
  },
});

export const { setUser, clearError } = authSlice.actions;
export default authSlice.reducer;
