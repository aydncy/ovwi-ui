import Link from 'next/link'
import { createSupabaseServer } from '../lib/supabaseServer'

export default async function Nav(){

  const supabase =
    await createSupabaseServer()

  const {
    data:{ session }
  } = await supabase.auth.getSession()

  return (
    <header className="topbar">

      <div className="container topbar-inner">

        <div className="logo">
          OVWI
        </div>

        <nav className="nav">

          <Link href="/">
            Home
          </Link>

          <Link href="/docs">
            Docs
          </Link>

          {session ? (
            <>
              <Link href="/dashboard">
                Dashboard
              </Link>

              <Link
                href="/logout"
                className="primary-btn"
              >
                Logout
              </Link>
            </>
          ) : (
            <Link
              href="/login"
              className="primary-btn"
            >
              Login
            </Link>
          )}

        </nav>

      </div>

    </header>
  )
}
