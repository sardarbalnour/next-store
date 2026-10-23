"use client";

import { useShoppingCartContext } from "@/context/ShoppingCartContext";

import CartItem from "@/components/CartItem";
import Container from "@/components/Container";

function Cart() {
  const { cartItems } = useShoppingCartContext();

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
          total price : <span>879$</span>
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
