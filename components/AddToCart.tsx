"use client";

import { useShoppingCartContext } from "@/context/ShoppingCartContext";

function AddToCart() {
  const { cartItems } = useShoppingCartContext();

  return (
    <div>
      <button className="px-4 py-1.5 rounded-xl bg-sky-300">+</button>
      <span className="mx-3">3</span>
      <button className="px-4 py-1.5 rounded-xl bg-sky-300">-</button>
    </div>
  );
}

export default AddToCart;
