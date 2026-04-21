import { createSupabaseServer } from '../lib/supabaseServer'
import { redirect } from 'next/navigation'

export default async function Dashboard(){

  const supabase = await createSupabaseServer()

  const { data:{ session } } = await supabase.auth.getSession()

  if(!session) redirect('/login')

  const email = session.user.email

  // USER DATA
  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  // API KEY
  const { data: key } = await supabase
    .from('api_keys')
    .select('*')
    .eq('email', email)
    .single()

  const usage = user?.usage_count || 0
  const limit = user?.limit || 50
  const remaining = limit - usage

  return (
    <main className="container">

      <h1 style={{fontSize:36}}>Dashboard</h1>

      {/* KPI */}
      <div className="stats-grid">

        <div className="card stat-card">
          <div>Usage</div>
          <h2>{usage}</h2>
        </div>

        <div className="card stat-card">
          <div>Limit</div>
          <h2>{limit}</h2>
        </div>

        <div className="card stat-card">
          <div>Remaining</div>
          <h2>{remaining}</h2>
        </div>

      </div>

      {/* API KEY */}
      <div className="card" style={{marginTop:20, padding:20}}>
        <h3>Your API Key</h3>

        <div style={{
          marginTop:10,
          padding:10,
          background:'#020617',
          borderRadius:8,
          wordBreak:'break-all'
        }}>
          {key?.key || 'No key found'}
        </div>

      </div>

      {/* FIRST ACTION */}
      <div className="card" style={{marginTop:20, padding:20}}>

        <h3>Test your first request</h3>

        <pre style={{
          marginTop:10,
          padding:10,
          background:'#020617',
          borderRadius:8
        }}>
{`curl -X POST ${process.env.NEXT_PUBLIC_SITE_URL}/api/verify \\
-H "Content-Type: application/json" \\
-d '{"apiKey":"${key?.key}"}'`}
        </pre>

      </div>

      {/* UPGRADE */}
      {remaining <= 0 && (
        <div className="card" style={{marginTop:20, padding:20}}>

          <h3>Upgrade Required</h3>

          <button
            className="btn-primary"
            onClick={()=>window.location.href =
              process.env.NEXT_PUBLIC_LEMON_CHECKOUT_PRO
            }
          >
            Upgrade Plan
          </button>

        </div>
      )}

    </main>
  )
}
