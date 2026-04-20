'use client'

import { useEffect, useState } from 'react'

export default function KpiCards({ email }){

  const [data,setData] = useState<any>(null)

  useEffect(()=>{
    fetch(`/api/dashboard?email=${email}`)
      .then(r=>r.json())
      .then(setData)
  },[])

  if(!data) return null

  return (
    <div className="stats-grid">

      <div className="card stat-card">
        <div>Usage</div>
        <h2>{data.usage}</h2>
      </div>

      <div className="card stat-card">
        <div>Remaining</div>
        <h2>{data.remaining}</h2>
      </div>

      <div className="card stat-card">
        <div>Plan</div>
        <h2>{data.plan}</h2>
      </div>

    </div>
  )
}
