import { createClient } from '@supabase/supabase-js'

export function createSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

export const PLAN_LIMITS = {
  free: 50,
  pro: 1000,
  enterprise: 10000,
  scale: 100000
}

export function makeApiKey() {
  return 'ovwi_live_' + Math.random().toString(36).slice(2, 18)
}

export async function ensureUserAndKey(email) {
  const supabase = createSupabaseAdmin()
  const e = email.toLowerCase()

  // user
  let { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('email', e)
    .maybeSingle()

  if (!user) {
    const res = await supabase
      .from('users')
      .insert({ email: e })
      .select()
      .single()
    user = res.data
  }

  // ONLY ONE KEY
  let { data: keys } = await supabase
    .from('api_keys')
    .select('*')
    .eq('email', e)
    .order('created_at', { ascending: false })

  let apiKey = keys?.[0]

  if (!apiKey) {
    const res = await supabase
      .from('api_keys')
      .insert({
        user_id: user.id,
        email: e,
        key: makeApiKey(),
        plan: user.plan
      })
      .select()
      .single()

    apiKey = res.data
  }

  // FIX: ensure user_id always set
  if (!apiKey.user_id) {
    await supabase
      .from('api_keys')
      .update({ user_id: user.id })
      .eq('id', apiKey.id)
  }

  return { user, apiKey }
}
