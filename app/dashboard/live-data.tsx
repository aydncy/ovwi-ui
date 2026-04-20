'use client'

import { useEffect, useState } from 'react'

export default function LiveData({ email }){

  const [data,setData] = useState<any>(null)

  const load = async () => {
    const res = await fetch(`/api/dashboard?email=${email}`)
    const json = await res.json()
    setData(json)
  }

  useEffect(()=>{
    load()

    const i = setInterval(load, 3000) // 3 saniyede bir sync

    return ()=>clearInterval(i)
  },[])

  if(!data) return null

  return (
    <>
      <div className="card" style={{marginTop:20}}>
        Usage: {data.usage} / {data.limit}
      </div>

      <div className="card" style={{marginTop:10}}>
        Plan: {data.plan}
      </div>

      {data.remaining <= 0 && (
        <div className="card" style={{marginTop:20}}>
          <h3>Upgrade Required</h3>

          <button
            className="btn-primary"
            onClick={()=>window.location.href =
              process.env.NEXT_PUBLIC_LEMON_CHECKOUT_PRO
            }
          >
            Upgrade Plan
          </button>
        </div>
      )}
    </>
  )
}
