export default async function Admin(){

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/admin/growth`,
    { cache:'no-store' }
  )

  const data = await res.json()

  return (
    <main className="container">

      <h1 style={{fontSize:36}}>Growth Analytics</h1>

      <div className="stats-grid">

        <div className="card stat-card">
          <div>Total Users</div>
          <h2>{data.totalUsers}</h2>
        </div>

        <div className="card stat-card">
          <div>Paid Users</div>
          <h2>{data.paidUsers}</h2>
        </div>

        <div className="card stat-card">
          <div>MRR</div>
          <h2>${data.mrr}</h2>
        </div>

        <div className="card stat-card">
          <div>Conversion %</div>
          <h2>{data.conversion}%</h2>
        </div>

      </div>

    </main>
  )
}
