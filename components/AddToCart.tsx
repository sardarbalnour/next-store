"use client";

import { useShoppingCartContext } from "@/context/ShoppingCartContext";

type AddToCartProps = {
  id: string;
};

function AddToCart({ id }: AddToCartProps) {
  const {
    handleIncreaseProductQuantity,
    getProductQuantity,
    decreaseProductQuantity,
    deleteFromCart,
  } = useShoppingCartContext();

  const quantity = getProductQuantity(id);

  return (
    <div className="flex items-center gap-2 w-36">
      <button
        type="button"
        onClick={() => handleIncreaseProductQuantity(id)}
        className={`rounded-xl flex items-center justify-center shrink-0
        bg-green-300 py-1.5 text-sm font-medium
        transition hover:bg-green-400 active:scale-95
        ${quantity === 0 ? "px-4" : "w-14"}`}
      >
        {quantity === 0 ? "افزودن به سبد خرید" : "+"}
      </button>

      {quantity > 0 && (
        <span className="min-w-5 text-center font-semibold tabular-nums">
          {quantity}
        </span>
      )}

      {quantity > 0 &&
        (quantity === 1 ? (
          <button
            type="button"
            onClick={() => deleteFromCart(id)}
            className="rounded-xl w-14 bg-red-600  py-1.5 text-sm font-medium text-white transition hover active"
          >
            حذف
          </button>
        ) : (
          <button
            type="button"
            onClick={() => decreaseProductQuantity(id)}
            className="rounded-xl w-14 bg-red-600  py-1.5 text-sm font-medium text-white transition hover active"
          >
            -
          </button>
        ))}
    </div>
  );
}

export default AddToCart;
