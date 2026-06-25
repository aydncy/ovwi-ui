'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { sb } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [apiResponse, setApiResponse] = useState('');
  const [demoLoading, setDemoLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data } = await sb.auth.getUser();
      setUser(data?.user || null);
    };
    load();
  }, []);

  const codeExample = `fetch("https://ovwi.cyzora.com/api/ovwi", {
  method: "POST",
  headers: {
    Authorization: "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    text: "this is a very bad seo text"
  })
})`;

  const runDemo = async () => {
    setDemoLoading(true);
    try {
      const res = await fetch("/api/ovwi", {
        method: "POST",
        headers: {
          Authorization: "Bearer demo_key",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: "this is a very bad seo text"
        }),
      });

      const data = await res.json();
      setApiResponse(JSON.stringify(data, null, 2));
    } catch {
      setApiResponse("Error running demo");
    }

    setDemoLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">

      <h1 className="text-5xl text-center mb-6 font-bold">
        Rank Higher with AI 🚀
      </h1>

      <p className="text-center text-gray-400 mb-8">
        AI API that rewrites your content for SEO and traffic.
      </p>

      <div className="flex justify-center mb-12">
        <Link href={user ? "/dashboard" : "/auth/login"}>
          <button className="px-6 py-3 bg-cyan-500 text-black rounded">
            {user ? "Go to Dashboard" : "Get API Access"}
          </button>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">

        <div className="bg-black border border-white/10 p-4 rounded text-xs text-cyan-400">
          <pre>{codeExample}</pre>
        </div>

        <div className="bg-black border border-white/10 p-4 rounded text-xs text-green-400">

          {demoLoading
            ? "Running real AI request..."
            : apiResponse || "Click Run Demo"}

          <button
            onClick={runDemo}
            className="block mt-4 w-full bg-cyan-500 text-black py-2 rounded"
          >
            Run Demo
          </button>

        </div>

      </div>

    </div>
  );
}
