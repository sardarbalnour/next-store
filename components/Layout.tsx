import React from "react";
import Navbar from "./Navbar";

type TLayoutProps = { children: React.ReactNode };

function Layout({ children }: TLayoutProps) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;
