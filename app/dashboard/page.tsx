'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getSupabase } from '@/lib/supabase-browser';

interface UserData {
  id?: string;
  plan: string;
  monthly_limit: number;
  monthly_usage: number;
  total_revenue: number;
  api_key: string;
  user_id?: string;
}

export default function Dashboard() {
  const router = useRouter();
  const supabase = getSupabase();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [copied, setCopied] = useState(false);
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!supabase) {
      console.error('Supabase not initialized');
      setLoading(false);
      return;
    }

    const initDashboard = async () => {
      try {
        console.log('Fetching user...');
        const { data: authData, error: authError } = await supabase.auth.getUser();

        if (authError) {
          console.error('Auth error:', authError);
          setError('Authentication failed');
          router.push('/auth/login');
          return;
        }

        if (!authData.user) {
          console.log('No user found, redirecting to login');
          router.push('/auth/login');
          return;
        }

        console.log('User authenticated:', authData.user.id, authData.user.email);
        setEmail(authData.user.email || '');
        setUserId(authData.user.id);

        console.log('Fetching user license data...');
        const { data: licenseData, error: licenseError } = await supabase
          .from('users_licenses')
          .select('*')
          .eq('user_id', authData.user.id)
          .single();

        if (licenseError) {
          console.log('License not found, creating new one...');

          if (licenseError.code === 'PGRST116') {
            const newApiKey = `sk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;

            const { data: newLicense, error: createError } = await supabase
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

            if (createError) {
              console.error('Error creating license:', createError);
              setError('Failed to create license');
            } else {
              console.log('License created successfully:', newLicense);
              setUserData(newLicense);
            }
          } else {
            console.error('License fetch error:', licenseError);
            setError('Failed to fetch license data');
          }
        } else {
          console.log('License data fetched:', licenseData);
          setUserData(licenseData);
        }
      } catch (err) {
        console.error('Dashboard initialization error:', err);
        setError('An error occurred');
      } finally {
        setLoading(false);
      }
    };

    initDashboard();
  }, [supabase, router]);

  const handleSimulateCall = async () => {
    if (!supabase || !userData || !userId) {
      console.error('Missing required data for simulation');
      return;
    }

    if (userData.monthly_usage >= userData.monthly_limit) {
      console.log('User has reached monthly limit');
      return;
    }

    try {
      console.log('Simulating API call...');
      const newUsage = userData.monthly_usage + 1;
      const newRevenue = userData.total_revenue + 0.03;

      const { data: updated, error: updateError } = await supabase
        .from('users_licenses')
        .update({
          monthly_usage: newUsage,
          total_revenue: newRevenue,
        })
        .eq('user_id', userId)
        .select()
        .single();

      if (updateError) {
        console.error('Error updating usage:', updateError);
      } else {
        console.log('Usage updated:', updated);
        setUserData(updated);
      }

      const { error: callError } = await supabase.from('api_calls').insert([
        {
          user_id: userId,
          endpoint: 'POST /api/ovwi',
          status: 200,
        },
      ]);

      if (callError) {
        console.error('Error inserting API call:', callError);
      }
    } catch (err) {
      console.error('Error simulating call:', err);
    }
  };

  const copyApiKey = () => {
    if (userData?.api_key) {
      navigator.clipboard.writeText(userData.api_key);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-12 h-12 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">{error}</p>
          <Link href="/auth/login">
            <button className="px-6 py-2 bg-cyan-600 text-white rounded-lg font-semibold">
              Back to Login
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const percent = userData ? Math.min((userData.monthly_usage / userData.monthly_limit) * 100, 100) : 0;
  const isLimitReached = userData ? userData.monthly_usage >= userData.monthly_limit : false;

  const getPlanUpgradeLink = () => {
    if (userData?.plan === 'free') {
      return 'https://aydncy.gumroad.com/l/ovwi_pro';
    } else if (userData?.plan === 'pro') {
      return 'https://aydncy.gumroad.com/l/ovwi_scale';
    }
    return '#';
  };

  const getUpgradeText = () => {
    if (userData?.plan === 'free') return 'Upgrade to Pro';
    if (userData?.plan === 'pro') return 'Upgrade to Scale';
    return 'Contact Sales';
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/10 blur-3xl rounded-full"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
            Dashboard
          </h1>
          <p className="text-slate-400">{email}</p>
        </motion.div>

        {!userData ? (
          <div className="text-center">
            <p className="text-slate-400">Loading your data...</p>
          </div>
        ) : (
          <>
            <motion.div
              className="grid md:grid-cols-3 gap-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ staggerChildren: 0.1 }}
            >
              <motion.div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-500/30 rounded-2xl p-8">
                <p className="text-sm text-slate-400 uppercase tracking-wider">API Requests</p>
                <div className="text-5xl font-bold mt-4 text-cyan-400">
                  {userData.monthly_usage}
                  <span className="text-2xl text-slate-500">/{userData.monthly_limit}</span>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-slate-400">Usage Progress</span>
                    <span className={`font-bold ${isLimitReached ? 'text-red-400' : 'text-cyan-400'}`}>
                      {percent.toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-slate-900/50 rounded-full overflow-hidden border border-white/10">
                    <motion.div
                      className={`h-full rounded-full ${isLimitReached ? 'bg-red-500' : 'bg-gradient-to-r from-cyan-500 to-blue-600'}`}
                      animate={{ width: `${percent}%` }}
                      transition={{ duration: 0.5 }}
                      style={{
                        boxShadow: isLimitReached
                          ? '0 0 20px rgba(239, 68, 68, 0.5)'
                          : '0 0 20px rgba(34, 211, 238, 0.5)',
                      }}
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/30 rounded-2xl p-8">
                <p className="text-sm text-slate-400 uppercase tracking-wider">Total Revenue</p>
                <div className="text-5xl font-bold mt-4 text-emerald-400">
                  €{userData.total_revenue.toFixed(2)}
                </div>
                <p className="text-xs text-slate-500 mt-6">This month</p>
              </motion.div>

              <motion.div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/30 rounded-2xl p-8">
                <p className="text-sm text-slate-400 uppercase tracking-wider">Your Plan</p>
                <div className="text-3xl font-bold mt-4 text-blue-400 uppercase">
                  {userData.plan}
                </div>
                <p className="text-xs text-slate-500 mt-6">
                  {userData.plan === 'free' && '50 requests/month'}
                  {userData.plan === 'pro' && '2,000 requests/month'}
                  {userData.plan === 'scale' && '10,000 requests/month'}
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 border border-cyan-500/20 rounded-2xl p-8 mb-12"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Your API Key</h2>
                  <p className="text-slate-400 text-sm mt-1">Use this to authenticate your API requests</p>
                </div>
                <motion.button
                  onClick={copyApiKey}
                  whileHover={{ scale: 1.05 }}
                  className="px-6 py-2 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/50 text-cyan-400 font-semibold text-sm transition-all"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </motion.button>
              </div>

              <div className="bg-slate-950 border border-white/10 rounded-lg p-4 font-mono text-sm text-cyan-400 overflow-x-auto break-all">
                {userData.api_key}
              </div>

              {isLimitReached && (
                <motion.div
                  className="mt-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="font-semibold">Usage limit reached</p>
                  <p className="text-sm mt-1">Upgrade your plan to continue using the API</p>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, staggerChildren: 0.1 }}
            >
              <motion.div className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 border border-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-4">Test Your Integration</h3>
                <p className="text-slate-400 text-sm mb-6">
                  Click below to simulate an API call. Each call will increment your usage counter.
                </p>

                <motion.button
                  onClick={handleSimulateCall}
                  disabled={isLimitReached}
                  whileHover={!isLimitReached ? { scale: 1.05, y: -2 } : {}}
                  whileTap={!isLimitReached ? { scale: 0.95 } : {}}
                  className={`w-full py-3 rounded-xl font-bold text-lg transition-all ${
                    isLimitReached
                      ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white cursor-not-allowed animate-pulse'
                      : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]'
                  }`}
                >
                  {isLimitReached ? 'Upgrade to Continue' : 'Simulate API Call'}
                </motion.button>

                {isLimitReached && (
                  <Link href={getPlanUpgradeLink()}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="w-full mt-3 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                    >
                      {getUpgradeText()}
                    </motion.button>
                  </Link>
                )}
              </motion.div>

              <motion.div className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 border border-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-4">Documentation</h3>
                <p className="text-slate-400 text-sm mb-6">
                  Learn how to integrate OVWI into your API and start building verifiable workflows.
                </p>

                <Link href="/docs">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="w-full py-3 rounded-xl border border-cyan-500/50 bg-cyan-500/10 text-cyan-400 font-bold hover:bg-cyan-500/20 transition-all"
                  >
                    Read Docs
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
