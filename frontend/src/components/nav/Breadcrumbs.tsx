import type { ReactNode } from "react";

type BreadcrumbsProps = {
  children: ReactNode;
};

const Breadcrumbs = ({ children }: BreadcrumbsProps) => {
  return (
    <div className="breadcrumbs text-sm p-0">
      <ul>{children}</ul>
    </div>
  );
};

export default Breadcrumbs;
