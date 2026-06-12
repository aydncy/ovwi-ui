const fs = require('fs');

let file = fs.readFileSync('app/dashboard/page.tsx','utf8');

file = file.replace(
'</div>\n\n    );',
`
  {/* 🚀 API CONSOLE */}
  <div className="mt-10 bg-[#0f172a] p-6 rounded-lg border border-[#1f2937]">
    <h2 className="text-lg font-semibold mb-4">API Console</h2>

    <input id="endpoint" placeholder="/api/external-verify"
      className="w-full p-2 mb-3 bg-black border border-gray-700 rounded" />

    <textarea id="payload" placeholder='{"event":"test"}'
      className="w-full p-2 h-24 bg-black border border-gray-700 rounded mb-3"></textarea>

    <button id="sendBtn"
      className="px-4 py-2 bg-blue-500 rounded">
      Send Request
    </button>

    <pre id="responseBox"
      className="mt-4 text-sm bg-black p-3 rounded overflow-auto"></pre>
  </div>

    </div>
  );
`
);

fs.writeFileSync('app/dashboard/page.tsx', file);
