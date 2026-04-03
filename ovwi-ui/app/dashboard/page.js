"use client"

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
)

export default function Dashboard() {
  const [state, setState] = useState("init")
  const [email, setEmail] = useState("")

  useEffect(() => {
    const run = async () => {
      setState("getting-user")
      const { data, error } = await supabase.auth.getUser()

      if (error) {
        setState("error:" + error.message)
        return
      }

      if (!data?.user) {
        setState("no-user → redirect")
        window.location.href = "/"
        return
      }

      setEmail(data.user.email || "")
      setState("ok")
    }

    run()
  }, [])

  return (
    <div style={{ padding: 40 }}>
      <h1>DEBUG DASHBOARD v3</h1>
      <p>state: {state}</p>
      <p>email: {email}</p>
    </div>
  )
}
