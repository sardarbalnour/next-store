import Link from "next/link";

import Container from "@/components/Container";
import ProductItem, { ProductList } from "@/components/ProductItem";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";

type StoreProps = {
  // params: Promise<{}>;
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

  return (
    <Container>
      <h1 className="text-right py-4">فروشگاه</h1>

      <div className="mb-6 flex justify-end ">
        <Search />
      </div>

      <div className="grid grid-cols-4 rtl gap-4">
        {data.data.map((item) => (
          <Link href={`/store/${item.id}`} key={item.id}>
            <ProductItem {...item} />
          </Link>
        ))}
      </div>

      <Pagination pageCount={data.pages} />
    </Container>
  );
}

export default Store;
