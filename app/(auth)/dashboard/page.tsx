import { createSupabaseServer } from '../../lib/supabaseServer'
import { redirect } from 'next/navigation'

export default async function Dashboard(){

  const supabase = await createSupabaseServer()
  const { data:{ session } } = await supabase.auth.getSession()

  if(!session){
    redirect('/login')
  }

  return (
    <main className="container">
      <h1>Dashboard</h1>
    </main>
  )
}
