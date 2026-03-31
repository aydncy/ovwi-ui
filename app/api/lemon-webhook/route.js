export async function POST(req) {
  const event = await req.json();

  const email = event.data?.attributes?.user_email;
  const variant = event.data?.attributes?.variant_id;

  let plan = null;

  if (variant == 1441515) plan = "pro";
  if (variant == 1441551) plan = "enterprise";
  if (variant == 1441560) plan = "scale";

  if (!plan) {
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  await fetch("https://ovwi.cyzora.com/api/upgrade", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, plan })
  });

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
