import { createSlice } from "@reduxjs/toolkit";
import { ShoppingCart } from "../models/shoppingCart";

interface CartState {
  cart: ShoppingCart | null;
}

const initialState: CartState = {
  cart: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setShoppingCart: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const { setShoppingCart } = cartSlice.actions;
