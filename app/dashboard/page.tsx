import { createSupabaseServer } from '../lib/supabaseServer'
import { redirect } from 'next/navigation'

export default async function Dashboard() {

  const supabase = await createSupabaseServer()

  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (!session) redirect('/login')

  const email = session.user.email

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/dashboard?email=${email}`,
    { cache: 'no-store' }
  )

  const data = await res.json()

  return (
    <main className="container">

      <h1 style={{fontSize:40}}>Dashboard</h1>

      <div className="stats-grid">

        <div className="card stat-card">
          <div>Usage</div>
          <h2>{data.usage}</h2>
        </div>

        <div className="card stat-card">
          <div>Remaining</div>
          <h2>{data.remaining}</h2>
        </div>

        <div className="card stat-card">
          <div>Plan</div>
          <h2>{data.plan}</h2>
        </div>

      </div>

      <div className="card" style={{marginTop:30}}>
        <h3>API Keys</h3>

        {data.keys?.map((k,i)=>(
          <div key={i} style={{
            marginTop:10,
            padding:10,
            background:"#020617",
            borderRadius:8
          }}>
            {k}
          </div>
        ))}
      </div>

      <div className="card" style={{marginTop:30}}>
        <h3>Usage Insight</h3>

        <div style={{opacity:0.7}}>
          You have used {data.usage} out of {data.limit} requests
        </div>
      </div>

    </main>
  )
}
