// redux/errorSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

const errorSlice = createSlice({
  name: 'error',
  initialState: {
    isVisible: false,
    message: '',
  },
  reducers: {
    showError: (state, action) => {
      state.isVisible = true;
      state.message = action.payload;
    },
    hideError: (state) => {
      state.isVisible = false;
      state.message = '';
    },
  },
});

export const { showError, hideError } = errorSlice.actions;

export default errorSlice.reducer;
