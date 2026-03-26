import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(req) {
  const { name, email } = await req.json()

  await supabase.from('patients').insert([{ name, email }])

  return Response.json({ ok: true })
}

export async function GET() {
  const { data } = await supabase.from('patients').select('*')
  return Response.json({ ok: true, data })
}
