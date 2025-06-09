import Breadcrumbs from "@/components/nav/Breadcrumbs";
import PageTitle from "@/components/typography/PageTitle";
import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  actions?: ReactNode;
  breadcrumbItems?: ReactNode;
}

export default function PageHeader({
  title,
  actions,
  breadcrumbItems,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col justify-between">
      {breadcrumbItems}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <PageTitle className="w-full sm:w-auto">{title}</PageTitle>
        {actions && (
          <div className="flex justify-end items-center gap-2 w-full sm:w-auto">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
