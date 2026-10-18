import Link from "next/link";

import Container from "@/components/Container";
import ProductItem, { TProductItemProps } from "@/components/ProductItem";

async function Store() {
  const result = await fetch("http://localhost:3005/products");
  const data = (await result.json()) as TProductItemProps[];

  return (
    <Container>
      <h1 className="text-right py-4">فروشگاه</h1>
      <div className="grid grid-cols-4 rtl gap-4">
        {data.map((item) => (
          <Link href={`/store/${item.id}`} key={item.id}>
            <ProductItem {...item} />
          </Link>
        ))}
      </div>
    </Container>
  );
}

export default Store;
