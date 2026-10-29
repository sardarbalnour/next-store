"use client";

import { useState, type ChangeEvent, type SubmitEvent } from "react";
import {
  BadgeCheck,
  Image as ImageIcon,
  PackagePlus,
  RotateCcw,
  Sparkles,
} from "lucide-react";

import Container from "@/components/Container";

const emptyProduct = {
  title: "",
  price: "",
  image: "",
  description: "",
};

function Dashboard() {
  const [newProduct, setNewProduct] = useState(emptyProduct);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangeProduct = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;

    setNewProduct((currentProduct) => ({
      ...currentProduct,
      [name]: value,
    }));
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleReset = () => {
    setNewProduct(emptyProduct);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleCreateProduct = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    const product = {
      id: Math.floor(Math.random() * 1000),
      title: newProduct.title.trim(),
      price: newProduct.price,
      image: newProduct.image.trim(),
      description: newProduct.description.trim(),
    };

    try {
      const res = await fetch("http://localhost:3005/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!res.ok) {
        throw new Error("Failed to add product");
      }

      await res.json();
      handleReset();
      setSuccessMessage("محصول جدید با موفقیت به فروشگاه اضافه شد.");
    } catch (error) {
      console.error(error);
      setErrorMessage("افزودن محصول با خطا مواجه شد. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClassName =
    "w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-emerald-700 focus:bg-white focus:ring-4 focus:ring-emerald-700/10";

  return (
    <main dir="rtl" className="min-h-[calc(100vh-76px)] bg-stone-50 py-8 sm:py-12">
      <Container>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <header className="mb-8 overflow-hidden rounded-[2rem] bg-[#f4f3e8] px-6 py-8 sm:px-9 sm:py-10">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white/70 px-4 py-2 text-sm font-semibold text-emerald-900">
              <Sparkles size={16} aria-hidden="true" />
              پنل مدیریت فروشگاه
            </p>
            <h1 className="text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">
              افزودن محصول جدید
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
              مشخصات محصول را وارد کنید تا به ویترین فروشگاه اضافه شود.
            </p>
          </header>

          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
            <form
              onSubmit={handleCreateProduct}
              className="space-y-6 rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:p-8"
            >
              <div className="flex items-center gap-3 border-b border-stone-100 pb-5">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800">
                  <PackagePlus size={21} aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-bold text-stone-900">
                    اطلاعات محصول
                  </h2>
                  <p className="mt-1 text-xs text-stone-500">
                    فیلدهای ستاره‌دار را تکمیل کنید
                  </p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="title"
                    className="mb-2 block text-sm font-semibold text-stone-700"
                  >
                    عنوان محصول <span className="text-emerald-800">*</span>
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={newProduct.title}
                    onChange={handleChangeProduct}
                    placeholder="مثلاً کیف دستی"
                    required
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label
                    htmlFor="price"
                    className="mb-2 block text-sm font-semibold text-stone-700"
                  >
                    قیمت (تومان) <span className="text-emerald-800">*</span>
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="any"
                    value={newProduct.price}
                    onChange={handleChangeProduct}
                    placeholder="مثلاً ۲۵۰۰۰۰۰"
                    required
                    className={inputClassName}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="image"
                  className="mb-2 block text-sm font-semibold text-stone-700"
                >
                  آدرس تصویر محصول{" "}
                  <span className="text-emerald-800">*</span>
                </label>
                <div className="relative">
                  <ImageIcon
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400"
                    aria-hidden="true"
                  />
                  <input
                    id="image"
                    name="image"
                    type="url"
                    dir="ltr"
                    value={newProduct.image}
                    onChange={handleChangeProduct}
                    placeholder="https://example.com/image.jpg"
                    required
                    className={`${inputClassName} pr-11 text-left`}
                  />
                </div>
                <p className="mt-2 text-xs leading-5 text-stone-500">
                  لینک مستقیم تصویر محصول را وارد کنید.
                </p>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-semibold text-stone-700"
                >
                  توضیحات محصول
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  value={newProduct.description}
                  onChange={handleChangeProduct}
                  placeholder="ویژگی‌ها و جزئیات محصول را بنویسید..."
                  className={`${inputClassName} resize-y leading-7`}
                />
              </div>

              {successMessage && (
                <p
                  role="status"
                  className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"
                >
                  <BadgeCheck size={18} aria-hidden="true" />
                  {successMessage}
                </p>
              )}
              {errorMessage && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                >
                  {errorMessage}
                </p>
              )}

              <div className="flex flex-col-reverse gap-3 border-t border-stone-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isSubmitting}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-stone-200 bg-white px-6 text-sm font-semibold text-stone-600 transition hover:border-stone-300 hover:bg-stone-50 disabled:opacity-50"
                >
                  <RotateCcw size={16} aria-hidden="true" />
                  پاک کردن فرم
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-800 px-7 text-sm font-bold text-white shadow-sm shadow-emerald-900/15 transition hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800 disabled:cursor-wait disabled:opacity-60"
                >
                  <PackagePlus size={17} aria-hidden="true" />
                  {isSubmitting ? "در حال افزودن..." : "افزودن محصول"}
                </button>
              </div>
            </form>

            <aside className="space-y-4">
              <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                  <Sparkles size={20} aria-hidden="true" />
                </span>
                <h2 className="mt-4 font-bold text-stone-900">
                  نکته‌های ثبت محصول
                </h2>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-stone-600">
                  <li>عنوان کوتاه و واضح برای محصول انتخاب کنید.</li>
                  <li>قیمت را به تومان و به‌صورت عدد وارد کنید.</li>
                  <li>از لینک مستقیم و معتبر برای تصویر استفاده کنید.</li>
                  <li>توضیحات کامل به انتخاب بهتر مشتری کمک می‌کند.</li>
                </ul>
              </section>

              <div className="rounded-3xl bg-emerald-900 p-6 text-emerald-50">
                <p className="text-sm font-bold">آماده انتشار</p>
                <p className="mt-2 text-sm leading-6 text-emerald-100/80">
                  پس از ثبت موفق، محصول جدید به مجموعه فروشگاه اضافه می‌شود.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </Container>
    </main>
  );
}

export default Dashboard;
