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
    deleteFromCart,
  } = useShoppingCartContext();
  console.log(cartItems);

  return (
    <div>
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
      <button
        className="rounded-lg text-red-50 px-4 py-2 text-sm font-medium
        bg-red-600 transition-colors duration-200 hover:scale-110
        active:bg-red-200 focus-visible:outline-2 mt-2
        focus-visible:outline-offset-2 focus-visible:outline-red-600"
        onClick={() => deleteFromCart(id)}
      >
        حذف
      </button>
    </div>
  );
}

export default AddToCart;
