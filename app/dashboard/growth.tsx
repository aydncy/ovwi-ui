'use client';

export default function Growth({ usage, limit }: any) {

  if (!limit) return null;

  if (usage >= limit) {
    return (
      <div className="bg-red-600 text-white p-3 rounded mt-4">
        Limit reached. Upgrade required.
      </div>
    );
  }

  if (usage > limit * 0.8) {
    return (
      <div className="bg-yellow-500 text-black p-3 rounded mt-4">
        Approaching limit. Upgrade soon.
      </div>
    );
  }

  return null;
}
