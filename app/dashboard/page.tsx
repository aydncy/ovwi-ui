'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/useAuth';
import { useEffect } from 'react';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth/login');
    }
  }, [user, loading]);

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (!user) return null;

  return (
    <div className="text-center mt-20">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>{user.email}</p>
    </div>
  );
}
