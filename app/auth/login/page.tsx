"use client";

import { sb } from "@/lib/supabase";

type Provider = "google" | "github";

export default function LoginPage() {
  const signIn = async (provider: Provider) => {
    await sb.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin + "/dashboard",
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-8 border border-white/10 rounded-2xl bg-black/80 backdrop-blur-md">
        
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Sign In
        </h1>

        <button
          onClick={() => signIn("google")}
          className="w-full mb-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition"
        >
          Continue with Google
        </button>

        <button
          onClick={() => signIn("github")}
          className="w-full mb-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition"
        >
          Continue with GitHub
        </button>

        <p className="text-sm text-center text-white/50">
          Fast login. No passwords needed.
        </p>

      </div>
    </div>
  );
}
