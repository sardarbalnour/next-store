"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Menu, ShoppingBag, X } from "lucide-react";
import Cookies from "js-cookie";

import Container from "./Container";
import {
  getAuthState,
  getServerAuthState,
  notifyAuthStateChanged,
  subscribeToAuthState,
} from "@/lib/auth";
import { useShoppingCartContext } from "@/context/ShoppingCartContext";

const navLinks = [
  { href: "/", title: "خانه" },
  { href: "/store", title: "فروشگاه" },
  { href: "/dashboard", title: "داشبورد" },
  { href: "/orders", title: "سفارش‌ها" },
  { href: "/login", title: "ورود" },
];

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { cartTotalQuantity } = useShoppingCartContext();

  const isLoggedIn = useSyncExternalStore(
    subscribeToAuthState,
    getAuthState,
    getServerAuthState
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function isActive(href: string) {
    return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
  }

  function handleLogout() {
    Cookies.remove("token");
    notifyAuthStateChanged();
    setIsMenuOpen(false);
    router.push("/login");
  }

  function renderNavLinks(mobile = false) {
    return navLinks.map((item) => {
      const active = isActive(item.href);

      return (
        <Link
          key={item.href}
          href={item.href}
          aria-current={active ? "page" : undefined}
          onClick={() => setIsMenuOpen(false)}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            active
              ? "bg-emerald-50 text-emerald-900"
              : "text-stone-600 hover:bg-stone-50 hover:text-stone-950"
          } ${mobile ? "block w-full text-right" : ""}`}
        >
          {item.title}
        </Link>
      );
    });
  }

  return (
    <nav
      aria-label="ناوبری اصلی"
      dir="rtl"
      className="sticky top-0 z-50 border-b border-stone-200/80 bg-white/95 shadow-sm shadow-stone-900/[0.03] backdrop-blur"
    >
      <Container>
        <div className="flex min-h-[76px] items-center justify-between gap-4">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800"
            aria-label="صفحه اصلی فروشگاه سردار"
          >
            <span className="flex size-11 items-center justify-center rounded-2xl bg-emerald-800 text-white shadow-sm">
              <ShoppingBag size={21} strokeWidth={2} aria-hidden="true" />
            </span>
            <span className="text-right">
              <span className="block text-base font-black leading-tight text-stone-900">
                فروشگاه سردار
              </span>
              <span className="mt-1 hidden text-xs font-medium text-stone-500 sm:block">
                خریدی راحت، انتخابی دوست‌داشتنی
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {renderNavLinks()}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/cart"
              aria-label={`سبد خرید، ${cartTotalQuantity} کالا`}
              className={`relative inline-flex size-11 items-center justify-center rounded-full border transition ${
                pathname === "/cart"
                  ? "border-emerald-800 bg-emerald-800 text-white"
                  : "border-stone-200 bg-white text-stone-700 hover:border-emerald-800 hover:text-emerald-900"
              }`}
            >
              <ShoppingBag size={19} strokeWidth={1.8} aria-hidden="true" />
              <span className="absolute -left-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-amber-400 px-1 text-[10px] font-bold leading-none text-stone-950">
                {cartTotalQuantity}
              </span>
            </Link>

            {isLoggedIn && (
              <button
                type="button"
                onClick={handleLogout}
                className="hidden h-11 items-center gap-2 rounded-full bg-stone-100 px-4 text-sm font-semibold text-stone-700 transition hover:bg-red-50 hover:text-red-700 sm:inline-flex"
              >
                <LogOut size={16} aria-hidden="true" />
                خروج
              </button>
            )}

            <button
              type="button"
              aria-label={isMenuOpen ? "بستن منو" : "باز کردن منو"}
              aria-expanded={isMenuOpen}
              aria-controls={isMenuOpen ? "mobile-navigation" : undefined}
              onClick={() => setIsMenuOpen((open) => !open)}
              className="inline-flex size-11 items-center justify-center rounded-full border border-stone-200 text-stone-700 transition hover:bg-stone-50 lg:hidden"
            >
              {isMenuOpen ? (
                <X size={20} aria-hidden="true" />
              ) : (
                <Menu size={20} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-stone-100 py-3 lg:hidden"
          >
            <div className="flex flex-col gap-1">{renderNavLinks(true)}</div>
            {isLoggedIn && (
              <button
                type="button"
                onClick={handleLogout}
                className="mt-2 flex w-full items-center gap-2 rounded-full px-4 py-3 text-right text-sm font-semibold text-red-700 transition hover:bg-red-50"
              >
                <LogOut size={16} aria-hidden="true" />
                خروج از حساب
              </button>
            )}
          </div>
        )}
      </Container>
    </nav>
  );
}

export default Navbar;
