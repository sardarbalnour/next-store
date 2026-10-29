"use client";

import { Minus, Plus, ShoppingBag } from "lucide-react";

import { useShoppingCartContext } from "@/context/ShoppingCartContext";

type AddToCartProps = {
  id: string;
};

function AddToCart({ id }: AddToCartProps) {
  const {
    handleIncreaseProductQuantity,
    getProductQuantity,
    decreaseProductQuantity,
  } = useShoppingCartContext();

  const quantity = getProductQuantity(id);

  if (quantity === 0) {
    return (
      <button
        type="button"
        onClick={() => handleIncreaseProductQuantity(id)}
        className="inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-emerald-800 px-6 py-3.5 font-bold text-white transition hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800 active:scale-[0.99]"
      >
        <ShoppingBag size={19} aria-hidden="true" />
        افزودن به سبد خرید
      </button>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-3">
      <span className="text-sm font-semibold text-emerald-900">
        {quantity.toLocaleString("fa-IR")} عدد در سبد خرید
      </span>
      <div className="inline-flex items-center gap-3 rounded-full border border-emerald-100 bg-white p-1">
        <button
          type="button"
          onClick={() => handleIncreaseProductQuantity(id)}
          aria-label="افزایش تعداد"
          className="inline-flex size-9 items-center justify-center rounded-full bg-emerald-800 text-white transition hover:bg-emerald-900"
        >
          <Plus size={17} aria-hidden="true" />
        </button>
        <span className="min-w-5 text-center font-bold tabular-nums text-stone-800">
          {quantity.toLocaleString("fa-IR")}
        </span>
        <button
          type="button"
          onClick={() => decreaseProductQuantity(id)}
          aria-label="کاهش تعداد"
          className="inline-flex size-9 items-center justify-center rounded-full text-stone-600 transition hover:bg-stone-100"
        >
          <Minus size={17} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export default AddToCart;
