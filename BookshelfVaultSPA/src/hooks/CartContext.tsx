import { createContext, useContext, ReactNode, useState } from "react";
import Cart from "../Components/Cart/Cart";

type CartProviderProps = {
  children: ReactNode;
};

const CartContext = createContext({} as CartContext);

type CartContext = {
  openCart: () => void;
  closeCart: () => void;
};

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }: CartProviderProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider
      value={{
        openCart,
        closeCart,
      }}
    >
      {children}
      <Cart isCartOpen={isCartOpen} />
    </CartContext.Provider>
  );
}
