import { createSlice } from "@reduxjs/toolkit";

const initialItems = [];

const initialState = {
  items: initialItems,
  number: initialItems.reduce((sum, item) => sum + item.quantity, 0),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const quantityToAdd = item.quantity ?? 1;
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        existing.quantity += quantityToAdd;
      } else {
        state.items.push({ ...item, quantity: quantityToAdd });
      }
      state.number += quantityToAdd;
    },
    decreaseQuantity: (state, action) => {
      const { id } = action.payload;
      const existing = state.items.find((i) => i.id === id);
      if (existing) {
        if (existing.quantity > 1) {
          existing.quantity -= 1;
        } else {
          state.items = state.items.filter((i) => i.id !== id);
        }
        state.number -= 1;
      }
    },
    resetCart: (state) => {
      state.items = [];
      state.number = 0;
    },
  },
});

export const { addToCart, decreaseQuantity, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
