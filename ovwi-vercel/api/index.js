export default async function handler(req, res) {
  global.usage = global.usage || {};
  global.plans = global.plans || { "ovwi_live_test": "free" };

  const usage = global.usage;
  const plans = global.plans;

  const checkout = {
    pro: "https://cyzora.lemonsqueezy.com/checkout/buy/dd8d4124-6bc7-409c-a959-37f323f88811",
    enterprise: "https://cyzora.lemonsqueezy.com/checkout/buy/ee243278-933f-48b9-b586-55d4fd5e8fc5",
    scale: "https://cyzora.lemonsqueezy.com/checkout/buy/a2a91beb-4e73-4418-be87-4edde8de1a7d"
  };

  const url = req.url;

  if (url === '/api/health') {
    return res.end('ok');
  }

  if (url.startsWith('/api/verify/')) {
    const key = url.split('/').pop();

    if (!plans[key]) {
      res.statusCode = 403;
      return res.end('invalid key');
    }

    usage[key] = (usage[key] || 0) + 1;

    let plan = plans[key];
    let limit = 10;

    if (plan === "pro") limit = 1000;
    if (plan === "enterprise") limit = 10000;
    if (plan === "scale") limit = 100000;

    if (usage[key] >= limit) {
      let next = checkout.pro;
      if (plan === "pro") next = checkout.enterprise;
      if (plan === "enterprise") next = checkout.scale;

      res.writeHead(301, { Location: next });
      return res.end();
    }

    return res.end(JSON.stringify({
      status: "ok",
      plan,
      usage: usage[key],
      limit
    }));
  }

  if (url === '/api/upgrade' && req.method === 'POST') {
    let body = '';
    for await (const chunk of req) body += chunk;

    const data = JSON.parse(body);
    plans["ovwi_live_test"] = data.plan;

    return res.end('upgraded');
  }

  res.statusCode = 404;
  res.end('not found');
}
