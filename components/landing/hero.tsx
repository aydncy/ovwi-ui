"use client";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black text-white">
      
      {/* Glow background */}
      <div className="absolute inset-0">
        <div className="absolute top-[-200px] left-[-200px] h-[500px] w-[500px] bg-cyan-500/20 blur-[120px]" />
        <div className="absolute bottom-[-200px] right-[-200px] h-[500px] w-[500px] bg-fuchsia-500/20 blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative text-center max-w-4xl px-6">
        <div className="inline-block px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm mb-6">
          AI Verification Infrastructure
        </div>

        <h1 className="text-5xl md:text-7xl font-bold">
          Trust Infrastructure
          <br />
          for Modern AI Apps
        </h1>

        <p className="mt-6 text-zinc-400">
          Lemon-powered billing • Supabase backend • Enterprise-grade verification API
        </p>

        <div className="mt-10 flex gap-4 justify-center">
          <button className="px-6 py-3 rounded-xl bg-white text-black">
            Get Started
          </button>

          <button className="px-6 py-3 rounded-xl border border-white/10 bg-white/5">
            Pricing
          </button>
        </div>
      </div>

    </section>
  );
}
