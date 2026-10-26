"use client";
import { ChangeEvent, useState } from "react";

import Container from "@/components/Container";

function Dashboard() {
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
  });

  const handleChangeProduct = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;

    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleCreateProduct = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const product = {
      id: Math.floor(Math.random() * 1000),
      title: newProduct.title,
      price: newProduct.price,
      image: newProduct.image,
      description: newProduct.description,
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

      const data = await res.json();

      console.log("Product added:", data);
      e.currentTarget.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <div dir="rtl" className="mx-auto w-full max-w-4xl py-8 px-4">
        {/* Page Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold text-blue-600">پنل مدیریت</p>

          <h1 className="text-2xl font-bold text-slate-800">
            افزودن محصول جدید
          </h1>

          <p className="mt-2.5 text-sm text-slate-500">
            اطلاعات محصول جدید را وارد کنید.
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleCreateProduct}
          className="space-y-6 rounded-2xl border border-slate-300
         bg-white p-6 shadow-sm sm:p-8"
        >
          {/* Title & Price */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                عنوان محصول
              </label>

              <input
                id="title"
                name="title"
                type="text"
                placeholder="مثلاً لپ‌تاپ گیمینگ"
                onChange={handleChangeProduct}
                className="w-full rounded-xl border border-slate-300
                 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none
                 transition placeholder:text-slate-400 focus:border-blue-500
                 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                قیمت (تومان)
              </label>

              <input
                id="price"
                name="price"
                type="number"
                min="0"
                placeholder="مثلاً ۲۵۰۰۰۰۰"
                onChange={handleChangeProduct}
                className="w-full rounded-xl border border-slate-300
                 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none
                 transition placeholder:text-slate-400 focus:border-blue-500
                 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label
              htmlFor="image"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              آدرس تصویر محصول
            </label>

            <input
              id="image"
              name="image"
              type="url"
              placeholder="https://example.com/image.jpg"
              onChange={handleChangeProduct}
              className="w-full rounded-xl border border-slate-300
               bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none
               transition placeholder:text-slate-400 focus:border-blue-500
               focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              توضیحات محصول
            </label>

            <textarea
              id="description"
              name="description"
              rows={5}
              placeholder="توضیحات محصول را وارد کنید..."
              onChange={handleChangeProduct}
              className="w-full resize-y rounded-xl border border-slate-300
               bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-800 
               outline-none transition placeholder:text-slate-400
               focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          {/* Actions */}
          <div
            className="flex flex-col-reverse gap-3 border-t
           border-slate-100 pt-6 sm:flex-row sm:justify-end"
          >
            <button
              type="reset"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 
              text-sm font-semibold text-slate-600 transition-all duration-200
              hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 active:scale-95"
            >
              پاک کردن فرم
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-8 py-3 text-sm font-semibold
               text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700 
               focus:outline-none focus:ring-4 focus:ring-blue-500/20 active:scale-[0.98]"
            >
              + افزودن محصول
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default Dashboard;
