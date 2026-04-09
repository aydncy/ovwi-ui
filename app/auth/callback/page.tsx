'use client';

import { useEffect } from 'react';

export default function Callback() {
  useEffect(() => {
    const run = async () => {
      const email = new URLSearchParams(window.location.search).get('email');
      if (!email) return;

      const res = await fetch('/api/create-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      localStorage.setItem('ovwi_api_key', data.apiKey);
      localStorage.setItem('ovwi_user', JSON.stringify({ email }));

      window.location.href = '/dashboard';
    };

    run();
  }, []);

  return null;
}
