"use client"

import { useEffect, useState } from "react"

export default function Dashboard() {
  const [status, setStatus] = useState("init")

  useEffect(() => {
    setTimeout(() => setStatus("OK"), 300)
  }, [])

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>
      <p>state: {status}</p>
      <p>AUTH BYPASSED</p>
    </div>
  )
}
