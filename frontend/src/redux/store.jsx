import { configureStore } from '@reduxjs/toolkit';
import errorRedcuer from "./reducers/errorSlice";
import authReducer from "./reducers/authSlice";
import themeReducer from "./reducers/themeSlice";
import productReducer from "./reducers/productSlice";
import storeReducer from "./reducers/storeSlice";
import cartReducer from "./reducers/cartSlice";
import reviewReducer from "./reducers/reviewSlice";
import orderReducer from "./reducers/orderSlice";
import adminReducer from "./reducers/adminSlice";

const store = configureStore({
  reducer: {
    error: errorRedcuer,
    auth: authReducer,
    theme: themeReducer,
    store: storeReducer,
    product: productReducer,
    cart: cartReducer,
    review: reviewReducer,
    orderReducer: orderReducer,
    admin: adminReducer
  },
});

export default store;