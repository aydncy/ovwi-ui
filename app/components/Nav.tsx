import Link from 'next/link'
import { createSupabaseServer } from '../lib/supabaseServer'

export default async function Nav() {
  const supabase = await createSupabaseServer()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <nav className="nav">
      <div className="nav-brand">OVWI</div>

      <div className="nav-links">
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
