'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabase } from '@/lib/supabase-browser';

export default function Callback() {
  const router = useRouter();
  const supabase = getSupabase();

  useEffect(() => {
    if (!supabase) return;

    const handleCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error || !session) {
          router.push('/auth/login?error=callback_failed');
          return;
        }

        const { data: existingUser } = await supabase
          .from('users_licenses')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        if (!existingUser) {
          const newApiKey = `sk_live_${Math.random().toString(36).substring(2, 15)}`;
          await supabase
            .from('users_licenses')
            .insert([
              {
                user_id: session.user.id,
                plan: 'free',
                api_key: newApiKey,
                monthly_limit: 50,
                monthly_usage: 0,
                total_revenue: 0,
              },
            ]);
        }

        router.push('/dashboard');
      } catch (err) {
        console.error('Callback error:', err);
        router.push('/auth/login?error=callback_error');
      }
    };

    handleCallback();
  }, [supabase, router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-400">Signing you in...</p>
      </div>
    </div>
  );
}
