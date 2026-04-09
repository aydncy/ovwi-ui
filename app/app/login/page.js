"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function LoginPage() {
  const [email, setEmail] = useState("");

  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: "123456"
    });

    if (error) {
      await supabase.auth.signUp({
        email,
        password: "123456"
      });
      alert("User created. Click login again.");
    } else {
      window.location.href = "/dashboard";
    }
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #020617, #0f172a)"
    }}>
      <div style={{
        padding: 40,
        borderRadius: 16,
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(10px)",
        width: 320
      }}>
        <h1 style={{ color: "white", marginBottom: 20 }}>
          Login
        </h1>

        <input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 12,
            borderRadius: 8,
            border: "none"
          }}
        />

        <button
          onClick={login}
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 8,
            background: "#3b82f6",
            color: "white",
            border: "none"
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
