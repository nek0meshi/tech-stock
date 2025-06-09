import Link from "next/link";
import type { ReactNode } from "react";

interface BreadcrumbItemProps {
  children: ReactNode;
  href?: string;
}

const BreadcrumbItem = ({ children, href }: BreadcrumbItemProps) => {
  return <li>{href ? <Link href={href}>{children}</Link> : children}</li>;
};

export default BreadcrumbItem;
