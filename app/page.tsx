export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0B0F1A] text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">OVWI</h1>
        <p className="text-gray-400 mb-6">
          Verify webhooks. Track usage. Scale safely.
        </p>

        <div className="flex gap-4 justify-center">
          <a href="/login" className="bg-cyan-500 px-6 py-3 rounded text-black font-semibold">
            Get API Key
          </a>

          <a href="/dashboard" className="border border-gray-600 px-6 py-3 rounded">
            Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
