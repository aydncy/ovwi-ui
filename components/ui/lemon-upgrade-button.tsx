"use client";

import { lemon } from "@/lib/lemon";

export function LemonUpgradeButton({ plan = "pro" }: { plan?: string }) {
  const handleClick = () => {
    let url = "";

    if (plan === "pro") url = lemon.checkout.pro!;
    if (plan === "scale") url = lemon.checkout.scale!;
    if (plan === "enterprise") url = lemon.checkout.enterprise!;

    if (url) window.location.href = url;
  };

  return (
    <button
      onClick={handleClick}
      className="rounded-xl bg-white px-4 py-2 text-black"
    >
      Upgrade
    </button>
  );
}
