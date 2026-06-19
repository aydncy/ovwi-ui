'use client';

import { sb } from "@/lib/supabase";

export default function Login() {

  async function signInWithGoogle() {
    await sb.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/dashboard"
      }
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">

      <div className="w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-xl p-8">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Sign In
        </h2>

        {/* GOOGLE LOGIN */}
        <button
          onClick={signInWithGoogle}
          className="w-full flex items-center justify-center gap-3 py-3 mb-4 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition"
        >
          <img
            src="https://www.google.com/favicon.ico"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <div className="text-center text-xs text-slate-500 mb-4">
          OR
        </div>

        {/* EMAIL */}
        <input
          placeholder="Email"
          className="w-full mb-3 p-3 bg-black/40 border border-white/10 rounded"
        />

        <input
          placeholder="Password"
          type="password"
          className="w-full mb-4 p-3 bg-black/40 border border-white/10 rounded"
        />

        <button className="w-full py-3 bg-cyan-600 rounded">
          Sign In
        </button>

      </div>

    </div>
  );
}
