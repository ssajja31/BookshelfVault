import { createContext, useContext, ReactNode, useState } from "react";
import Cart from "../Components/Cart/Cart";

type CartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
};

// contains cartContext objects as the type
const CartContext = createContext({} as CartContext);

type CartContext = {
  openCart: () => void;
  closeCart: () => void;
  cartQuantity: number;
  cartItems: CartItem[];
  getItemQuantity: (id: number) => number;
  addToCart: (id: number) => void;
};

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  function getItemQuantity(id: number) {
    const foundItem = cartItems.find((book) => book.id === id);
    if (foundItem) {
      return foundItem.quantity;
    } else {
      return 0;
    }
  }

  function addToCart(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  return (
    <CartContext.Provider
      value={{
        getItemQuantity,
        addToCart,
        openCart,
        closeCart,
        cartQuantity,
        cartItems,
      }}
    >
      {children}
      <Cart isCartOpen={isCartOpen} />
    </CartContext.Provider>
  );
}
