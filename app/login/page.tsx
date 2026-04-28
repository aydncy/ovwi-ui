import { createSupabaseServer } from '../lib/supabaseServer'
import { redirect } from 'next/navigation'

export default async function Login(){

  const supabase = await createSupabaseServer()
  const { data:{ session } } = await supabase.auth.getSession()

  if(session){
    redirect('/dashboard')
  }

  return (
    <main className="container">
      <h1>Login</h1>

      <a href="/api/auth/google">
        <button className="btn-primary">Login with Google</button>
      </a>

    </main>
  )
}
