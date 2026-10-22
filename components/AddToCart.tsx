"use client";

import { useShoppingCartContext } from "@/context/ShoppingCartContext";

type AddToCartProps = {
  id: string;
};

function AddToCart({ id }: AddToCartProps) {
  const {
    cartItems,
    handleIncreaseProductQuantity,
    getProductQuantity,
    decreaseProductQuantity,
  } = useShoppingCartContext();
  console.log(cartItems);

  return (
    <div>
      <button
        onClick={() => handleIncreaseProductQuantity(id)}
        className="px-4 py-1.5 rounded-xl bg-sky-300"
      >
        +
      </button>
      <span className="mx-3">{getProductQuantity(id)}</span>
      <button
        onClick={() => decreaseProductQuantity(id)}
        className="px-4 py-1.5 rounded-xl bg-sky-300"
      >
        -
      </button>
    </div>
  );
}

export default AddToCart;
