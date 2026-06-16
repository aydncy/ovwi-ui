const fs = require('fs');

let file = fs.readFileSync('app/dashboard/page.tsx', 'utf8');

// ✅ STATE EKLE
if (!file.includes('countdown')) {

file = file.replace(
"const [limit, setLimit] = useState(50);",
`const [limit, setLimit] = useState(50);
const [countdown, setCountdown] = useState(5);`
);

// ✅ EFFECT EKLE
file = file.replace(
"useEffect(() => {",
`useEffect(() => {

  if (usage >= limit - 1 && usage < limit) {
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }

`
);

// ✅ UI EKLE
file = file.replace(
"{/* LIMIT WARNING */}",
`{/* COUNTDOWN MODE */}

{usage >= limit - 1 && usage < limit && (
  <div className="bg-red-800 text-white p-4 rounded mb-4 border-4 border-red-500">

    <p className="text-lg font-bold">
      ⚠️ LAST REQUEST REMAINING
    </p>

    <p className="text-sm mt-2">
      API access stopping in:
    </p>

    <p className="text-3xl font-bold mt-2 animate-pulse">
      {countdown}s
    </p>

  </div>
)}

{/* LIMIT WARNING */}`
);

}

fs.writeFileSync('app/dashboard/page.tsx', file);
console.log("🔥 COUNTDOWN MODE ACTIVE");
