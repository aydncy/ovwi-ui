import { createSupabaseServer } from '../lib/supabaseServer'
import { redirect } from 'next/navigation'

export default async function Dashboard(){

  const supabase = await createSupabaseServer()

  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (!session) redirect('/login')

  const email = session.user.email

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/dashboard?email=${email}`,
    { cache:'no-store' }
  )

  const data = await res.json()

  // í´¥ KEY YOKSA ONBOARDING
  if(!data.keys || data.keys.length === 0){
    redirect('/onboarding')
  }

  return (
    <main className="container">

      <h1>Dashboard</h1>

      <div className="stats-grid">

        <div className="card stat-card">
          <div>Usage</div>
          <h2>{data.usage}</h2>
        </div>

        <div className="card stat-card">
          <div>Limit</div>
          <h2>{data.limit}</h2>
        </div>

        <div className="card stat-card">
          <div>Plan</div>
          <h2>{data.plan}</h2>
        </div>

      </div>

    </main>
  )
}
