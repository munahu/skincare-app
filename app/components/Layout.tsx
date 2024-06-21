"use client";

import { CartItem } from "../types/product";
import Nav from "./Nav";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

export interface CartContextType {
  cartItems: CartItem[];
  updateCartItems: (cartItems: CartItem[]) => void;
  cartCount: number;
}

export interface CartDisplayType {
  isCartOpen: boolean;
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
}

export const CartItemsContext = createContext<CartContextType | null>(null);
export const CartDisplayContext = createContext<CartDisplayType | null>(null);

export default function Layout({ children }: { children: JSX.Element }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const cartCount = cartItems.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const updateCartItems = (cartItems: CartItem[]) => {
    setCartItems(cartItems);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  return (
    <main className="xl:max-w-screen-2xl m-auto">
      <CartDisplayContext.Provider value={{ isCartOpen, setIsCartOpen }}>
        <CartItemsContext.Provider
          value={{ cartItems, updateCartItems, cartCount }}
        >
          <Nav />
          <section className="px-3 md:px-4 py-3 md:py-4 ">{children}</section>
        </CartItemsContext.Provider>
      </CartDisplayContext.Provider>
    </main>
  );
}
