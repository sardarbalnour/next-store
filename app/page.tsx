import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main dir="rtl">
      <section className="overflow-hidden bg-[#f4f3e8]">
        <div className="mx-auto grid min-h-[calc(100svh-64px)] max-w-7xl items-center gap-10 px-6 py-14 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-20">
          <div className="order-2 mx-auto w-full max-w-xl lg:order-2">
            <div className="relative aspect-4/3 overflow-hidden rounded-4xl shadow-xl ring-1 ring-black/5">
              <Image
                src="/animal_raccoon_minimalism_76117_1680x1050.jpg"
                alt="تصویر هنری راکون"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <span className="absolute right-4 top-4 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-stone-800 shadow-sm backdrop-blur">
                انتخابی برای هر سلیقه
              </span>
            </div>
          </div>

          <div className="order-1 text-right lg:order-1">
            <p className="mb-5 inline-flex rounded-full border border-emerald-900/10 bg-white/70 px-4 py-2 text-sm font-semibold text-emerald-900">
              به فروشگاه سردار خوش آمدید
            </p>
            <h1 className="max-w-2xl text-4xl font-black leading-tight tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
              خریدی راحت،
              <span className="mt-2 block text-emerald-800">
                انتخابی دوست‌داشتنی
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">
              محصولات موردعلاقه‌تان را پیدا کنید و با چند قدم ساده، خریدتان را
              شروع کنید.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/store"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-emerald-800 px-7 py-3 font-bold text-white transition hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
              >
                مشاهده فروشگاه
              </Link>
              <Link
                href="/cart"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-stone-300 bg-white/70 px-7 py-3 font-bold text-stone-800 transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-700"
              >
                سبد خرید
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
