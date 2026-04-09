'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const apiKey = localStorage.getItem('ovwi_api_key');
    window.location.href = apiKey ? '/dashboard' : '/login';
  }, []);

  return null;
}
