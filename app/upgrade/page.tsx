'use client';

export default function Upgrade() {
  return (
    <div className="text-center space-y-8">

      <h1 className="text-3xl font-bold">Upgrade Your Plan</h1>

      <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto">

        {/* PRO */}
        <div className="card space-y-4">
          <h2 className="text-xl font-bold">Pro</h2>
          <p className="text-gray-400">2000 requests</p>

          <button
            onClick={() => window.location.href='https://aydncy.gumroad.com/l/ovwi_pro'}
            className="btn btn-pro w-full"
          >
            Buy (€9)
          </button>
        </div>

        {/* SCALE */}
        <div className="card space-y-4">
          <h2 className="text-xl font-bold">Scale</h2>
          <p className="text-gray-400">10000 requests</p>

          <button
            onClick={() => window.location.href='https://aydncy.gumroad.com/l/ovwi_scale'}
            className="btn btn-scale w-full"
          >
            Buy (€29)
          </button>
        </div>

      </div>

    </div>
  );
}
