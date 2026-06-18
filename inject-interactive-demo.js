const fs = require('fs');

let file = fs.readFileSync('app/page.tsx','utf8');

if (!file.includes('INTERACTIVE DEMO PRO')) {

file = file.replace(
'How it works',
`How it works

{/* INTERACTIVE DEMO PRO */}
<div className="mt-12 max-w-xl mx-auto bg-white/5 border border-white/10 rounded-xl p-6">

  <p className="text-sm text-gray-400 mb-2">
    Try it yourself
  </p>

  <input
    id="demo-email"
    placeholder="Enter email"
    className="w-full p-2 rounded bg-black/50 border border-white/10 text-sm mb-3"
  />

  <div className="w-full bg-gray-800 h-3 rounded mb-2">
    <div id="demo-bar" className="bg-blue-500 h-3 w-0"></div>
  </div>

  <p id="demo-text" className="text-xs text-gray-400">
    0 / 50 requests
  </p>

  <button
    id="demo-btn"
    className="bg-blue-600 px-4 py-2 rounded mt-3 text-sm"
  >
    Run Request
  </button>

  <button
    id="demo-upgrade"
    className="hidden bg-green-600 px-4 py-2 rounded mt-3 text-sm"
  >
    Upgrade
  </button>

</div>

<script>
setTimeout(() => {

  let usage = 0;
  const limit = 50;

  const bar = document.getElementById('demo-bar');
  const text = document.getElementById('demo-text');
  const btn = document.getElementById('demo-btn');
  const upgrade = document.getElementById('demo-upgrade');

  btn.onclick = () => {

    usage += 5;

    const percent = (usage/limit)*100;
    bar.style.width = percent + "%";

    text.innerText = usage + " / " + limit;

    if (usage > 40) {
      text.innerText = "⚠️ Almost limit";
      text.style.color = "orange";
    }

    if (usage >= limit) {
      text.innerText = "🚨 Limit reached";
      text.style.color = "red";
      btn.style.display = "none";
      upgrade.style.display = "block";
    }

  };

}, 500);
</script>`
);

}

fs.writeFileSync('app/page.tsx', file);

console.log("🔥 INTERACTIVE DEMO ENABLED");
