import { configureStore } from '@reduxjs/toolkit';
import errorRedcuer from "./reducers/errorSlice";
import authReducer from "./reducers/authSlice";

const store = configureStore({
  reducer: {
    error: errorRedcuer,
    auth: authReducer,
  },
});

export default store;