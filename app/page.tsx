export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white flex items-center justify-center">
      <div className="max-w-3xl text-center">

        <h1 className="text-5xl font-bold mb-6 tracking-tight">
          OVWI
        </h1>

        <p className="text-xl text-gray-400 mb-10">
          Verify webhooks. Track usage. Scale safely.
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="/login"
            className="bg-cyan-500 hover:bg-cyan-400 transition px-6 py-3 rounded-lg font-semibold text-black"
          >
            Get API Key
          </a>

          <a
            href="/dashboard"
            className="border border-gray-600 hover:border-gray-400 transition px-6 py-3 rounded-lg"
          >
            Dashboard
          </a>
        </div>

      </div>
    </div>
  );
}
