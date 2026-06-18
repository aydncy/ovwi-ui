'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { getSupabase } from '@/lib/supabase-browser';

export default function Navbar() {
  const router = useRouter();
  const supabase = getSupabase();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });
  }, [supabase]);

  async function handleLogout() {
    if (!supabase) return;
    await supabase.auth.signOut();
    router.push('/');
  }

  return (
    <motion.nav
      className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/">
          <motion.div
            className="cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h1 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              OVWI
            </h1>
          </motion.div>
        </Link>

        <div className="flex items-center gap-6 text-sm text-gray-300">
          <Link href="/">
            <motion.span
              className="hover:text-white transition-colors cursor-pointer"
              whileHover={{ y: -2 }}
            >
              Home
            </motion.span>
          </Link>
          <Link href="/docs">
            <motion.span
              className="hover:text-white transition-colors cursor-pointer"
              whileHover={{ y: -2 }}
            >
              Docs
            </motion.span>
          </Link>

          {loading ? (
            <div className="w-4 h-4 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
          ) : user ? (
            <>
              <Link href="/dashboard">
                <motion.span
                  className="hover:text-white transition-colors cursor-pointer"
                  whileHover={{ y: -2 }}
                >
                  Dashboard
                </motion.span>
              </Link>
              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all"
              >
                Sign Out
              </motion.button>
            </>
          ) : (
            <Link href="/auth/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all"
              >
                Sign In
              </motion.button>
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
