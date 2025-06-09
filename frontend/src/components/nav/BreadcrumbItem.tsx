import Link from "next/link";
import type { ReactNode } from "react";

interface BreadcrumbItemProps {
  children: ReactNode;
  href?: string;
}

const BreadcrumbItem = ({ children, href }: BreadcrumbItemProps) => {
  const className = "truncate";

  return (
    <li className="max-w-full">
      {href ? (
        <Link href={href} className={className}>
          {children}
        </Link>
      ) : (
        <span className={className}>{children}</span>
      )}
    </li>
  );
};

export default BreadcrumbItem;
