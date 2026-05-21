import { UpgradeButton } from "@/components/ui/upgrade-button";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <h1 className="text-5xl font-bold">Simple pricing</h1>
        <p className="mt-4 text-zinc-400">
          Start free, scale with usage
        </p>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2>Free</h2>
            <p className="text-3xl">$0</p>
          </div>

          <div className="rounded-3xl border border-cyan-400/30 bg-cyan-500/10 p-8">
            <h2>Pro</h2>
            <p className="text-3xl">$49/mo</p>
            <div className="mt-4">
              <UpgradeButton />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2>Enterprise</h2>
            <p className="text-3xl">Custom</p>
          </div>
        </div>
      </div>
    </main>
  );
}
