export default function Docs() {
  return (
    <div className="max-w-3xl mx-auto space-y-10">

      <h1 className="text-3xl font-bold">API Docs</h1>

      <div className="card">
        <p className="mb-2 text-gray-400">POST /api/external-verify</p>

        <pre className="bg-black/60 p-4 rounded">
{`fetch('/api/external-verify', {
  method: 'POST',
  body: JSON.stringify({ email })
})`}
        </pre>
      </div>

      <div className="card">
        <p className="text-sm text-gray-400">
          Requires API key (from dashboard)
        </p>
      </div>

    </div>
  );
}
