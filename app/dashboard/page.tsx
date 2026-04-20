import { createSupabaseServer } from '../lib/supabaseServer'
import { redirect } from 'next/navigation'
import LiveData from './live-data'
import VerifyBox from './verify-box'

export default async function Dashboard(){

  const supabase = await createSupabaseServer()

  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (!session) redirect('/login')

  const email = session.user.email

  return (
    <main className="container">

      <h1>Dashboard</h1>

      <VerifyBox apiKey={''} />

      <LiveData email={email} />

    </main>
  )
}
