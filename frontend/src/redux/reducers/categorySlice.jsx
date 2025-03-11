import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  createCategoryActions, createSubCategoryActions,
  updateCategoryActions, updateSubCategoryActions,
  deleteCategoryActions, deleteSubCategoryActions, 
  getAllCategoriesActions, getAllSubCategoriesActions,
  getProductByCategoryIdActions, getProductBySubCategoryIdActions, 
  getCategoryByIdActions, getSubCategoryByIdActions,
} from "../actions/categoryThunks";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: null,
    subCategory: null,
    categories: [],
    subcategories: [],
    products: null,
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCategoryActions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.category = action.payload.category;
      })
      .addCase(updateCategoryActions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.category = action.payload.category;
      })
      .addCase(deleteCategoryActions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.category = action.payload.category;
      })
      .addCase(getCategoryByIdActions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.category = action.payload.category;
      })
      .addCase(getAllCategoriesActions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload.categories;
      })
      .addCase(createSubCategoryActions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.category = action.payload.category;
      })
      .addCase(updateSubCategoryActions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.category = action.payload.category;
      })
      .addCase(deleteSubCategoryActions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.category = action.payload.category;
      })
      .addCase(getSubCategoryByIdActions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.category = action.payload.category;
      })
      .addCase(getAllSubCategoriesActions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subcategories = action.payload.subcategories;
      })
      .addCase(getProductByCategoryIdActions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
      })
      .addCase(getProductBySubCategoryIdActions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
      })
      .addMatcher(isPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(isRejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export default categorySlice.reducer;
