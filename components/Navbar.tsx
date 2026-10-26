"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Container from "./Container";
import { useShoppingCartContext } from "@/context/ShoppingCartContext";

function Navbar() {
  const pathname = usePathname();
  const { cartTotalQuantity } = useShoppingCartContext();

  const navLinks = [
    { href: "/", title: "خانه " },
    { href: "/store", title: " فروشگاه " },
    { href: "/dashboard", title: " دشبورد " },
    { href: "/orders", title: "سفارش ها" },
  ];

  return (
    <nav className="shadow p-4">
      <Container>
        <div className="flex flex-row-reverse justify-between font-bold">
          <div>
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`mr-4 ${pathname === item.href ? "text-sky-600" : ""}`}
              >
                {item.title}
              </Link>
            ))}
          </div>
          <div>
            <span>{cartTotalQuantity}</span>
            <Link href="/cart">سبد خرید</Link>
          </div>
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
