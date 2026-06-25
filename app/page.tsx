export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center px-6">

      <h1 className="text-5xl font-bold mb-6">
        Turn text into revenue 🚀
      </h1>

      <p className="text-white/60 max-w-xl mb-8">
        OVWI API transforms your content into high-performing, SEO-optimized text 
        that drives traffic, engagement, and revenue.
      </p>

      <a
        href="/login"
        className="px-6 py-3 bg-cyan-500 rounded-lg text-black font-semibold"
      >
        Get API Access
      </a>

      <div className="mt-16 max-w-3xl text-left">

        <h2 className="text-xl mb-4">How it works</h2>

        <div className="space-y-4 text-white/70 text-sm">
          <div>1. Send text to the API</div>
          <div>2. AI optimizes it for SEO</div>
          <div>3. Publish → get more traffic</div>
        </div>

        <pre className="mt-6 bg-black border border-white/10 p-4 rounded-lg text-xs overflow-x-auto">
{`fetch("https://ovwi.cyzora.com/api/ovwi", {
  method: "POST",
  headers: {
    Authorization: "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    text: "your content"
  })
})`}
        </pre>

      </div>

    </div>
  );
}
