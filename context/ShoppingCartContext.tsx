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
  getProductQuantity: (id: string) => number;
  cartTotalQuantity: number;
  decreaseProductQuantity: (id: string) => void;
  deleteFromCart: (id: string) => void;
};

const ShoppingCartContext = createContext({} as TShoppingCartContext);

export const useShoppingCartContext = () => {
  return useContext(ShoppingCartContext);
};

function ShoppingCartContextProvider({
  children,
}: ShoppingCartContextProviderProps) {
  const [cartItems, setCartItems] = useState<CartItems[]>([]);

  const cartTotalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const getProductQuantity = (id: string) => {
    return cartItems.find((item) => item.id === id)?.quantity ?? 0;
  };

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

  const decreaseProductQuantity = (id: string) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const deleteFromCart = (id: string) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  };

  return (
    <ShoppingCartContext
      value={{
        cartItems,
        handleIncreaseProductQuantity,
        getProductQuantity,
        cartTotalQuantity,
        decreaseProductQuantity,
        deleteFromCart,
      }}
    >
      {children}
    </ShoppingCartContext>
  );
}

export default ShoppingCartContextProvider;
