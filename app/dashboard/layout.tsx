"use client";

import DashboardHeader from "@/components/DashboardHeader";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardHeader />
      <main className="p-6">{children}</main>
    </div>
  );
}
