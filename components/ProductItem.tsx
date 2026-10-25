import Image from "next/image";

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
    <div className="">
      <Image src={image} alt="aa" width="200" height="200" />

      <div className="rtl p-2">
        <h3 className="font-bold"> {title}</h3>
        <p>
          قیمت : <span>{price} تومان</span>
        </p>
      </div>
    </div>
  );
}

export default ProductItem;
