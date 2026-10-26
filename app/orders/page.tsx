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

export default async function OrdersPage() {
  const [orders, products] = await Promise.all([getOrders(), getProducts()]);

  return (
    <main className="container mx-auto p-4 rtl">
      <h1 className="mb-6 text-2xl font-bold">سفارش‌های من</h1>

      {orders.length === 0 ? (
        <p>هنوز سفارشی ثبت نکرده‌اید.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const totalPrice = order.cartItems.reduce((total, item) => {
              const product = products.find(
                (product) => String(product.id) === String(item.id)
              );

              if (!product) return total;

              const price = Number(toEnglishDigits(String(product.price)));

              return total + price * item.quantity;
            }, 0);

            return (
              <div key={order.id} className="rounded-lg border p-4 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="font-bold">سفارش شماره: {order.id}</h2>

                  <span className="rounded bg-yellow-100 px-3 py-1 text-sm text-yellow-800">
                    {order.status === "pending"
                      ? "در انتظار بررسی"
                      : order.status}
                  </span>
                </div>

                <p className="mt-3">آدرس: {order.address}</p>

                <h3 className="mt-5 font-semibold">محصولات سفارش</h3>

                {order.cartItems.length === 0 ? (
                  <p className="mt-2 text-gray-500">
                    محصولی در این سفارش وجود ندارد.
                  </p>
                ) : (
                  <div className="mt-3 space-y-3">
                    {order.cartItems.map((item) => {
                      const product = products.find(
                        (product) => String(product.id) === String(item.id)
                      );

                      if (!product) {
                        return (
                          <div key={item.id} className="rounded border p-3">
                            محصول با شناسه {item.id} پیدا نشد.
                          </div>
                        );
                      }

                      const price = Number(
                        toEnglishDigits(String(product.price))
                      );

                      const subtotal = price * item.quantity;

                      return (
                        <div key={item.id} className="rounded border p-3">
                          <p className="font-medium">{product.title}</p>

                          <p className="mt-1 text-sm">
                            قیمت واحد: {price.toLocaleString("en-US")}$
                          </p>

                          <p className="mt-1 text-sm">تعداد: {item.quantity}</p>

                          <p className="mt-1 text-sm">
                            مجموع: {subtotal.toLocaleString("en-US")}$
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="mt-4 border-t pt-4">
                  <p className="text-lg font-bold">
                    مبلغ کل سفارش: {totalPrice.toLocaleString("en-US")}$
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
