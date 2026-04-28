'use client'

import { createSupabaseBrowser } from '../lib/supabaseClient'

export default function Logout(){

  const supabase = createSupabaseBrowser()

  async function handleLogout(){
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  )
}
