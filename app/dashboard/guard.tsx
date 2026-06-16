'use client';
import { useAuthGuard } from '@/components/useAuthGuard';

export default function Guard() {
  useAuthGuard();
  return null;
}
