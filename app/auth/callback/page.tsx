'use client';

import { useEffect } from "react";

export default function Callback() {

  useEffect(() => {
    // Supabase session otomatik set olur
    window.location.href = "/dashboard";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      Signing you in...
    </div>
  );
}
