"use client";
import React, { createContext, useContext, useState } from "react";

type ShoppingCartContextProviderProps = {
  children: React.ReactNode;
};

type CartItems = {
  id: number;
  quantity: number;
};

type TShoppingCartContext = {
  cartItems: CartItems[];
};

const ShoppingCartContext = createContext({} as TShoppingCartContext);

export const useShoppingCartContext = () => {
  return useContext(ShoppingCartContext);
};

function ShoppingCartContextProvider({
  children,
}: ShoppingCartContextProviderProps) {
  const [cartItems, setCartItems] = useState<CartItems[]>([]);

  return (
    <ShoppingCartContext value={{ cartItems }}>{children}</ShoppingCartContext>
  );
}

export default ShoppingCartContextProvider;
