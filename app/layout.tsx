import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#020617] text-white">

        {/* ✅ TOP BAR */}
        <div className="text-center text-xs py-2 border-b border-gray-800">
          Upgrade to Pro for more API usage
          <a href="/upgrade" className="ml-2 underline">
            Upgrade →
          </a>
        </div>

        {/* ✅ NAVBAR */}
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center border-b border-gray-800">
          <h1 className="font-bold">OVWI</h1>

          <div className="flex gap-6 text-sm text-gray-400">
            <a href="/docs">Docs</a>
            <a href="/dashboard">Dashboard</a>
            <a href="/auth/logout">Logout</a>
          </div>
        </div>

        {/* ✅ CONTENT */}
        {children}

      </body>
    </html>
  );
}
