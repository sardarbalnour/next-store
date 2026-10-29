import Link from "next/link";
import { ArrowLeft, Leaf, Search as SearchIcon, Sparkles } from "lucide-react";

import Container from "@/components/Container";
import ProductItem, { ProductList } from "@/components/ProductItem";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";

type StoreProps = {
  searchParams: Promise<{ page?: string; per_page?: string; title?: string }>;
};

async function Store({ searchParams }: StoreProps) {
  const { page = "1", per_page = "2", title = "" } = await searchParams;

  const params = new URLSearchParams({
    _page: page,
    _per_page: per_page,
  });

  if (title.trim()) {
    params.set("title", title.trim());
  }

  const result = await fetch(
    `http://localhost:3005/products?${params.toString()}`
  );
  const data = (await result.json()) as ProductList;
  const products = data.data;
  const hasSearch = Boolean(title.trim());

  return (
    <main dir="rtl" className="min-h-[calc(100vh-76px)] bg-stone-50 pb-16">
      <section className="overflow-hidden bg-[#f4f3e8]">
        <Container>
          <div className="grid items-center gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1fr_auto] lg:gap-12 lg:px-10 lg:py-16">
            <div className="max-w-2xl">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white/70 px-4 py-2 text-sm font-semibold text-emerald-900">
                <Sparkles size={16} aria-hidden="true" />
                انتخاب‌هایی برای حال خوب شما
              </p>
              <h1 className="text-3xl font-black leading-tight tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">
                با خیال راحت
                <span className="block text-emerald-800">انتخاب کنید</span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-stone-600 sm:text-lg">
                محصولات فروشگاه را ببینید، جست‌وجو کنید و محصول موردعلاقه‌تان را
                پیدا کنید.
              </p>
            </div>

            <div className="w-full max-w-xl lg:w-[27rem]">
              <Search />
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-stone-600">
                <span className="inline-flex items-center gap-2">
                  <Leaf
                    size={16}
                    className="text-emerald-800"
                    aria-hidden="true"
                  />
                  انتخاب آسان
                </span>
                <span className="inline-flex items-center gap-2">
                  <SearchIcon
                    size={16}
                    className="text-emerald-800"
                    aria-hidden="true"
                  />
                  جست‌وجوی سریع
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <section className="px-4 pt-9 sm:px-6 sm:pt-12 lg:px-10">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-emerald-800">
                {hasSearch ? "نتایج جست‌وجو" : "ویترین فروشگاه"}
              </p>
              <h2 className="mt-1 text-2xl font-black text-stone-900">
                {hasSearch ? `نتایج «${title.trim()}»` : "محصولات"}
              </h2>
            </div>
            <span className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-600">
              {products.length.toLocaleString("fa-IR")} محصول
            </span>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((item) => (
                <Link
                  href={`/store/${item.id}`}
                  key={item.id}
                  className="group rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800"
                >
                  <ProductItem {...item} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-stone-200 bg-white px-6 py-14 text-center shadow-sm">
              <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800">
                <SearchIcon size={24} aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-stone-900">
                محصولی پیدا نشد
              </h3>
              <p className="mt-2 text-sm text-stone-500">
                عبارت دیگری را جست‌وجو کنید یا همه محصولات را ببینید.
              </p>
              <Link
                href="/store"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-800 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-900"
              >
                دیدن همه محصولات
                <ArrowLeft size={16} aria-hidden="true" />
              </Link>
            </div>
          )}

          {data.pages > 1 && <Pagination pageCount={data.pages} />}
        </section>
      </Container>
    </main>
  );
}

export default Store;
