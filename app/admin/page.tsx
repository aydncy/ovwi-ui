'use client'

import { useEffect, useState } from 'react'

export default function Admin(){

  const [users,setUsers] = useState<any[]>([])

  const load = async () => {
    const res = await fetch('/api/admin/users')
    const data = await res.json()
    setUsers(data)
  }

  useEffect(()=>{ load() },[])

  const action = async (email:string, type:string, value?:string) => {
    await fetch('/api/admin/users',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ email, action:type, value })
    })
    load()
  }

  return (
    <main className="container">

      <h1>Admin Control Panel</h1>

      <div style={{marginTop:20}}>

        {users.map(u=>(
          <div key={u.email} className="card" style={{marginTop:10}}>

            <div><b>{u.email}</b></div>
            <div>Plan: {u.plan}</div>
            <div>Usage: {u.usage_count}</div>

            <div style={{marginTop:10, display:'flex', gap:10}}>

              <button onClick={()=>action(u.email,'upgrade','pro')}>
                Upgrade Pro
              </button>

              <button onClick={()=>action(u.email,'upgrade','enterprise')}>
                Enterprise
              </button>

              <button onClick={()=>action(u.email,'reset')}>
                Reset Usage
              </button>

              <button onClick={()=>action(u.email,'create_key')}>
                New API Key
              </button>

            </div>

          </div>
        ))}

      </div>

    </main>
  )
}
