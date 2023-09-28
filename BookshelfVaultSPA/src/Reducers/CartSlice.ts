import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { ShoppingCart } from "../models/shoppingCart";
import agent from "../Api/agent";
import { getCookie } from "../Helpers/helper";

interface CartState {
  cart: ShoppingCart | null;
}

const initialState: CartState = {
  cart: null,
};

export const fetchCartAsync = createAsyncThunk<ShoppingCart>(
  "basket/fetchCartAsync",
  async (_, thunkAPI) => {
    try {
      return await agent.Cart.get();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      if (!getCookie("buyerId")) return false;
    },
  }
);

export const addCartItemAsync = createAsyncThunk<
  ShoppingCart,
  { bookId: string; quantity?: number }
>("cart/addCartItemAsync", async ({ bookId, quantity = 1 }, thunkAPI) => {
  try {
    return await agent.Cart.addItem(bookId, quantity);
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error });
  }
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    clearCart: (state) => {
      state.cart = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(addCartItemAsync.fulfilled, fetchCartAsync.fulfilled),
      (state, action) => {
        state.cart = action.payload;
      }
    );
  },
});

export const { setCart, clearCart } = cartSlice.actions;
