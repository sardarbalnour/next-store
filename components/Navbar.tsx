"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Container from "./Container";

function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", title: "خانه" },
    { href: "/store", title: "فروشگاه" },
  ];

  return (
    <nav className="shadow p-4">
      <Container>
        <div className="flex flex-row-reverse font-bold">
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
      </Container>
    </nav>
  );
}

export default Navbar;
