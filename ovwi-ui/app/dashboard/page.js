"use client"

import { useEffect, useState } from "react"
import { createSupabaseBrowser } from "@/app/lib/supabase-browser"

export default function Dashboard() {
  const [state, setState] = useState("init")
  const [email, setEmail] = useState("")

  useEffect(() => {
    const run = async () => {
      const supabase = createSupabaseBrowser()

      setState("getSession")
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        setState("error:" + error.message)
        return
      }

      if (!data?.session) {
        setState("no-session → redirect")
        window.location.href = "/"
        return
      }

      setEmail(data.session.user.email)
      setState("OK")
    }

    run()
  }, [])

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>
      <p>state: {state}</p>
      <p>{email}</p>
    </div>
  )
}
