'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabase } from '@/lib/supabase-browser';

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      const supabase = getSupabase();

      if (!supabase) {
        router.push('/auth/login');
        return;
      }

      try {
        const url = new URL(window.location.href);

        const code = url.searchParams.get('code');

        if (code) {
          const { error } =
            await supabase.auth.exchangeCodeForSession(code);

          if (error) {
            console.error(error);
            router.push('/auth/login?error=exchange_failed');
            return;
          }
        }

        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          router.push('/auth/login?error=no_session');
          return;
        }

        router.push('/dashboard');
      } catch (e) {
        console.error(e);
        router.push('/auth/login?error=callback_error');
      }
    };

    run();
  }, [router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-400">
          Completing sign in...
        </p>
      </div>
    </div>
  );
}