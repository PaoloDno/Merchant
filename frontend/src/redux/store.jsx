import { configureStore } from '@reduxjs/toolkit';
import errorRedcuer from "./reducers/errorSlice";
import authReducer from "./reducers/authSlice";
import themeReducer from "./reducers/themeSlice";
import productReducer from "./reducers/productSlice";

const store = configureStore({
  reducer: {
    error: errorRedcuer,
    auth: authReducer,
    theme: themeReducer,
    product: productReducer,
  },
});

export default store;