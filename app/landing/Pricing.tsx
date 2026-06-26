'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/mo',
    executions: '50 executions / month',
    features: ['Verifiable execution', 'Full audit logs', 'Community support'],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$49',
    period: '/mo',
    executions: '1,000 executions / month',
    features: [
      'Everything in Free',
      'Workflow engine',
      'Exportable evidence',
      'Email support',
    ],
    cta: 'Get Started',
    highlighted: true,
  },
  {
    name: 'Scale',
    price: '$299',
    period: '/mo',
    executions: '100,000 executions / month',
    features: [
      'Everything in Pro',
      'Compliance controls',
      'Retention policies',
      'Priority support',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-sky-400">
          Pricing
        </p>
        <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Simple, usage-based plans
        </h2>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted">
          Start free, scale as your workflows grow. Every plan includes verifiable logs.
        </p>
      </div>

      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className={`gradient-border relative flex flex-col p-8 ${
              plan.highlighted ? 'glow-primary lg:-translate-y-2' : ''
            }`}
          >
            {plan.highlighted && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 px-3 py-1 text-xs font-semibold text-white shadow-lg shadow-blue-500/40">
                Most popular
              </span>
            )}
            <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-foreground">{plan.price}</span>
              <span className="text-sm text-muted">{plan.period}</span>
            </div>
            <p className="mt-2 text-sm font-medium text-sky-300">{plan.executions}</p>

            <ul className="mt-6 flex-1 space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="/auth/login"
              className={`mt-8 inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 ${
                plan.highlighted
                  ? 'bg-gradient-to-r from-sky-400 to-blue-600 text-white shadow-lg shadow-blue-500/40'
                  : 'border border-white/12 bg-white/5 text-foreground hover:border-white/25 hover:bg-white/10'
              }`}
            >
              {plan.cta}
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
