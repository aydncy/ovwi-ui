'use client'

import { supabase } from '../lib/supabase'

export default function Logout() {
  const logout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <button className="btn" onClick={logout}>
      Logout
    </button>
  )
}
