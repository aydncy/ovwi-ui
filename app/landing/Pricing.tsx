'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

type Plan = {
  name: string;
  price: string;
  period: string;
  tagline: string;
  executions: string;
  features: string[];
  cta: string;
  href: string;
  external: boolean;
  highlighted: boolean;
};

const plans: Plan[] = [
  {
    name: 'Free',
    price: '€0',
    period: '/mo',
    tagline: 'For prototyping and side projects.',
    executions: '50 API requests / month',
    features: ['Verifiable execution', 'Full audit logs', 'API access', 'Community support'],
    cta: 'Start for free',
    href: '/auth/signup',
    external: false,
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '€9',
    period: '/mo',
    tagline: 'For production workloads that need proof.',
    executions: '2,000 API requests / month',
    features: [
      'Full production API access',
      'Faster processing',
      'No demo limitations',
      'Email support',
    ],
    cta: 'Get Pro',
    href: 'https://aydncy.gumroad.com/l/ovwi_pro',
    external: true,
    highlighted: true,
  },
  {
    name: 'Scale',
    price: '€29',
    period: '/mo',
    tagline: 'For teams operating at high volume.',
    executions: '10,000 API requests / month',
    features: [
      'High-volume API usage',
      'Advanced performance',
      'Everything in Pro',
      'Priority support',
    ],
    cta: 'Get Scale',
    href: 'https://aydncy.gumroad.com/l/ovwi_scale',
    external: true,
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-sky-400">
          Pricing
        </p>
        <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Simple, usage-based plans
        </h2>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted">
          Start free, scale as your workflows grow. Every plan includes verifiable logs. No credit card required to start.
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
            <p className="mt-1 text-sm text-muted">{plan.tagline}</p>
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

            {plan.external ? (
              <a
                href={plan.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group mt-8 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-sky-400 to-blue-600 text-white shadow-lg shadow-blue-500/40'
                    : 'border border-white/12 bg-white/5 text-foreground hover:border-white/25 hover:bg-white/10'
                }`}
              >
                {plan.cta}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </a>
            ) : (
              <Link
                href={plan.href}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/10"
              >
                {plan.cta}
              </Link>
            )}
          </motion.div>
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-muted">
        Prices in EUR. Pro and Scale are billed securely via Gumroad. Cancel anytime.
      </p>
    </section>
  );
}
