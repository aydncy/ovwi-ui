"use client";

export default function UpgradeUI({
  usage,
  limit,
  plan,
}: {
  usage: number;
  limit: number;
  plan: string;
}) {
  const percent = Math.min((usage / limit) * 100, 100);

  return (
    <>
      {/* PLAN */}
      <div className="mb-4 flex justify-between items-center">
        <div className="text-sm text-white/60">Plan</div>
        <div className="px-3 py-1 text-xs rounded-full bg-white/10">
          {plan?.toUpperCase()}
        </div>
      </div>

      {/* USAGE */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span>Usage</span>
          <span>{usage} / {limit}</span>
        </div>

        <div className="w-full h-2 bg-white/10 rounded-full">
          <div
            className="h-2 bg-cyan-500 rounded-full"
            style={{ width: percent + "%" }}
          ></div>
        </div>
      </div>

      {/* WARNING */}
      {usage > limit * 0.8 && usage < limit && (
        <div className="mb-4 p-3 border border-yellow-500/30 bg-yellow-500/10 rounded-lg text-sm">
          ⚠️ You are close to your limit. Upgrade soon.
        </div>
      )}

      {/* UPGRADE MODAL */}
      {usage >= limit && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
          
          <div className="bg-black border border-white/10 rounded-2xl p-8 text-center max-w-md">
            
            <h2 className="text-2xl font-semibold mb-4">
              🚀 Upgrade Required
            </h2>

            <p className="text-white/60 mb-6">
              You've reached your monthly limit. Upgrade to continue.
            </p>

            <a
              href="https://aydncy.gumroad.com/l/ovwi_pro"
              target="_blank"
              className="block w-full mb-4 py-3 rounded-lg bg-cyan-500 text-black font-semibold"
            >
              Upgrade to PRO
            </a>

            <button
              className="text-sm text-white/40 hover:text-white/60"
              onClick={() => window.location.reload()}
            >
              Maybe later
            </button>

          </div>
        </div>
      )}
    </>
  );
}
