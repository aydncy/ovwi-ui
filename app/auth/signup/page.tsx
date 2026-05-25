'use client';
import { useEffect } from 'react';
export default function Signup() {
  useEffect(() => { window.location.href = '/auth/login'; }, []);
  return null;
}
