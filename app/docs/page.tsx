export default function Docs() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">API Docs</h1>

      <div className="card">
        <p className="text-gray-400 mb-2">POST /api/external-verify</p>
        <div className="bg-black/50 p-3 rounded text-sm font-mono">
          {`fetch('/api/external-verify', {
  method: 'POST',
  body: JSON.stringify({ email })
})`}
        </div>
      </div>

    </div>
  );
}
