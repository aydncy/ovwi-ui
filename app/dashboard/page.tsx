'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { sb } from '@/lib/supabase';

interface UserData {
  plan: string;
  monthly_limit: number;
  monthly_usage: number;
  total_revenue: number;
  api_key: string;
}

export default function Dashboard() {

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [copied, setCopied] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {

    async function fetchData() {

      const { data: authData } = await sb.auth.getUser();

      if (!authData?.user) {
        router.push('/auth/login');
        return;
      }

      setEmail(authData.user.email || '');
      setUserId(authData.user.id);

      const { data } = await sb
        .from('users_licenses')
        .select('*')
        .eq('user_id', authData.user.id)
        .single();

      if (!data) {

        const newApiKey = `sk_live_${Math.random().toString(36).substring(2, 15)}`;

        const { data: newData } = await sb
          .from('users_licenses')
          .insert([
            {
              user_id: authData.user.id,
              plan: 'free',
              api_key: newApiKey,
              monthly_limit: 50,
              monthly_usage: 0,
              total_revenue: 0,
            },
          ])
          .select()
          .single();

        setUserData(newData);

      } else {
        setUserData(data);
      }

      setLoading(false);
    }

    fetchData();

  }, [router]);

  const handleSimulateCall = async () => {

    if (!userData) return;

    if (userData.monthly_usage >= userData.monthly_limit) return;

    const updated = await sb
      .from('users_licenses')
      .update({
        monthly_usage: userData.monthly_usage + 1,
        total_revenue: userData.total_revenue + 0.03,
      })
      .eq('user_id', userId)
      .select()
      .single();

    if (updated.data) setUserData(updated.data);
  };

  if (loading) {
    return <div className="text-white p-10">Loading...</div>;
  }

  const percent = Math.min((userData!.monthly_usage / userData!.monthly_limit) * 100, 100);

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-2xl mb-6">Dashboard</h1>

      <p>{email}</p>

      <p>Usage: {userData!.monthly_usage} / {userData!.monthly_limit}</p>

      <div className="w-full bg-gray-800 h-2 mb-4">
        <div className="bg-cyan-500 h-2" style={{ width: percent + "%" }} />
      </div>

      <button
        onClick={handleSimulateCall}
        className="bg-cyan-500 px-4 py-2 text-black rounded"
      >
        Simulate API Call
      </button>

      <p className="mt-4">
        Revenue: €{userData!.total_revenue.toFixed(2)}
      </p>

      <p className="mt-4">
        API Key: {userData!.api_key}
      </p>

    </div>
  );
}
