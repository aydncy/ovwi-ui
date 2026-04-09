export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white">

      <div className="max-w-7xl mx-auto px-6 py-12 flex justify-between items-center">
        <div className="text-xl font-bold text-cyan-400">OVWI</div>
        <div className="flex gap-4">
          <a href="/" className="px-4 py-2 border border-gray-600 rounded-lg">Home</a>
          <a href="/docs" className="px-4 py-2 border border-gray-600 rounded-lg">Docs</a>
          <a href="/dashboard" className="px-4 py-2 border border-gray-600 rounded-lg">Dashboard</a>
          <a href="/login" className="px-4 py-2 bg-cyan-500 rounded-lg text-black">Login</a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-2 gap-10 items-center">

        <div>
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Stop debugging.<br />
            <span className="text-cyan-400">Start verifying.</span>
          </h1>

          <p className="text-gray-400 mb-6">
            Verify webhooks instantly with real-time feedback,
            usage tracking, and upgrade paths built in.
          </p>

          <div className="flex gap-4">
            <a href="/login" className="bg-cyan-500 px-6 py-3 rounded-lg text-black font-semibold">
              Get Started
            </a>

            <a href="/docs" className="border border-gray-600 px-6 py-3 rounded-lg">
              View Docs
            </a>
          </div>

          <div className="flex gap-8 mt-10 text-gray-400">
            <div>1M+<br /><span className="text-sm">Verifications</span></div>
            <div>99.9%<br /><span className="text-sm">Success</span></div>
            <div>45ms<br /><span className="text-sm">Latency</span></div>
          </div>
        </div>

        <div className="bg-[#111827] p-6 rounded-xl border border-gray-800">
          <div className="mb-4 text-sm text-gray-400">Try endpoint</div>

          <input className="w-full mb-3 p-3 bg-[#1F2937] rounded" placeholder="Email" />
          <textarea className="w-full mb-3 p-3 bg-[#1F2937] rounded" rows={4} />
          <input className="w-full mb-3 p-3 bg-[#1F2937] rounded" placeholder="API key" />

          <button className="w-full bg-cyan-500 py-3 rounded text-black font-semibold">
            Verify Webhook
          </button>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-10">Simple Pricing</h2>

        <div className="grid grid-cols-4 gap-6">

          <div className="bg-[#111827] p-6 rounded-xl border border-gray-800 text-center">
            <h3 className="mb-2">Starter</h3>
            <p className="text-3xl mb-4">$0</p>
            <button className="border border-gray-600 px-4 py-2 rounded">Get Started</button>
          </div>

          <div className="bg-[#111827] p-6 rounded-xl border border-cyan-500 text-center">
            <h3 className="mb-2">Pro</h3>
            <p className="text-3xl mb-4">€6</p>
            <button className="bg-cyan-500 px-4 py-2 rounded text-black">Get Started</button>
          </div>

          <div className="bg-[#111827] p-6 rounded-xl border border-gray-800 text-center">
            <h3 className="mb-2">Enterprise</h3>
            <p className="text-3xl mb-4">€18</p>
            <button className="border border-gray-600 px-4 py-2 rounded">Get Started</button>
          </div>

          <div className="bg-[#111827] p-6 rounded-xl border border-gray-800 text-center">
            <h3 className="mb-2">Scale</h3>
            <p className="text-3xl mb-4">€49</p>
            <button className="border border-gray-600 px-4 py-2 rounded">Get Started</button>
          </div>

        </div>
      </div>

    </div>
  );
}
