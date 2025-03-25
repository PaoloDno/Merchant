import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  adminGetProfiles,
  adminGetStores,
  adminGetProducts,
  adminGetCategories,
  adminGetSubCategories,
  adminGetReviews,
  adminGetOrders,
} from "../actions/adminThunks";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    profiles: [],
    stores: [],
    products: [],
    categories: [],
    subcategories: [],
    reviews: [],
    orders: [],
    pagination: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          adminGetProfiles.pending,
          adminGetStores.pending,
          adminGetProducts.pending,
          adminGetCategories.pending,
          adminGetSubCategories.pending,
          adminGetReviews.pending,
          adminGetOrders.pending
        ),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          adminGetProfiles.fulfilled,
          adminGetStores.fulfilled,
          adminGetProducts.fulfilled,
          adminGetCategories.fulfilled,
          adminGetSubCategories.fulfilled,
          adminGetReviews.fulfilled,
          adminGetOrders.fulfilled
        ),
        (state, action) => {
          state.loading = false;
          const { pagination, ...data } = action.payload;

          // Determine which key to update
          if (action.type.includes("adminGetProfiles")) state.profiles = data.profiles;
          if (action.type.includes("adminGetStores")) state.stores = data.stores;
          if (action.type.includes("adminGetProducts")) state.products = data.products;
          if (action.type.includes("adminGetCategories")) state.categories = data.categories;
          if (action.type.includes("adminGetSubCategories")) state.subcategories = data.subcategories;
          if (action.type.includes("adminGetReviews")) state.reviews = data.reviews;
          if (action.type.includes("adminGetOrders")) state.orders = data.orders;

          state.pagination = pagination;
        }
      )
      .addMatcher(
        isAnyOf(
          adminGetProfiles.rejected,
          adminGetStores.rejected,
          adminGetProducts.rejected,
          adminGetCategories.rejected,
          adminGetSubCategories.rejected,
          adminGetReviews.rejected,
          adminGetOrders.rejected
        ),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default adminSlice.reducer;
