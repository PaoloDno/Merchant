import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  createReviewAction,
  deleteReviewAction,
  getReviewProductAction,
  getReviewUserAction,
} from "../actions/reviewThunks";

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviews: [],
    review: null,
    isLoading: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createReviewAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.review = action.payload.review;
      })
      .addCase(deleteReviewAction.fulfilled, (state) => {
        state.isLoading = false;
        state.review = null;
      })
      .addCase(getReviewProductAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.reviews;
      })
      .addCase(getReviewUserAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.reviews;
      });
  },
});

export default reviewSlice.reducer
