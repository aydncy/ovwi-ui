'use client';

import { sb } from "@/lib/supabase";

export default function Login() {

  async function loginGoogle() {
    await sb.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/dashboard"
      }
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">

      <div className="bg-[#0A0A0A] p-8 rounded-xl w-80">

        <h2 className="text-xl mb-4 text-center">
          Sign In
        </h2>

        <button
          onClick={loginGoogle}
          className="w-full bg-white text-black py-2 rounded"
        >
          Continue with Google
        </button>

      </div>

    </div>
  );
}
