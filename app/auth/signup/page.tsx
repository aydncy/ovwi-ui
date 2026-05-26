'use client';
import { useEffect } from 'react';
export default function SignupPage() {
  useEffect(() => { window.location.href = '/auth/login'; }, []);
  return null;
}
