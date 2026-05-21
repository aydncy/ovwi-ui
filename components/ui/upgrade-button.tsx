"use client";

export function UpgradeButton() {
  const handleCheckout = async () => {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
    });

    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <button
      onClick={handleCheckout}
      className="rounded-xl bg-white px-4 py-2 text-black"
    >
      Upgrade to Pro
    </button>
  );
}
