import Navbar from "@/components/Navbar";

export default function PricingPage() {

  return (
    <>
      <Navbar />

      <div className="min-h-screen pt-40 px-6">

        <div className="max-w-6xl mx-auto">

          <h1 className="text-6xl font-black text-center mb-20">
            Pricing
          </h1>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="rounded-3xl border border-white/10 bg-white/5 p-10">
              <h2 className="text-3xl font-black mb-4">Pro</h2>
              <div className="text-5xl font-black mb-6">€6</div>
              <p className="text-slate-300">1K API requests</p>
            </div>

            <div className="rounded-3xl border-2 border-cyan-400 bg-cyan-400/10 p-10 scale-105">
              <h2 className="text-3xl font-black mb-4">Enterprise</h2>
              <div className="text-5xl font-black mb-6">€18</div>
              <p className="text-slate-300">10K API requests</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-10">
              <h2 className="text-3xl font-black mb-4">Scale</h2>
              <div className="text-5xl font-black mb-6">€49</div>
              <p className="text-slate-300">100K API requests</p>
            </div>

          </div>

        </div>

      </div>
    </>
  );
}
