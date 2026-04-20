import { createSupabaseServer } from '../lib/supabaseServer'
import { redirect } from 'next/navigation'

export default async function Dashboard(){

  const supabase = await createSupabaseServer()

  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (!session) redirect('/login')

  const email = session.user.email

  //  ENV SAFE URL
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    'https://ovwi.cyzora.com'

  let data = null

  try {
    const res = await fetch(
      `${base}/api/dashboard?email=${email}`,
      { cache:'no-store' }
    )

    data = await res.json()
  } catch {
    return (
      <main className="container">
        <h1>Dashboard</h1>
        <p>Backend connection error</p>
      </main>
    )
  }

  //  ONBOARDING GUARD
  if(!data.keys || data.keys.length === 0){
    redirect('/onboarding')
  }

  const usagePercent = Math.min(
    (data.usage / data.limit) * 100,
    100
  )

  return (
    <main className="container">

      <h1 style={{fontSize:40}}>Dashboard</h1>

      {/*  ACTIVATION BOOST */}
      <div className="card" style={{marginTop:20}}>
        <h3>Quick Start</h3>

        <pre style={{
          marginTop:10,
          padding:12,
          background:'#020617',
          borderRadius:8,
          fontSize:12
        }}>
{`curl -X POST https://ovwi.cyzora.com/api/verify \\
-H "Content-Type: application/json" \\
-d '{"apiKey":"${data.keys[0]}"}'`}
        </pre>
      </div>

      {/* STATS */}
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

      {/* PROGRESS */}
      <div className="card" style={{marginTop:20}}>
        <div style={{display:'flex',justifyContent:'space-between'}}>
          <span>Usage</span>
          <span>{data.usage}/{data.limit}</span>
        </div>

        <div className="progress-wrap" style={{marginTop:10}}>
          <div
            className="progress-bar"
            style={{width:`${usagePercent}%`}}
          />
        </div>
      </div>

      {/* API KEYS */}
      <div className="card" style={{marginTop:20}}>
        <h3>API Keys</h3>

        {data.keys.map((k,i)=>(
          <div key={i} style={{
            marginTop:10,
            padding:10,
            background:'#020617',
            borderRadius:8
          }}>
            {k}
          </div>
        ))}
      </div>

    </main>
  )
}
