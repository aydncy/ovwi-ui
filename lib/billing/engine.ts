import { NextResponse } from 'next/server';

// Basit billing response simülasyonu
// Gerçek projede burada Redis/DB sorgusu yapılır
export async function billingResponse(email: string | null, increment: boolean = false) {
  // Şimdilik statik değerler dönüyoruz (Redis entegrasyonu sonrası burası değişecek)
  let currentUsage = 12;
  const limit = 50;

  if (increment) {
    currentUsage += 1;
  }

  const remaining = Math.max(0, limit - currentUsage);
  const allowed = currentUsage < limit;

  return {
    ok: allowed,
    usage: currentUsage,
    limit,
    remaining,
    error: allowed ? null : "Limit exceeded"
  };
}
