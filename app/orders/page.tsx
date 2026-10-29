import Link from "next/link";
import {
  ArrowLeft,
  ClipboardList,
  MapPin,
  PackageCheck,
  ShoppingBag,
} from "lucide-react";

import Container from "@/components/Container";
import { toEnglishDigits } from "@/helper/helper";

type TOrder = {
  id: string;
  cartItems: {
    id: string;
    quantity: number;
  }[];
  address: string;
  status: string;
};

type TProduct = {
  id: string;
  title: string;
  price: string | number;
};

async function getOrders(): Promise<TOrder[]> {
  const res = await fetch("http://localhost:3005/orders", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }

  return res.json();
}

async function getProducts(): Promise<TProduct[]> {
  const res = await fetch("http://localhost:3005/products", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

function getStatusLabel(status: string) {
  const labels: Record<string, string> = {
    pending: "در انتظار بررسی",
    processing: "در حال آماده‌سازی",
    shipped: "ارسال شده",
    delivered: "تحویل شده",
    completed: "تکمیل شده",
    cancelled: "لغو شده",
  };

  return labels[status] ?? status;
}

function getStatusStyle(status: string) {
  if (status === "completed" || status === "delivered") {
    return "bg-emerald-50 text-emerald-800 ring-emerald-700/10";
  }

  if (status === "cancelled") {
    return "bg-red-50 text-red-700 ring-red-700/10";
  }

  return "bg-amber-50 text-amber-800 ring-amber-700/10";
}

function formatPrice(price: number) {
  return `${price.toLocaleString("fa-IR")} تومان`;
}

export default async function OrdersPage() {
  const [orders, products] = await Promise.all([getOrders(), getProducts()]);

  return (
    <main dir="rtl" className="min-h-[calc(100vh-76px)] bg-stone-50 py-10 sm:py-14">
      <Container>
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-emerald-800">
                <ClipboardList size={17} aria-hidden="true" />
                فروشگاه سردار
              </p>
              <h1 className="text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">
                سفارش‌های من
              </h1>
              <p className="mt-2 text-stone-500">
                پیگیری سفارش‌ها و جزئیات خرید شما
              </p>
            </div>
            <span className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-600">
              {orders.length.toLocaleString("fa-IR")} سفارش
            </span>
          </header>

          {orders.length === 0 ? (
            <section className="rounded-3xl border border-stone-200 bg-white px-6 py-16 text-center shadow-sm sm:py-20">
              <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800">
                <ShoppingBag size={28} aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-xl font-bold text-stone-900">
                هنوز سفارشی ثبت نکرده‌اید
              </h2>
              <p className="mt-2 text-stone-500">
                بعد از ثبت سفارش، جزئیات آن را همین‌جا می‌توانید ببینید.
              </p>
              <Link
                href="/store"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-emerald-800 px-6 py-3 font-semibold text-white transition hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
              >
                رفتن به فروشگاه
                <ArrowLeft size={16} aria-hidden="true" />
              </Link>
            </section>
          ) : (
            <div className="space-y-5">
              {orders.map((order) => {
                const totalPrice = order.cartItems.reduce((total, item) => {
                  const product = products.find(
                    (product) => String(product.id) === String(item.id)
                  );

                  if (!product) return total;

                  const price = Number(toEnglishDigits(String(product.price)));
                  return total + price * item.quantity;
                }, 0);

                const itemCount = order.cartItems.reduce(
                  (total, item) => total + item.quantity,
                  0
                );

                return (
                  <article
                    key={order.id}
                    className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm"
                  >
                    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 bg-white px-5 py-5 sm:px-7">
                      <div>
                        <p className="text-xs font-medium text-stone-500">
                          شماره سفارش
                        </p>
                        <h2 className="mt-1 font-bold text-stone-900">
                          #{order.id}
                        </h2>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="hidden text-sm text-stone-500 sm:inline">
                          {itemCount.toLocaleString("fa-IR")} کالا
                        </span>
                        <span
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${getStatusStyle(order.status)}`}
                        >
                          {getStatusLabel(order.status)}
                        </span>
                      </div>
                    </header>

                    <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_230px]">
                      <section>
                        <h3 className="mb-3 text-sm font-bold text-stone-800">
                          محصولات سفارش
                        </h3>

                        {order.cartItems.length === 0 ? (
                          <p className="rounded-2xl bg-stone-50 p-4 text-sm text-stone-500">
                            محصولی در این سفارش وجود ندارد.
                          </p>
                        ) : (
                          <ul className="space-y-3">
                            {order.cartItems.map((item) => {
                              const product = products.find(
                                (product) =>
                                  String(product.id) === String(item.id)
                              );

                              if (!product) {
                                return (
                                  <li
                                    key={item.id}
                                    className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4 text-sm text-amber-900"
                                  >
                                    محصول با شناسه {item.id} پیدا نشد.
                                  </li>
                                );
                              }

                              const price = Number(
                                toEnglishDigits(String(product.price))
                              );
                              const subtotal = price * item.quantity;

                              return (
                                <li
                                  key={item.id}
                                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-stone-100 bg-stone-50/70 p-4"
                                >
                                  <div className="min-w-0">
                                    <p className="truncate font-semibold text-stone-900">
                                      {product.title}
                                    </p>
                                    <p className="mt-1 text-sm text-stone-500">
                                      {item.quantity.toLocaleString("fa-IR")}{" "}
                                      عدد · {formatPrice(price)} برای هر عدد
                                    </p>
                                  </div>
                                  <p className="shrink-0 text-sm font-bold text-stone-800">
                                    {formatPrice(subtotal)}
                                  </p>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </section>

                      <aside className="flex flex-col justify-between gap-5 rounded-2xl bg-[#f4f3e8] p-5">
                        <div>
                          <p className="flex items-center gap-2 text-sm font-semibold text-stone-700">
                            <MapPin
                              size={17}
                              className="shrink-0 text-emerald-800"
                              aria-hidden="true"
                            />
                            آدرس تحویل
                          </p>
                          <p className="mt-2 text-sm leading-6 text-stone-600">
                            {order.address || "آدرسی ثبت نشده است"}
                          </p>
                        </div>
                        <div className="border-t border-stone-300/70 pt-4">
                          <p className="text-xs font-medium text-stone-500">
                            مبلغ کل سفارش
                          </p>
                          <p className="mt-1 text-xl font-black text-stone-900">
                            {formatPrice(totalPrice)}
                          </p>
                        </div>
                      </aside>
                    </div>

                    <footer className="flex items-center gap-2 border-t border-stone-100 px-5 py-3 text-xs text-stone-500 sm:px-7">
                      <PackageCheck
                        size={15}
                        className="text-emerald-800"
                        aria-hidden="true"
                      />
                      جزئیات سفارش شما در این صفحه قابل مشاهده است.
                    </footer>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}
