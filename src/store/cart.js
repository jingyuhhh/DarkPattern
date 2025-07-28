import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Each item: { id, name, price, image, quantity }
  number: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      state.number += 1;
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
    // Optionally, add remove and clear actions here
  },
});

export const { addToCart, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
