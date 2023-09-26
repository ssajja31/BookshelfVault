import { Item } from "./item";

export interface ShoppingCart {
  id: number;
  buyerId: string;
  items: Item[];
}
