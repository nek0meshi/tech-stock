"use client";

import client from "@/client";
import type { ReactNode } from "react";
import { Provider } from "urql";

interface ClientProviderProps {
  children: ReactNode;
}

export default function ClientProvider({ children }: ClientProviderProps) {
  return <Provider value={client}>{children}</Provider>;
}
