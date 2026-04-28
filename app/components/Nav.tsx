import Link from 'next/link'
import { createSupabaseServer } from '../lib/supabaseClient'

export default async function Nav(){

  const supabase = await createSupabaseServer()
  const { data:{ session } } = await supabase.auth.getSession()

  return (
    <nav style={{
      display:'flex',
      justifyContent:'space-between',
      padding:'20px 40px'
    }}>

      <div>OVWI</div>

      <div style={{display:'flex', gap:10}}>

        <Link href="/">Home</Link>

        {session ? (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/logout">Logout</Link>
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}

      </div>

    </nav>
  )
}
