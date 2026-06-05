const fs = require("fs");

let file = fs.readFileSync("app/dashboard/page.tsx", "utf8");

file = file.replace(
"</div>\n\n      <div className=\"panel\">",
`</div>

      <div className="panel">
        <h3>API Key</h3>
        <button onClick={async () => {
          const session = await supabase!.auth.getSession();
          const res = await fetch('/api/create-key', {
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + session.data.session!.access_token
            }
          });
          const data = await res.json();
          alert("API KEY: " + data.key);
        }} className="verify-btn">
          Generate API Key
        </button>
      </div>

      <div className="panel">`
);

fs.writeFileSync("app/dashboard/page.tsx", file);
