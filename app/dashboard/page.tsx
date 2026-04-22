import { createSupabaseServer } from '../lib/supabaseServer'
import { redirect } from 'next/navigation'
import VerifyBox from './verify-box'

export default async function Dashboard(){

  const supabase = await createSupabaseServer()

  const { data:{ session } } = await supabase.auth.getSession()

  if(!session) redirect('/login')

  const email = session.user.email

  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  const { data: key } = await supabase
    .from('api_keys')
    .select('*')
    .eq('email', email)
    .single()

  const usage = user?.usage_count || 0
  const limit = user?.limit || 50

  return (
    <main className="container">

      <h1>Dashboard</h1>

      <div className="stats-grid">

        <div className="card stat-card">
          <div>Usage</div>
          <h2>{usage}</h2>
        </div>

        <div className="card stat-card">
          <div>Limit</div>
          <h2>{limit}</h2>
        </div>

      </div>

      {/*  ACTIVATION */}
      <VerifyBox apiKey={key?.key || ''} />

    </main>
  )
}
