import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { cartSlice } from "./CartSlice";
import { catalogSlice } from "./CatalogSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    catalog: catalogSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
