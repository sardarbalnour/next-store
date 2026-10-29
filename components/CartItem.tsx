"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

import { useShoppingCartContext } from "@/context/ShoppingCartContext";
import { toEnglishDigits } from "@/helper/helper";
import type { TProductItemProps } from "./ProductItem";

type CartItemProps = {
  id: string;
  quantity: number;
  product?: TProductItemProps;
};

const formatPrice = (price: number) =>
  `$${price.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;

function CartItem({ quantity, id, product }: CartItemProps) {
  const {
    handleIncreaseProductQuantity,
    decreaseProductQuantity,
    deleteFromCart,
  } = useShoppingCartContext();

  const unitPrice = product ? Number(toEnglishDigits(product.price)) : 0;

  return (
    <article className="flex flex-col gap-4 rounded-3xl border border-stone-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:p-5">
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl bg-stone-100 sm:aspect-square sm:w-28">
        {product?.image ? (
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, 112px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-stone-400">
            تصویر در دسترس نیست
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1 text-right">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-bold text-stone-900">
              {product?.title ?? "محصول در دسترس نیست"}
            </h2>
            <p className="mt-1 text-sm text-stone-500">
              {product ? formatPrice(unitPrice) : "اطلاعات محصول بارگذاری نشد"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => deleteFromCart(id)}
            aria-label={`حذف ${product?.title ?? "محصول"} از سبد خرید`}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full text-stone-400 transition hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <div
            className="inline-flex items-center gap-3 rounded-full border border-stone-200 bg-stone-50 p-1"
            aria-label="تغییر تعداد"
          >
            <button
              type="button"
              onClick={() => handleIncreaseProductQuantity(id)}
              aria-label="افزایش تعداد"
              className="inline-flex size-8 items-center justify-center rounded-full bg-white text-stone-700 shadow-sm transition hover:bg-emerald-50 hover:text-emerald-800"
            >
              <Plus size={16} aria-hidden="true" />
            </button>
            <span className="min-w-5 text-center text-sm font-bold tabular-nums text-stone-800">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => decreaseProductQuantity(id)}
              aria-label="کاهش تعداد"
              className="inline-flex size-8 items-center justify-center rounded-full bg-white text-stone-700 shadow-sm transition hover:bg-stone-200"
            >
              <Minus size={16} aria-hidden="true" />
            </button>
          </div>

          <p className="text-sm font-bold text-stone-900">
            {formatPrice(unitPrice * quantity)}
          </p>
        </div>
      </div>
    </article>
  );
}

export default CartItem;
