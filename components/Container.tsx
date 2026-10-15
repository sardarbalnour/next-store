import React from "react";

type TContainerProps = { children: React.ReactNode };

function Container({ children }: TContainerProps) {
  return <div className="container mx-auto">{children}</div>;
}

export default Container;
