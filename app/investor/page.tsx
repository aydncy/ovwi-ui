import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

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

      <h1 style={{fontSize:56}}>OVWI</h1>

      <p style={{opacity:0.7}}>
        API Monetization Infrastructure
      </p>

      <div style={{marginTop:60}}>

        <h2 style={{fontSize:48}}>
          ${data.mrr} MRR
        </h2>

        <p style={{opacity:0.6}}>Monthly Recurring Revenue</p>

      </div>

      <div style={{marginTop:40}}>

        <h2 style={{fontSize:40}}>
          {data.conversion}%
        </h2>

        <p style={{opacity:0.6}}>Free → Paid Conversion</p>

      </div>

      <div style={{marginTop:40}}>

        <h2 style={{fontSize:40}}>
          {data.totalUsers}
        </h2>

        <p style={{opacity:0.6}}>Users</p>

      </div>

    </main>
  )
}
