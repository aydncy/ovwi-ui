"use client"

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getUser()

      if (!data?.user) {
        window.location.href = "/"
      } else {
        setUser(data.user)
      }

      setLoading(false)
    }

    load()
  }, [])

  if (loading) return <div style={{ padding: 40 }}>Loading...</div>

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>
      <p>{user?.email}</p>
    </div>
  )
}
