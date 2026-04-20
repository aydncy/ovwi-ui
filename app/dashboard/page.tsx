import { createSupabaseServer } from '../lib/supabaseServer'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import VerifyBox from './verify-box'
import LiveData from './live-data'
import UsageChart from './usage-chart'
import KpiCards from './kpi-cards'

export default async function Dashboard(){

  const cookieStore = await cookies()
  const admin = cookieStore.get('admin_auth')?.value === '1'

  let email = ''

  if(admin){
    email = process.env.ADMIN_EMAIL!
  } else {
    const supabase = await createSupabaseServer()
    const { data:{ session } } = await supabase.auth.getSession()
    if(!session) redirect('/login')
    email = session.user.email
  }

  return (
    <main className="container">
      <h1 style={{fontSize:36}}>Dashboard</h1>

      <KpiCards email={email} />
      <UsageChart email={email} />
      <VerifyBox />
      <LiveData email={email} />
    </main>
  )
}
