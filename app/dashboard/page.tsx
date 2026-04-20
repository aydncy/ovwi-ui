import { createSupabaseServer } from '../lib/supabaseServer'
import { redirect } from 'next/navigation'
import VerifyBox from './verify-box'

export default async function Dashboard(){

  const supabase = await createSupabaseServer()

  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (!session) redirect('/login')

  const email = session.user.email

  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  const { data: keys } = await supabase
    .from('api_keys')
    .select('key')
    .eq('email', email)

  if(!keys || keys.length === 0){
    redirect('/onboarding')
  }

  const usage = user?.usage_count || 0
  const limit = user?.limit || 50
  const remaining = limit - usage
  const plan = user?.plan || 'free'

  return (
    <main className="container">

      <h1>Dashboard</h1>

      <VerifyBox apiKey={keys[0].key} />

      {remaining <= 0 && (
        <div className="card" style={{marginTop:20}}>
          <h3>Upgrade Required</h3>

          <button
            className="btn-primary"
            onClick={()=>window.location.href =
              process.env.NEXT_PUBLIC_LEMON_CHECKOUT_PRO!
            }
          >
            Upgrade Plan
          </button>
        </div>
      )}

      <div className="card" style={{marginTop:20}}>
        Usage: {usage} / {limit}
      </div>

    </main>
  )
}
