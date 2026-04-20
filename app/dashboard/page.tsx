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

  //  DIRECT DB (NO FETCH)
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

  const usagePercent = Math.min((usage / limit) * 100, 100)

  return (
    <main className="container">

      <h1 style={{fontSize:40}}>Dashboard</h1>

      {/*  ONE CLICK VERIFY */}
      <VerifyBox apiKey={keys[0].key} />

      {/* STATS */}
      <div className="stats-grid">

        <div className="card stat-card">
          <div>Usage</div>
          <h2>{usage}</h2>
        </div>

        <div className="card stat-card">
          <div>Remaining</div>
          <h2>{remaining}</h2>
        </div>

        <div className="card stat-card">
          <div>Plan</div>
          <h2>{plan}</h2>
        </div>

      </div>

      {/* PROGRESS */}
      <div className="card" style={{marginTop:20}}>
        <div style={{display:'flex',justifyContent:'space-between'}}>
          <span>Usage</span>
          <span>{usage}/{limit}</span>
        </div>

        <div style={{
          height:8,
          background:'#0f172a',
          borderRadius:6,
          marginTop:10
        }}>
          <div style={{
            width:`${usagePercent}%`,
            height:'100%',
            background:'#3b82f6',
            borderRadius:6
          }} />
        </div>
      </div>

      {/* API KEYS */}
      <div className="card" style={{marginTop:20}}>
        <h3>API Keys</h3>

        {keys.map((k,i)=>(
          <div key={i} style={{
            marginTop:10,
            padding:10,
            background:'#020617',
            borderRadius:8
          }}>
            {k.key}
          </div>
        ))}
      </div>

    </main>
  )
}
