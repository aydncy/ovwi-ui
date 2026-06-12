import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase?.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center border-b border-gray-800">

      <h1 className="text-lg font-bold">OVWI</h1>

      <div className="flex gap-6 text-sm text-gray-400">
        /docsDocs</a>

        {user && (
          /dashboardDashboard</a>
        )}

        {user ? (
          /auth/logoutLogout</a>
        ) : (
          /auth/loginLogin</a>
        )}
      </div>

    </div>
  );
}

<body className="bg-[#020617] text-white">

        {/* ✅ TOP BANNER */}
        <div className="text-center text-sm py-2 bg-black border-b border-gray-800">
          Upgrade to Pro for more API usage
          <a href="/upgrade" className="text-blue-400 ml-2">Upgrade →</a>
        </div>

        {/* ✅ NAVBAR */}
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center border-b border-gray-800">

          <h1 className="text-lg font-bold tracking-tight">
            OVWI
          </h1>

          <div className="flex gap-6 text-sm text-gray-400">
            <a href="/docs" className="hover:text-white">Docs</a>
            <a href="/dashboard" className="hover:text-white">Dashboard</a>
            <a href="/auth/logout" className="hover:text-white">Logout</a>
          </div>

        </div>

        <Navbar />
{children}

      </body>
    </html>
  )
}
