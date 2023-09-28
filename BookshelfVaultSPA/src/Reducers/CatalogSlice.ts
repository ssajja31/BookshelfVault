import { createSlice } from "@reduxjs/toolkit";

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
