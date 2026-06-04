import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#020617] text-white">
        <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#081226] to-[#020617]">

          <nav className="flex justify-between items-center px-8 py-4 border-b border-white/10">
            <div className="text-xl font-bold text-cyan-400">OVWI</div>

            <div className="flex gap-4">
              <a href="/" className="px-4 py-2 bg-white/5 rounded-xl">Home</a>
              <a href="/docs" className="px-4 py-2 bg-white/5 rounded-xl">Docs</a>
              <a href="/dashboard" className="px-4 py-2 bg-white/5 rounded-xl">Dashboard</a>
            </div>
          </nav>

          {children}
        </div>
      </body>
    </html>
  );
}
