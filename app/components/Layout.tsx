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
  totalSavings: number;
  totalCost: number;
}

export type CartContextInfo = Omit<CartContextType, "updateCartItems">;

export interface CartDisplayType {
  isCartOpen: boolean;
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
}

export const CartItemsContext = createContext<CartContextType | null>(null);
export const CartDisplayContext = createContext<CartDisplayType | null>(null);

export default function Layout({
  children,
  showNav = true,
  addContainer = true,
}: {
  children: JSX.Element;
  showNav?: boolean;
  addContainer?: boolean;
}) {
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

  const totalSavings = cartItems?.reduce(
    (totalSavings, item) =>
      totalSavings +
      (item.regularPrice - (item.salePrice ?? item.regularPrice)) *
        item.quantity,
    0
  );

  const costs = cartItems?.map(
    (item) => item.quantity * (item.salePrice ?? item.regularPrice)
  ) as number[];

  const totalCost = costs.reduce((total, current) => total + current, 0);

  return (
    <main className="xl:max-w-screen-2xl m-auto">
      <CartDisplayContext.Provider value={{ isCartOpen, setIsCartOpen }}>
        <CartItemsContext.Provider
          value={{
            cartItems,
            updateCartItems,
            cartCount,
            totalSavings,
            totalCost,
          }}
        >
          {showNav && <Nav />}
          <section className={`${addContainer && `px-3 md:px-4 py-3 md:py-4`}`}>
            {children}
          </section>
        </CartItemsContext.Provider>
      </CartDisplayContext.Provider>
    </main>
  );
}
