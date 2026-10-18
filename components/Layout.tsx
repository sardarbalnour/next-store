import React, { Suspense } from "react";
import Navbar from "./Navbar";

type TLayoutProps = { children: React.ReactNode };

function Layout({ children }: TLayoutProps) {
  return (
    <div>
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      {children}
    </div>
  );
}

export default Layout;
