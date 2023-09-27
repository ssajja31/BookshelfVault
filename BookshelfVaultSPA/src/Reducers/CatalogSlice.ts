import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../models/category";

interface CatalogState {
  categoryId: number | null;
}

const initialState: CatalogState = {
  categoryId: null,
};

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.categoryId = action.payload;
    },
  },
});

export const { setCategory } = catalogSlice.actions;
