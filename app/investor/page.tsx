import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Investor(){

  const cookieStore = await cookies()
  const admin = cookieStore.get('admin_auth')?.value === '1'

  if(!admin) redirect('/')

  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    'https://ovwi.cyzora.com'

  const res = await fetch(`${base}/api/admin/growth`, { cache:'no-store' })
  const data = await res.json()

  return (
    <main className="container" style={{textAlign:'center'}}>

      <h1 style={{fontSize:60}}>OVWI</h1>

      <p style={{opacity:0.6}}>
        API Monetization Infrastructure
      </p>

      <div style={{marginTop:80}}>

        <h2 style={{fontSize:64}}>
          ${data.mrr}
        </h2>

        <p>Monthly Recurring Revenue</p>

      </div>

      <div style={{marginTop:50}}>

        <h2 style={{fontSize:48}}>
          {data.conversion}%
        </h2>

        <p>Conversion Rate</p>

      </div>

      <div style={{marginTop:50}}>

        <h2 style={{fontSize:48}}>
          {data.totalUsers}
        </h2>

        <p>Users</p>

      </div>

    </main>
  )
}
