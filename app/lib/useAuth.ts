'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function useAuth(required = false) {
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const e = localStorage.getItem('ovwi_email');

    if (!e && required) {
      router.push('/login');
    }

    setEmail(e);
  }, []);

  return email;
}
