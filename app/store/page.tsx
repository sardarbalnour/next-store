import Link from "next/link";

import Container from "@/components/Container";
import ProductItem, { ProductList } from "@/components/ProductItem";
import Pagination from "@/components/Pagination";

type StoreProps = {
  // params: Promise<{}>;
  searchParams: Promise<{ page?: string; per_page?: string }>;
};

async function Store({ searchParams }: StoreProps) {
  const { page = "1", per_page = "2" } = await searchParams;

  const result = await fetch(
    `http://localhost:3005/products?_page=${page}&_per_page=${per_page}`
  );
  const data = (await result.json()) as ProductList;

  return (
    <Container>
      <h1 className="text-right py-4">فروشگاه</h1>
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
