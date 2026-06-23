"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <html lang="en">
      <body>
        {!isDashboard && <Navbar />}
        {children}
      </body>
    </html>
  );
}
