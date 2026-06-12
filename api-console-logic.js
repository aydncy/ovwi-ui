const fs = require('fs');

let file = fs.readFileSync('app/dashboard/page.tsx','utf8');

file = file.replace(
'export default function Dashboard() {',
`
export default function Dashboard() {

  const sendRequest = async () => {
    const endpoint = (document.getElementById("endpoint") as any).value;
    const payload = (document.getElementById("payload") as any).value;
    const responseBox = document.getElementById("responseBox");

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json"
        },
        body: payload
      });

      const data = await res.json();

      if (responseBox) {
        responseBox.innerText = JSON.stringify(data, null, 2);
      }

    } catch (e) {
      if (responseBox) {
        responseBox.innerText = "Error";
      }
    }
  };
`
);

// butona bağla
file = file.replace(
'id="sendBtn"',
'id="sendBtn" onClick={sendRequest}'
);

fs.writeFileSync('app/dashboard/page.tsx', file);
