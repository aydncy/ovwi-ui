'use client';

import { useEffect, useState } from 'react';
import { safeSupabase as supabase } from '@/lib/supabase-safe';

export default function Dashboard() {
  const [remaining, setRemaining] = useState(0</div>
);

  const [apiKey, setApiKey] = useState(''</div>
);


  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession(</div>
);


      if (!data.session) {
        window.location.href = '/auth/login';
        return;
      }

      // api key çek
      const res = await fetch('/api/create-key', { method: 'POST' }</div>
);

      const k = await res.json(</div>
);


      setApiKey(k.key</div>
);


      runVerify(k.key</div>
);

    };

    init(</div>
);

  }, []</div>
);


  const runVerify = async (key: string) => {
    const res = await fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey: key })
    }</div>
);


    const data = await res.json(</div>
);

    setRemaining(Number(data.remaining) || 0</div>
);

  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      <h1 className="text-5xl font-bold mb-6">Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-4">

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
          <p>Usage</p>
          <h2 className="text-3xl">-</h2>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
          <p>Limit</p>
          <h2 className="text-3xl text-green-400">1000</h2>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
          <p>Plan</p>
          <h2 className="text-3xl text-yellow-400">Pro</h2>
        </div>

      </div>

      <div className="mt-6 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">

        <p className="text-white/60 mb-2">API Key</p>

        <div className="flex gap-2">
          <input value={apiKey} readOnly className="flex-1 p-3 bg-black/40 rounded-xl" />
          <button onClick={() => navigator.clipboard.writeText(apiKey)} className="px-4 bg-cyan-500 rounded-xl">
            Copy
          </button>
        </div>

      </div>

      <div className="mt-6 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">

        <p className="text-white/60 mb-2">Remaining</p>
        <h2 className="text-4xl">{remaining}</h2>

        <button
          onClick={() => runVerify(apiKey)}
          className="mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500"
        >
          Run Verify
        </button>

      </div>

    </div>
  </div>
);

}
