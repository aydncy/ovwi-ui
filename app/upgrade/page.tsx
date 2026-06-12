'use client';

export default function Upgrade() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-white">

      <h1 className="text-3xl font-bold mb-4">
        Upgrade to Pro
      </h1>

      <p className="text-gray-400 mb-8">
        Unlock more API usage and production access.
      </p>

      <div className="bg-[#0f172a] border border-gray-800 p-6 rounded-xl">

        <h2 className="text-xl font-semibold">Pro Plan</h2>

        <p className="text-gray-400 mt-2">
          2000 API requests/month
        </p>

        <p className="text-3xl font-bold mt-4">
          €9
        </p>

        <button
          onClick={() => window.location.href = 'https://aydncy.gumroad.com/l/ovwi'}
          className="mt-5 px-6 py-3 bg-blue-500 rounded"
        >
          Upgrade Now
        </button>

      </div>

    </div>
  );
}
