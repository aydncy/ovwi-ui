export async function sendEvent() {
  const types = [
    { endpoint: "GPT-4", price: 0.03 },
    { endpoint: "Image Gen", price: 0.4 },
    { endpoint: "Chat", price: 0.01 }
  ];

  const e = types[Math.floor(Math.random() * types.length)];

  await fetch("/api/event", {
    method: "POST",
    body: JSON.stringify(e),
  });
}
