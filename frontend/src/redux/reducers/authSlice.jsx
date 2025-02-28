import { createSlice } from '@reduxjs/toolkit';
import { loginAction, registerAction, logoutAction } from '../actions/authThunks';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    role: null,
    token: null,
    isLoading: false,
    error: null
  },
  reducers: {
    setUser(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearError (state) {
      state.error = null;
    }
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
      state.isLoading = false;
      console.log(state.user, state.token);
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
      state.isLoading = false;
    })
    .addCase(registerAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(logoutAction.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    });
  }
});

export const {setUser, clearError } = authSlice.actions;
export default authSlice.reducer;