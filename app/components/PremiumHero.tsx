'use client'

export default function PremiumHero() {
  return (
    <section className="relative overflow-hidden">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_40%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 pt-28 pb-24">

        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-300 text-sm backdrop-blur-xl">
          ENTERPRISE AI VERIFICATION
        </div>

        <h1 className="mt-10 text-7xl md:text-8xl font-black tracking-tight leading-[0.95] max-w-5xl">
          Verify Identity
          <br />
          With Premium
          <span className="text-emerald-400"> AI Infrastructure</span>
        </h1>

        <p className="mt-10 text-xl text-zinc-400 max-w-2xl leading-relaxed">
          Real-time verification engine with persistent usage tracking,
          enterprise-grade analytics and scalable infrastructure.
        </p>

        <div className="flex flex-wrap gap-5 mt-12">

          <button className="px-8 py-5 rounded-2xl bg-emerald-400 text-black font-black text-lg hover:scale-105 transition-all shadow-[0_0_60px_rgba(74,222,128,0.35)]">
            Start Verification
          </button>

          <button className="px-8 py-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-white font-bold hover:bg-white/10 transition-all">
            Enterprise Docs
          </button>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8">
            <div className="text-zinc-400 text-sm">
              Verification Speed
            </div>

            <div className="mt-4 text-5xl font-black">
              0.4s
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8">
            <div className="text-zinc-400 text-sm">
              Accuracy
            </div>

            <div className="mt-4 text-5xl font-black">
              99.9%
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8">
            <div className="text-zinc-400 text-sm">
              API Requests
            </div>

            <div className="mt-4 text-5xl font-black">
              50M+
            </div>
          </div>

        </div>

      </div>

    </section>
  )
}
