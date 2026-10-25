"use client";
import { useEffect, useState } from "react";

import { useShoppingCartContext } from "@/context/ShoppingCartContext";

import CartItem from "@/components/CartItem";
import Container from "@/components/Container";
import { toEnglishDigits } from "@/helper/helper";

import { TProductItemProps } from "@/components/ProductItem";
type DiscountData = {
  id: number;
  code: string;
  percentage: number;
};

function Cart() {
  const { cartItems } = useShoppingCartContext();

  const [data, setData] = useState<TProductItemProps[]>([]);
  const [discountCode, setDiscountCode] = useState("");
  const [finalPrice, setFinalPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);

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

  const handleApplyDiscount = async () => {
    const res = await fetch(
      `http://localhost:3005/discounts?code=${discountCode}`
    );

    const result = (await res.json()) as DiscountData[];

    if (result.length === 0) {
      setFinalPrice(totalPrice);
      setDiscountedPrice(0);
      alert("کد تخفیف معتبر نیست");
      return;
    }

    const discountedPrice = (totalPrice * result[0].percentage) / 100;

    const finalPrice = totalPrice - discountedPrice;

    setFinalPrice(finalPrice);
    setDiscountedPrice(discountedPrice);
  };

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
          قیمت کل : <span>{totalPrice.toLocaleString("en-US")}$</span>
        </h3>
        <h3>
          سود شما از این خرید :
          <span>{discountedPrice.toLocaleString("en-US")}$</span>
        </h3>
        <h3>
          قیمت نهایی : <span>{finalPrice.toLocaleString("en-US")}$</span>
        </h3>
        <div>
          <input
            type="text"
            placeholder="کد تخفیف را وارد کنید"
            className="rtl border"
            onChange={(e) => {
              setDiscountCode(e.target.value);
            }}
          />
          <button
            onClick={handleApplyDiscount}
            className="bg-sky-600 text-white px-4 py-1 rounded"
          >
            اعمال
          </button>
        </div>
      </div>
    </Container>
  );
}

export default Cart;
