import { configureStore } from '@reduxjs/toolkit';
import errorRedcuer from "./reducers/errorSlice";
import authReducer from "./reducers/authSlice";
import themeReducer from "./reducers/themeSlice";

const store = configureStore({
  reducer: {
    error: errorRedcuer,
    auth: authReducer,
    theme: themeReducer
  },
});

export default store;