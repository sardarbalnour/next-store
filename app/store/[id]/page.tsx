import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BadgeCheck, PackageCheck, ShieldCheck } from "lucide-react";

import AddToCart from "@/components/AddToCart";
import Container from "@/components/Container";
import type { TProductItemProps } from "@/components/ProductItem";

type ProductProps = {
  params: Promise<{ id: string }>;
};

async function Product({ params }: ProductProps) {
  const { id } = await params;
  const result = await fetch(`http://localhost:3005/products/${id}`);

  if (result.status === 404) {
    notFound();
  }

  if (!result.ok) {
    throw new Error(`Failed to load product ${id}: ${result.status}`);
  }

  const product = (await result.json()) as TProductItemProps;

  return (
    <main dir="rtl" className="min-h-[calc(100vh-76px)] bg-stone-50 py-8 sm:py-12">
      <Container>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav aria-label="مسیر صفحه" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-stone-500">
              <li>
                <Link
                  href="/store"
                  className="transition hover:text-emerald-800"
                >
                  فروشگاه
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="max-w-[65vw] truncate font-medium text-stone-800">
                {product.title}
              </li>
            </ol>
          </nav>

          <article className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm">
            <div className="grid lg:grid-cols-2">
              <div className="relative min-h-72 overflow-hidden bg-stone-100 sm:min-h-[28rem] lg:min-h-[34rem]">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <span className="absolute right-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-emerald-900 shadow-sm backdrop-blur">
                  <BadgeCheck size={17} aria-hidden="true" />
                  محصول فروشگاه
                </span>
              </div>

              <div className="flex flex-col p-6 sm:p-9 lg:p-10">
                <p className="text-sm font-semibold text-emerald-800">
                  انتخابی دوست‌داشتنی از فروشگاه سردار
                </p>
                <h1 className="mt-3 text-3xl font-black leading-tight text-stone-900 sm:text-4xl">
                  {product.title}
                </h1>

                {product.description && (
                  <p className="mt-5 whitespace-pre-line text-base leading-8 text-stone-600">
                    {product.description}
                  </p>
                )}

                <div className="mt-8 rounded-2xl bg-stone-50 p-5">
                  <p className="text-sm font-medium text-stone-500">قیمت محصول</p>
                  <p className="mt-2 text-3xl font-black text-stone-900">
                    {product.price}
                    <span className="mr-2 text-base font-semibold text-stone-500">
                      تومان
                    </span>
                  </p>
                </div>

                <div className="mt-6">
                  <AddToCart id={id} />
                </div>

                <div className="mt-8 grid gap-3 border-t border-stone-100 pt-6 sm:grid-cols-2">
                  <div className="flex items-center gap-3 text-sm text-stone-600">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                      <PackageCheck size={19} aria-hidden="true" />
                    </span>
                    ارسال مطمئن سفارش
                  </div>
                  <div className="flex items-center gap-3 text-sm text-stone-600">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                      <ShieldCheck size={19} aria-hidden="true" />
                    </span>
                    خرید آسان و آسوده
                  </div>
                </div>
              </div>
            </div>
          </article>

          <Link
            href="/store"
            className="mt-6 inline-flex items-center gap-2 rounded-full px-2 py-2 text-sm font-semibold text-stone-600 transition hover:text-emerald-800"
          >
            <ArrowRight size={17} aria-hidden="true" />
            بازگشت به فروشگاه
          </Link>
        </div>
      </Container>
    </main>
  );
}

export default Product;
