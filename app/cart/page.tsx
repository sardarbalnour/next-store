"use client";
import { useEffect, useState } from "react";

import { useShoppingCartContext } from "@/context/ShoppingCartContext";

import CartItem from "@/components/CartItem";
import Container from "@/components/Container";
import { toEnglishDigits } from "@/helper/helper";

import { TProductItemProps } from "@/components/ProductItem";

function Cart() {
  const { cartItems } = useShoppingCartContext();

  const [data, setData] = useState<TProductItemProps[]>([]);

  useEffect(() => {
    const getProduct = async () => {
      const res = await fetch(`http://localhost:3005/products`);
      const data = await res.json();

      setData(data);
    };
    getProduct();
  }, []);

  const totalPrice = cartItems.reduce((total, cartItem) => {
    const product = data.find((item) => item.id === cartItem.id);

    if (!product) return total;

    return total + Number(toEnglishDigits(product.price)) * cartItem.quantity;
  }, 0);

  return (
    <Container>
      <h1 className="rtl my-4">سبد خرید</h1>
      <div>
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      <div className="border shadow-md rtl p-4">
        <h3>
          total price : <span>{totalPrice.toLocaleString("en-US")}$</span>
        </h3>
        <h3>
          soode shoma az in xarid : <span>30$</span>
        </h3>
        <h3>
          qimqte nahayi : <span>849$</span>
        </h3>
        <div>
          <input
            type="text"
            placeholder="discount code"
            className="rtl border"
          />
          <button className="bg-sky-600 text-white px-4 py-1 rounded">
            apply
          </button>
        </div>
      </div>
    </Container>
  );
}

export default Cart;
