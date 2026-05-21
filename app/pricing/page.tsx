export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <h1 className="text-5xl font-bold">
          Simple, usage-based pricing
        </h1>
        <p className="mt-4 text-zinc-400">
          Pay only for what you verify. Built for scale.
        </p>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-xl font-semibold">Starter</h2>
            <p className="mt-2 text-3xl font-bold">$0</p>
            <p className="text-zinc-400">Free tier</p>
          </div>

          <div className="rounded-3xl border border-cyan-400/30 bg-cyan-500/10 p-8">
            <h2 className="text-xl font-semibold">Pro</h2>
            <p className="mt-2 text-3xl font-bold">$49</p>
            <p className="text-zinc-400">per month</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-xl font-semibold">Enterprise</h2>
            <p className="mt-2 text-3xl font-bold">Custom</p>
            <p className="text-zinc-400">contact us</p>
          </div>

        </div>
      </div>
    </main>
  );
}
