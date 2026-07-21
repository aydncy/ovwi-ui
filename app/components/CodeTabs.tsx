'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

type Language = 'typescript' | 'python' | 'go' | 'curl';

export default function CodeTabs() {
  const [active, setActive] = useState<Language>('typescript');

  const snippets = {
    typescript: `const run = await ovwi.workflows.trigger(
  "payment_settlement",
  {
    invoice: "INV-1001",
    amount: 100
  }
);`,

    python: `run = ovwi.workflows.trigger(
    "payment_settlement",
    {
        "invoice": "INV-1001",
        "amount": 100
    }
)`,

    go: `client.Workflows.Trigger(
    ctx,
    "payment_settlement",
    payload,
)`,

    curl: `curl -X POST https://ovwi.cyzora.com/api/workflow \
  -H "Authorization: Bearer OVWI_KEY" \
  -H "Content-Type: application/json"`
  };

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-slate-950/80 overflow-hidden">
      <div className="flex border-b border-white/10 p-2 gap-2">
        {Object.keys(snippets).map((lang) => (
          <button
            key={lang}
            onClick={() => setActive(lang as Language)}
            className="relative rounded-md px-3 py-1 text-xs"
          >
            {active === lang && (
              <motion.div
                layoutId="tab"
                className="absolute inset-0 rounded-md bg-white/10"
              />
            )}
            <span className="relative z-10 capitalize">
              {lang}
            </span>
          </button>
        ))}
      </div>

      <pre className="p-6 overflow-x-auto text-sm text-slate-300">
        <code>{snippets[active]}</code>
      </pre>
    </div>
  );
}