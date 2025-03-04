import { createSlice } from '@reduxjs/toolkit';
import { loginAction, registerAction, logoutAction } from '../actions/authThunks';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    isAdmin: null,
    token: localStorage.getItem('token') || null,
    isLoading: false,
    error: null
  },
  reducers: {
    setToken(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
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
      state.isAdmin = action.payload.isAdmin;
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
      state.isAdmin = action.payload.isAdmin;
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
      state.isAdmin = null;
    });
  }
});

export const {setUser, clearError } = authSlice.actions;
export default authSlice.reducer;