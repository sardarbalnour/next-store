"use client";
import React, { createContext, useContext, useState } from "react";

type ShoppingCartContextProviderProps = {
  children: React.ReactNode;
};

type CartItems = {
  id: string;
  quantity: number;
};

type TShoppingCartContext = {
  cartItems: CartItems[];
  handleIncreaseProductQuantity: (id: string) => void;
};

const ShoppingCartContext = createContext({} as TShoppingCartContext);

export const useShoppingCartContext = () => {
  return useContext(ShoppingCartContext);
};

function ShoppingCartContextProvider({
  children,
}: ShoppingCartContextProviderProps) {
  const [cartItems, setCartItems] = useState<CartItems[]>([]);

  const handleIncreaseProductQuantity = (id: string) => {
    setCartItems((currentItems) => {
      const productExists = currentItems.some((item) => item.id === id);

      if (!productExists) {
        return [...currentItems, { id, quantity: 1 }];
      }

      return currentItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
    });
  };

  return (
    <ShoppingCartContext value={{ cartItems, handleIncreaseProductQuantity }}>
      {children}
    </ShoppingCartContext>
  );
}

export default ShoppingCartContextProvider;
