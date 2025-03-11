import { configureStore } from '@reduxjs/toolkit';
import errorRedcuer from "./reducers/errorSlice";
import authReducer from "./reducers/authSlice";
import themeReducer from "./reducers/themeSlice";
import productReducer from "./reducers/productSlice";
import storeReducer from "./reducers/storeSlice";
import cartReducer from "./reducers/cartSlice";

const store = configureStore({
  reducer: {
    error: errorRedcuer,
    auth: authReducer,
    theme: themeReducer,
    store: storeReducer,
    product: productReducer,
    cart: cartReducer,
  },
});

export default store;