export function Metric({ label, value }: any) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="text-sm text-zinc-400">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-white">
        {value}
      </div>
    </div>
  );
}
