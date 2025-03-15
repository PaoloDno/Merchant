import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  processOrderAction,
  getOrderHistoryUserAction,
  getOrderByIdAction,
  getAllOrderAction,
} from "../actions/orderThunks";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: null,
    orders: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(processOrderAction.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.isLoading = false;
      })
      .addCase(getOrderHistoryUserAction.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.isLoading = false;
      })
      .addCase(getOrderByIdAction.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.isLoading = false;
      })
      .addCase(getAllOrderAction.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.isLoading = false;
      })

      .addMatcher(
        isPending(
          processOrderAction,
          getOrderHistoryUserAction,
          getOrderByIdAction,
          getAllOrderAction
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isRejected(
          processOrderAction,
          getOrderHistoryUserAction,
          getOrderByIdAction,
          getAllOrderAction
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      );
  },
});

export default orderSlice.reducer;