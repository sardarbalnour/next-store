"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { redirect, usePathname } from "next/navigation";
import Cookies from "js-cookie";

import Container from "./Container";
import { useShoppingCartContext } from "@/context/ShoppingCartContext";

function Navbar() {
  const pathname = usePathname();
  const { cartTotalQuantity } = useShoppingCartContext();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
    setIsLoggedIn(Boolean(Cookies.get("token")));
  }, []);

  const navLinks = [
    { href: "/", title: "خانه " },
    { href: "/store", title: " فروشگاه " },
    { href: "/dashboard", title: " دشبورد " },
    { href: "/orders", title: "سفارش ها" },
    { href: "/login", title: "ورود" },
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
            {isLoggedIn && (
              <button
                onClick={() => {
                  Cookies.remove("token");
                  setIsLoggedIn(false);
                  redirect("/login");
                }}
                className="ml-5 bg-red-600 text-amber-50 px-3 py-1 rounded-xl"
              >
                خروج
              </button>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
