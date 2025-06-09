import clsx from "clsx";
import type { ReactNode } from "react";
interface PageTitleProps {
  children: ReactNode;
  className?: string;
}

export default function PageTitle({ children, className }: PageTitleProps) {
  return <h1 className={clsx("text-2xl font-bold", className)}>{children}</h1>;
}
