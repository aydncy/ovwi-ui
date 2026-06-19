export function generateEvent() {
  const types = [
    { name: "GPT-4 request", price: 0.03 },
    { name: "Image generation", price: 0.4 },
    { name: "Chat completion", price: 0.01 },
    { name: "Embedding", price: 0.002 },
  ];

  const e = types[Math.floor(Math.random() * types.length)];

  return {
    type: e.name,
    price: e.price,
    time: new Date().toLocaleTimeString(),
  };
}
