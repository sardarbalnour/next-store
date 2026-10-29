import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export type TProductItemProps = {
  id: string;
  title: string;
  image: string;
  description: string;
  price: string;
};

export type ProductList = {
  data: TProductItemProps[];
  first: number | null;
  items: number | null;
  last: number | null;
  next: number | null;
  pages: number;
  prev: number | null;
};

function ProductItem({ title, image, price }: TProductItemProps) {
  return (
    <article className="h-full overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:border-emerald-800/20 group-hover:shadow-xl group-hover:shadow-stone-900/10">
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-emerald-900 shadow-sm backdrop-blur">
          محصول فروشگاه
        </span>
      </div>

      <div className="p-4 text-right sm:p-5">
        <h3 className="min-h-12 line-clamp-2 text-base font-bold leading-6 text-stone-900">
          {title}
        </h3>
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-stone-100 pt-4">
          <p className="text-sm font-bold text-stone-900">
            {price} <span className="font-medium text-stone-500">تومان</span>
          </p>
          <span className="inline-flex size-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-800 transition group-hover:bg-emerald-800 group-hover:text-white">
            <ArrowLeft size={17} aria-hidden="true" />
          </span>
        </div>
      </div>
    </article>
  );
}

export default ProductItem;
