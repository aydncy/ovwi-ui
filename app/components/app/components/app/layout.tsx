import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#020617] text-white">

        {/* Navbar */}
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between border-b border-gray-800">
          <h1 className="font-bold">OVWI</h1>

          <div className="flex gap-6 text-sm text-gray-400">
            <a href="/docs">Docs</a>
            <a href="/dashboard">Dashboard</a>
            <a href="/auth/logout">Logout</a>
          </div>
        </div>

        {children}

      </body>
    </html>
  );
}
// force rebuild Mon, Jun 15, 2026  5:01:18 PM
