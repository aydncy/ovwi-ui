import { createSupabaseServer } from '../lib/supabaseServer'
import { redirect } from 'next/navigation'
import VerifyBox from './verify-box'
import LiveData from './live-data'
import UsageChart from './usage-chart'
import KpiCards from './kpi-cards'

export default async function Dashboard(){

  const supabase = await createSupabaseServer()

  const {
    data:{ session }
  } = await supabase.auth.getSession()

  if(!session) redirect('/login')

  const email = session.user.email

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
