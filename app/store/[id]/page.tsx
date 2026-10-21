import Image from "next/image";

import Container from "@/components/Container";
import { TProductItemProps } from "@/components/ProductItem";
import AddToCart from "@/components/AddToCart";

type ProductProps = {
  params: Promise<{ id: string }>;
  // searchParams: Promise<{}>;
};

async function Product({ params }: ProductProps) {
  const { id } = await params;
  // for server components and we dont need useParams
  // we just need await cause its promise

  const result = await fetch(`http://localhost:3005/products/${id}`);
  const data = (await result.json()) as TProductItemProps;

  return (
    <Container>
      <div className="grid grid-cols-12 mt-8 shadow-md">
        <div className="col-span-9 rtl p-4 ">
          <h2 className="font-bold text-2xl">{data.title}</h2>
          <p className="text-gray-700">{data.description}</p>
          <p>
            قیمت :<span>${data.price}</span>
          </p>
          <AddToCart id={id}/>
        </div>
        <div className="col-span-3">
          <Image src={data.image} alt="" width={300} height={200} />
        </div>
      </div>
    </Container>
  );
}

export default Product;
