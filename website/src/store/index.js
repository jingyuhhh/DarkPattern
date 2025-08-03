import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart";
import behaviorReducer from "./behavior";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    behavior: behaviorReducer,
  },
});

export default store;
