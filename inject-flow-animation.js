const fs = require('fs');

let file = fs.readFileSync('app/page.tsx', 'utf8');

if (!file.includes('FLOW ANIMATION PRO')) {

file = file.replace(
'How it works',
`How it works

{/* FLOW ANIMATION PRO */}
<div className="mt-12 bg-white/5 border border-white/10 rounded-xl p-6 max-w-xl mx-auto">

  <div className="text-sm text-gray-400 mb-2">Live Example</div>

  <div className="w-full bg-gray-800 h-3 rounded overflow-hidden mb-3">
    <div id="flow-bar" className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 w-0 transition-all duration-500"></div>
  </div>

  <p id="flow-text" className="text-xs text-gray-400">
    Waiting for request...
  </p>

  <button id="flow-upgrade" className="hidden mt-3 bg-green-600 px-4 py-2 rounded">
    Upgrade
  </button>

</div>

<script>
setTimeout(() => {
  const bar = document.getElementById('flow-bar');
  const text = document.getElementById('flow-text');
  const btn = document.getElementById('flow-upgrade');

  let usage = 0;
  const limit = 50;

  const interval = setInterval(() => {

    usage += 5;

    const percent = (usage / limit) * 100;
    bar.style.width = percent + '%';

    text.innerText = usage + " / " + limit + " requests";

    if (usage > 40) {
      text.innerText = "⚠️ Limit almost reached";
      text.style.color = "orange";
    }

    if (usage >= limit) {
      text.innerText = "🚨 Limit reached";
      text.style.color = "red";

      btn.style.display = "block";
      clearInterval(interval);
    }

  }, 500);

}, 500);
</script>`
);

}

fs.writeFileSync('app/page.tsx', file);

console.log("🔥 FLOW ANIMATION ACTIVE");
