import { ReactNode } from "react";

interface PageTitleProps {
  children: ReactNode;
}

export default function PageTitle({ children }: PageTitleProps) {
  return <h1 className="text-2xl font-bold">{children}</h1>;
}
