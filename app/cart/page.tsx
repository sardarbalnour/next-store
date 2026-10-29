"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BadgePercent,
  CheckCircle2,
  LockKeyhole,
  MapPin,
  PackageCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";

import { useShoppingCartContext } from "@/context/ShoppingCartContext";
import CartItem from "@/components/CartItem";
import Container from "@/components/Container";
import type { TProductItemProps } from "@/components/ProductItem";
import { toEnglishDigits } from "@/helper/helper";

type DiscountData = {
  id: number;
  code: string;
  percentage: number;
};

const formatPrice = (price: number) =>
  `$${price.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;

function Cart() {
  const { cartItems, cartTotalQuantity } = useShoppingCartContext();

  const [products, setProducts] = useState<TProductItemProps[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discountError, setDiscountError] = useState("");
  const [isApplyingDiscount, setIsApplyingDiscount] = useState(false);
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");
  const [orderError, setOrderError] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("http://localhost:3005/products");

        if (!res.ok) {
          throw new Error("Failed to load products");
        }

        const result = (await res.json()) as TProductItemProps[];
        setProducts(result);
      } catch (error) {
        console.error(error);
        setProductsError("بارگذاری اطلاعات محصولات با خطا مواجه شد.");
      } finally {
        setIsLoadingProducts(false);
      }
    };

    void getProducts();
  }, []);

  const totalPrice = cartItems.reduce((total, cartItem) => {
    const product = products.find((item) => item.id === cartItem.id);

    if (!product) return total;

    return total + Number(toEnglishDigits(product.price)) * cartItem.quantity;
  }, 0);

  const discountedPrice = (totalPrice * discountPercentage) / 100;
  const finalPrice = totalPrice - discountedPrice;

  const handleApplyDiscount = async () => {
    const code = discountCode.trim();

    if (!code) {
      setDiscountError("کد تخفیف را وارد کنید.");
      setDiscountPercentage(0);
      return;
    }

    setIsApplyingDiscount(true);
    setDiscountError("");

    try {
      const params = new URLSearchParams({ code });
      const res = await fetch(
        `http://localhost:3005/discounts?${params.toString()}`
      );

      if (!res.ok) {
        throw new Error("Failed to validate discount code");
      }

      const result = (await res.json()) as DiscountData[];
      const discount = result[0];

      if (!discount) {
        setDiscountPercentage(0);
        setDiscountError("این کد تخفیف معتبر نیست.");
        return;
      }

      setDiscountPercentage(discount.percentage);
    } catch (error) {
      console.error(error);
      setDiscountPercentage(0);
      setDiscountError("بررسی کد تخفیف با خطا مواجه شد. دوباره تلاش کنید.");
    } finally {
      setIsApplyingDiscount(false);
    }
  };

  const handleSubmitOrder = async () => {
    if (cartItems.length === 0) {
      setOrderError("سبد خرید شما خالی است.");
      return;
    }

    if (!address.trim()) {
      setOrderError("لطفاً آدرس خود را وارد کنید.");
      return;
    }

    setIsSubmitting(true);
    setOrderMessage("");
    setOrderError("");

    try {
      const res = await fetch("http://localhost:3005/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          address: address.trim(),
          status: "pending",
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit order");
      }

      await res.json();
      setOrderMessage("سفارش شما با موفقیت ثبت شد.");
    } catch (error) {
      console.error(error);
      setOrderError("ثبت سفارش با خطا مواجه شد. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main dir="rtl" className="min-h-[calc(100vh-76px)] bg-stone-50 py-10 sm:py-14">
      <Container>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-semibold text-emerald-800">
                فروشگاه سردار
              </p>
              <h1 className="text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">
                سبد خرید شما
              </h1>
              <p className="mt-2 text-stone-500">
                {cartTotalQuantity.toLocaleString("fa-IR")} کالا برای شما آماده است
              </p>
            </div>
            <Link
              href="/store"
              className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-5 py-3 text-sm font-semibold text-stone-700 transition hover:border-emerald-800 hover:text-emerald-800"
            >
              ادامه خرید
              <ArrowLeft size={16} aria-hidden="true" />
            </Link>
          </div>

          {cartItems.length === 0 ? (
            <section className="rounded-3xl border border-stone-200 bg-white px-6 py-16 text-center shadow-sm sm:py-20">
              <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800">
                <ShoppingBag size={28} aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-xl font-bold text-stone-900">
                سبد خریدتان هنوز خالی است
              </h2>
              <p className="mt-2 text-stone-500">
                محصولات موردعلاقه‌تان را پیدا کنید و به سبد خرید اضافه کنید.
              </p>
              <Link
                href="/store"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-emerald-800 px-6 py-3 font-semibold text-white transition hover:bg-emerald-900"
              >
                رفتن به فروشگاه
                <ArrowLeft size={16} aria-hidden="true" />
              </Link>
            </section>
          ) : (
            <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
              <section aria-label="محصولات سبد خرید" className="space-y-4">
                {isLoadingProducts &&
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="h-40 animate-pulse rounded-3xl border border-stone-200 bg-white"
                    />
                  ))}

                {!isLoadingProducts &&
                  !productsError &&
                  cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      {...item}
                      product={products.find((product) => product.id === item.id)}
                    />
                  ))}

                {productsError && (
                  <p
                    role="alert"
                    className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                  >
                    {productsError}
                  </p>
                )}

                <div className="grid gap-3 rounded-3xl border border-stone-200 bg-white p-5 sm:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                      <Truck size={19} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-stone-800">
                        ارسال مطمئن
                      </p>
                      <p className="mt-1 text-xs text-stone-500">
                        سفارش شما با دقت ارسال می‌شود
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                      <PackageCheck size={19} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-stone-800">
                        خرید آسان
                      </p>
                      <p className="mt-1 text-xs text-stone-500">
                        محصولاتت را همین‌جا مدیریت کن
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <aside className="space-y-4 lg:sticky lg:top-24">
                <section className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
                  <h2 className="text-lg font-bold text-stone-900">
                    خلاصه سفارش
                  </h2>

                  <div className="mt-5 flex items-center justify-between text-sm text-stone-600">
                    <span>جمع کالاها</span>
                    <span className="font-semibold text-stone-900">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-stone-600">
                    <span>تخفیف</span>
                    <span className="font-semibold text-emerald-800">
                      {discountedPrice > 0
                        ? `− ${formatPrice(discountedPrice)}`
                        : formatPrice(0)}
                    </span>
                  </div>
                  <div className="my-5 border-t border-dashed border-stone-200" />
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900">مبلغ نهایی</span>
                    <span className="text-xl font-black text-stone-900">
                      {formatPrice(finalPrice)}
                    </span>
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="discount-code"
                      className="mb-2 block text-sm font-semibold text-stone-700"
                    >
                      کد تخفیف
                    </label>
                    <div className="flex gap-2">
                      <div className="relative min-w-0 flex-1">
                        <BadgePercent
                          size={18}
                          aria-hidden="true"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"
                        />
                        <input
                          id="discount-code"
                          type="text"
                          value={discountCode}
                          onChange={(event) => {
                            setDiscountCode(event.target.value);
                            setDiscountPercentage(0);
                            setDiscountError("");
                          }}
                          placeholder="کد تخفیف را وارد کنید"
                          className="w-full rounded-xl border border-stone-200 bg-stone-50 py-3 pr-10 pl-3 text-sm outline-none transition placeholder:text-stone-400 focus:border-emerald-700 focus:bg-white focus:ring-4 focus:ring-emerald-700/10"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleApplyDiscount}
                        disabled={isApplyingDiscount}
                        className="shrink-0 rounded-xl bg-stone-100 px-4 text-sm font-semibold text-stone-700 transition hover:bg-stone-200 disabled:cursor-wait disabled:opacity-60"
                      >
                        {isApplyingDiscount ? "بررسی..." : "اعمال"}
                      </button>
                    </div>
                    {discountError && (
                      <p role="alert" className="mt-2 text-sm text-red-600">
                        {discountError}
                      </p>
                    )}
                    {discountPercentage > 0 && (
                      <p className="mt-2 flex items-center gap-1.5 text-sm text-emerald-800">
                        <CheckCircle2 size={16} aria-hidden="true" />
                        تخفیف {discountPercentage}٪ اعمال شد.
                      </p>
                    )}
                  </div>

                  <div className="mt-6 border-t border-stone-100 pt-5">
                    <label
                      htmlFor="delivery-address"
                      className="mb-2 flex items-center gap-2 text-sm font-semibold text-stone-700"
                    >
                      <MapPin
                        size={17}
                        aria-hidden="true"
                        className="text-stone-400"
                      />
                      آدرس تحویل
                    </label>
                    <textarea
                      id="delivery-address"
                      rows={3}
                      placeholder="آدرس کامل خود را وارد کنید"
                      value={address}
                      onChange={(event) => {
                        setAddress(event.target.value);
                        setOrderError("");
                      }}
                      className="w-full resize-y rounded-xl border border-stone-200 bg-stone-50 p-3 text-sm leading-6 outline-none transition placeholder:text-stone-400 focus:border-emerald-700 focus:bg-white focus:ring-4 focus:ring-emerald-700/10"
                    />
                  </div>

                  {orderError && (
                    <p role="alert" className="mt-3 text-sm text-red-600">
                      {orderError}
                    </p>
                  )}
                  {orderMessage && (
                    <p
                      role="status"
                      className="mt-3 flex items-center gap-2 text-sm text-emerald-800"
                    >
                      <CheckCircle2 size={17} aria-hidden="true" />
                      {orderMessage}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={handleSubmitOrder}
                    disabled={isSubmitting || isLoadingProducts || Boolean(productsError)}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-800 px-5 py-3.5 font-bold text-white transition hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? "در حال ثبت سفارش..." : "ثبت سفارش"}
                    {!isSubmitting && (
                      <ArrowLeft size={17} aria-hidden="true" />
                    )}
                  </button>

                  <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-stone-500">
                    <LockKeyhole size={14} aria-hidden="true" />
                    اطلاعات سفارش شما محفوظ می‌ماند
                  </p>
                </section>
              </aside>
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}

export default Cart;
