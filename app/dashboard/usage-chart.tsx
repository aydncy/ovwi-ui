'use client'

import { useEffect, useState } from 'react'

export default function UsageChart({ email }){

  const [data,setData] = useState<number[]>([])

  useEffect(()=>{
    fetch(`/api/dashboard?email=${email}`)
      .then(r=>r.json())
      .then(d=>{
        const base = d.usage || 0

        // fake trend (sonra DB’den history bağlanabilir)
        const arr = Array.from({length:7},(_,i)=>
          Math.max(0, base - (6-i)*5)
        )

        setData(arr)
      })
  },[])

  const max = Math.max(...data,10)

  return (
    <div className="card" style={{marginTop:20}}>

      <h3>Usage Trend</h3>

      <svg width="100%" height="120">

        {data.map((v,i)=>{
          const x = (i / 6) * 100
          const y = 100 - (v / max) * 100

          return (
            <circle
              key={i}
              cx={`${x}%`}
              cy={`${y}%`}
              r="4"
              fill="#3b82f6"
            />
          )
        })}

        {data.map((v,i)=>{
          if(i===0) return null

          const x1 = ((i-1)/6)*100
          const y1 = 100 - (data[i-1]/max)*100

          const x2 = (i/6)*100
          const y2 = 100 - (v/max)*100

          return (
            <line
              key={i}
              x1={`${x1}%`}
              y1={`${y1}%`}
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke="#3b82f6"
              strokeWidth="2"
            />
          )
        })}

      </svg>

    </div>
  )
}
