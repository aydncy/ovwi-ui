const fs = require('fs');

// =====================
// DASHBOARD (SALES MODE)
// =====================
let dash = fs.readFileSync('app/dashboard/page.tsx', 'utf8');

if (!dash.includes('FULL SALES MODE')) {

dash = dash.replace(
'return (',
`// FULL SALES MODE

if (usage >= limit) {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="bg-gray-900 p-8 rounded text-center space-y-4">

        <h2 className="text-2xl font-bold">
          API Limit Reached
        </h2>

        <p className="text-gray-400">
          You cannot continue without upgrading
        </p>

        <button
          onClick={() => window.location.href='https://aydncy.gumroad.com/l/ovwi_pro'}
          className="bg-green-600 px-6 py-3 rounded animate-pulse"
        >
          🚀 Upgrade Now
        </button>

      </div>
    </div>
  );
}

return (`
);

dash = dash.replace(
'<div className="max-w-4xl mx-auto py-16 space-y-10">',
`<div className="max-w-4xl mx-auto py-16 space-y-10">

{usage >= limit * 0.8 && (
  <div className="bg-red-600 text-white p-3 rounded animate-pulse">
    ⚠️ You're close to your limit
  </div>
)}

{usage >= limit - 3 && (
  <div className="bg-red-800 text-white p-3 rounded">
    🚨 Only a few requests left
  </div>
)}
`
);

}

fs.writeFileSync('app/dashboard/page.tsx', dash);

// =====================
// LANDING (HIGH CONVERT)
// =====================
let landing = fs.readFileSync('app/page.tsx', 'utf8');

if (!landing.includes('HIGH CONVERSION')) {

landing = landing.replace(
'Start Scaling API',
'🚀 Start Scaling API (Free → Upgrade Required)'
);

landing = landing.replace(
'Track usage, enforce limits',
`Track usage, enforce limits and monetize your API fast.

⚡ Most users upgrade within first few minutes`
);

landing = landing.replace(
'Upgrade',
'🚀 Upgrade Now'
);

}

fs.writeFileSync('app/page.tsx', landing);

// =====================
// NAVBAR SPACING FIX
// =====================
let nav = fs.readFileSync('components/Navbar.tsx', 'utf8');

if (!nav.includes('max-w-6xl')) {

nav = nav.replace(
'flex justify-between',
'max-w-6xl mx-auto flex justify-between px-6'
);

}

fs.writeFileSync('components/Navbar.tsx', nav);

console.log("🔥 FULL SALES ENGINE ACTIVATED");
