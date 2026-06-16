import './globals.css';

export const metadata = {
  title: 'OVWI',
  description: 'API infrastructure platform'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-black via-gray-900 to-black text-white min-h-screen">
        <div className="min-h-screen flex flex-col">

          {/* NAVBAR */}
          <nav className="flex justify-between items-center px-8 py-4 border-b border-white/10 backdrop-blur bg-white/5">
            <div className="font-bold text-lg">OVWI</div>

            <div className="flex gap-6 text-sm text-gray-300">
              <a href="/" className="hover:text-white">Home</a>
              <a href="/docs" className="hover:text-white">Docs</a>
              <a href="/dashboard" className="hover:text-white">Dashboard</a>
              <a href="/auth/logout" className="hover:text-white">Logout</a>
            </div>
          </nav>

          {/* PAGE */}
          <main className="flex-1 p-8 max-w-6xl mx-auto w-full">
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}
