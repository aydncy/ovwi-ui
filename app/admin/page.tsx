import { createSupabaseServer } from '../lib/supabaseServer'
import { redirect } from 'next/navigation'

export default async function Admin(){

  const supabase = await createSupabaseServer()

  const {
    data:{ session }
  } = await supabase.auth.getSession()

  if(!session) redirect('/login')

  if(session.user.email !== process.env.ADMIN_EMAIL){
    redirect('/')
  }

  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    'https://ovwi.cyzora.com'

  const res = await fetch(
    `${base}/api/admin/metrics`,
    { cache:'no-store' }
  )

  const data = await res.json()

  return (
    <main className="container">

      <h1 style={{fontSize:40}}>Revenue Dashboard</h1>

      <div className="stats-grid">

        <div className="card stat-card">
          <div>Users</div>
          <h2>{data.totalUsers}</h2>
        </div>

        <div className="card stat-card">
          <div>Paid Users</div>
          <h2>{data.paidUsers}</h2>
        </div>

        <div className="card stat-card">
          <div>MRR ($)</div>
          <h2>{data.mrr}</h2>
        </div>

        <div className="card stat-card">
          <div>Total Usage</div>
          <h2>{data.totalUsage}</h2>
        </div>

      </div>

    </main>
  )
}
