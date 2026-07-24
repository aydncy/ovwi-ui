import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <h1 className="text-5xl font-bold text-cyan-400 mb-6">
          Payment Successful 🎉
        </h1>

        <p className="text-slate-400 mb-8">
          Your OVWI plan has been upgraded successfully.
          You can now access higher request limits and advanced features.
        </p>

        /dashboard className="inline-flex rounded-xl bg-cyan-500 px-8 py-4 font-bold text-black"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
