import { ShoppingCart } from "./shoppingCart";

export interface User {
  email: string;
  token: string;
  cart?: ShoppingCart;
}
