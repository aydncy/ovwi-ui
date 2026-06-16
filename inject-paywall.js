const fs = require('fs');

let file = fs.readFileSync('app/dashboard/page.tsx', 'utf8');

if (!file.includes('PAYWALL ACTIVE')) {

file = file.replace(
"return (",
`// PAYWALL ACTIVE
if (usage >= limit) {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="bg-gray-900 p-8 rounded text-center max-w-md space-y-6">

        <h2 className="text-2xl font-bold text-white">
          Limit Reached
        </h2>

        <p className="text-gray-400">
          You’ve used all your API requests.
        </p>

        <p className="text-sm text-gray-500">
          Upgrade to continue using OVWI API
        </p>

        <div className="space-y-3">

          <button
            onClick={() => window.location.href = 'https://aydncy.gumroad.com/l/ovwi_pro'}
            className="bg-green-600 w-full py-3 rounded"
          >
            Upgrade to Pro (€9)
          </button>

          <button
            onClick={() => window.location.href = 'https://aydncy.gumroad.com/l/ovwi_scale'}
            className="bg-purple-600 w-full py-3 rounded"
          >
            Upgrade to Scale (€29)
          </button>

        </div>

        <p className="text-xs text-gray-600">
          Free plan is for testing only
        </p>

      </div>
    </div>
  );
}

return (`
);

}

fs.writeFileSync('app/dashboard/page.tsx', file);
console.log("✅ PAYWALL ENABLED");
