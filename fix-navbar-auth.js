const fs = require('fs');

let file = fs.readFileSync('app/layout.tsx','utf8');

// import ekle
if (!file.includes('useEffect')) {
  file = file.replace(
    '<body',
    `import { useEffect, useState } from 'react';
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

<body`
  );
}

// navbar render et
file = file.replace(
'{children}',
`<Navbar />
{children}`
);

fs.writeFileSync('app/layout.tsx', file);
