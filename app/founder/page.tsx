import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default async function Founder(){

  const cookieStore = await cookies()
  const admin = cookieStore.get('admin_auth')?.value === '1'

  if(!admin) redirect('/')

  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    'https://ovwi.cyzora.com'

  const growthRes = await fetch(`${base}/api/admin/growth`, { cache:'no-store' })
  const growth = await growthRes.json()

  const metricsRes = await fetch(`${base}/api/admin/metrics`, { cache:'no-store' })
  const metrics = await metricsRes.json()

  return (
    <main className="container">

      <h1 style={{fontSize:42}}>Founder Dashboard</h1>

      {/* REVENUE */}
      <div className="stats-grid">

        <div className="card stat-card">
          <div>MRR</div>
          <h2>${growth.mrr}</h2>
        </div>

        <div className="card stat-card">
          <div>Conversion</div>
          <h2>{growth.conversion}%</h2>
        </div>

        <div className="card stat-card">
          <div>Paid Users</div>
          <h2>{growth.paidUsers}</h2>
        </div>

        <div className="card stat-card">
          <div>Total Users</div>
          <h2>{growth.totalUsers}</h2>
        </div>

      </div>

      {/* SYSTEM HEALTH */}
      <div className="card" style={{marginTop:20}}>
        <h3>System Health</h3>

        <div style={{marginTop:10}}>
          Total API Usage: {metrics.totalUsage}
        </div>

        <div style={{marginTop:10}}>
          Active Keys: {metrics.totalUsers}
        </div>

        <div style={{marginTop:10}}>
          Revenue Efficiency: {
            metrics.totalUsage > 0
              ? (growth.mrr / metrics.totalUsage).toFixed(4)
              : 0
          }
        </div>

      </div>

      {/* ACTIONS */}
      <div className="card" style={{marginTop:20}}>

        <h3>Actions</h3>

        <div style={{marginTop:10}}>
          <a href="/admin">→ Growth Analytics</a>
        </div>

        <div style={{marginTop:10}}>
          <a href="/dashboard">→ Product Dashboard</a>
        </div>

      </div>

    </main>
  )
}
