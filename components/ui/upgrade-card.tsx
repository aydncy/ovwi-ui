export function UpgradeCard() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-lg font-semibold">Upgrade required</h3>
      <p className="mt-2 text-sm text-zinc-400">
        You’ve reached your usage limit. Upgrade to continue verifying.
      </p>

      <button className="mt-4 rounded-xl bg-white px-4 py-2 text-black">
        Upgrade to Pro
      </button>
    </div>
  );
}
