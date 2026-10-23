import Image from "next/image";
import { useEffect, useState } from "react";

import { TProductItemProps } from "./ProductItem";

import AddToCart from "./AddToCart";

type CartItemProps = {
  id: string;
  quantity: number;
};

function CartItem({ quantity, id }: CartItemProps) {
  const [data, setData] = useState({} as TProductItemProps);

  useEffect(() => {
    const getProduct = async () => {
      const res = await fetch(`http://localhost:3005/products/${id}`);
      const data = await res.json();

      setData(data);
    };

    getProduct();
  }, [id]);

  return (
    <div className="grid grid-cols-12 bg-slate-100 mb-4">
      <div className="col-span-10 rtl p-4">
        <h2>{data.title}</h2>
        <p>
          tedad : <span>{quantity}</span>
        </p>
        <p>
          price : <span>{data.price}$</span>
        </p>
        <AddToCart id={id} />
      </div>
      <Image
        src={data.image}
        className="col-span-2"
        alt="photo"
        width={250}
        height={200}
      />
    </div>
  );
}

export default CartItem;
