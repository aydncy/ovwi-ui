import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {

  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden">

        <section className="max-w-7xl mx-auto px-6 pt-44 pb-32 grid lg:grid-cols-2 gap-20 items-center">

          <div>

            <div className="inline-flex px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 text-sm mb-8">
              OVWI Money Engine v3.2
            </div>

            <h1 className="text-7xl font-black leading-none mb-8">
              AI Billing
              <br />
              Infrastructure
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                That Prints Money
              </span>
            </h1>

            <p className="text-xl text-slate-300 leading-9 max-w-2xl mb-10">
              Production-ready SaaS engine with API monetization,
              Lemon billing, auth system, usage tracking,
              analytics and scalable infrastructure.
            </p>

            <div className="flex gap-5">

              <Link href="/dashboard">
                <button className="h-14 px-8 rounded-2xl bg-cyan-400 text-black font-bold text-lg hover:scale-105 transition">
                  Open Dashboard
                </button>
              </Link>

              <Link href="/pricing">
                <button className="h-14 px-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition text-lg">
                  Pricing
                </button>
              </Link>

            </div>

          </div>

          <div className="relative">

            <div className="absolute inset-0 blur-3xl bg-cyan-500/20 rounded-full"></div>

            <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-10 shadow-2xl">

              <div className="flex justify-between mb-8">
                <div>
                  <div className="text-slate-400 text-sm">
                    Monthly Revenue
                  </div>

                  <div className="text-5xl font-black mt-2">
                    $24,580
                  </div>
                </div>

                <div className="h-16 w-16 rounded-2xl bg-cyan-400/20 flex items-center justify-center text-cyan-300 font-bold">
                  API
                </div>
              </div>

              <div className="space-y-5">

                <div className="p-5 rounded-2xl bg-black/30 border border-white/10 flex justify-between">
                  <span className="text-slate-300">API Requests</span>
                  <strong>2.4M</strong>
                </div>

                <div className="p-5 rounded-2xl bg-black/30 border border-white/10 flex justify-between">
                  <span className="text-slate-300">Active Users</span>
                  <strong>18,204</strong>
                </div>

                <div className="p-5 rounded-2xl bg-black/30 border border-white/10 flex justify-between">
                  <span className="text-slate-300">Conversion</span>
                  <strong>12.8%</strong>
                </div>

              </div>

            </div>

          </div>

        </section>

      </main>
    </>
  );
}
