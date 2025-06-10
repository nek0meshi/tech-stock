import type { ReactNode } from "react";

export default function FooterActionContainer({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex gap-2 flex-col sm:flex-row-reverse w-full">
      {children}
    </div>
  );
}
