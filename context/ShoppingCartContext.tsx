"use client";
import React, { createContext, useState } from "react";

type ShoppingCartContextProviderProps = {
  children: React.ReactNode;
};

type CartItems = {
  id: number;
  quantity: number;
};

const ShoppingCartContext = createContext({});

function ShoppingCartContextProvider({
  children,
}: ShoppingCartContextProviderProps) {
  const [cartItems, setCartItems] = useState<CartItems[]>([]);

  return (
    <ShoppingCartContext value={{ cartItems }}>{children}</ShoppingCartContext>
  );
}

export default ShoppingCartContextProvider;
