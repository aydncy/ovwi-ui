"use client"
import { useEffect, useState } from "react"

export default function Dashboard() {
  const [data,setData]=useState(null)

  useEffect(()=>{
    fetch("/api/dashboard?email=aydinceylan07@gmail.com")
      .then(r=>r.json())
      .then(d=>setData(d.summary))
  },[])

  if(!data) return <div style={{padding:40}}>Loading...</div>

  const percent = (data.usage / data.limit) * 100

  return (
    <div style={{
      background:"#020617",
      color:"#fff",
      minHeight:"100vh",
      padding:40,
      fontFamily:"system-ui"
    }}>

      <h1 style={{fontSize:32}}>Dashboard</h1>

      {/* PLAN */}
      <div style={{display:"flex",gap:20,marginTop:20}}>

        <div style={card}>
          <div style={label}>Plan</div>
          <div style={big}>{data.plan.toUpperCase()}</div>
        </div>

        <div style={card}>
          <div style={label}>Usage</div>
          <div style={big}>{data.usage}</div>
        </div>

        <div style={card}>
          <div style={label}>Limit</div>
          <div style={big}>{data.limit}</div>
        </div>

        <div style={card}>
          <div style={label}>Remaining</div>
          <div style={big}>{data.remaining}</div>
        </div>

      </div>

      {/* USAGE BAR */}
      <div style={{marginTop:30}}>
        <div style={{marginBottom:10}}>Usage</div>

        <div style={{
          height:12,
          background:"#111",
          borderRadius:20,
          overflow:"hidden"
        }}>
          <div style={{
            width:percent+"%",
            height:"100%",
            background:"linear-gradient(90deg,#3b82f6,#6366f1)",
            transition:"0.3s"
          }}/>
        </div>

        <div style={{marginTop:8,opacity:.6}}>
          {data.usage} / {data.limit}
        </div>
      </div>

      {/* UPGRADE CTA */}
      {data.plan === "free" && (
        <div style={{
          marginTop:40,
          padding:20,
          background:"#0f172a",
          borderRadius:12
        }}>
          <h3>Upgrade to Pro</h3>
          <p style={{opacity:.6}}>
            Increase your limit to 1000 requests/month
          </p>

          <a href={process.env.NEXT_PUBLIC_LEMON_CHECKOUT_PRO}>
            <button style={{
              background:"#3b82f6",
              padding:"10px 20px",
              borderRadius:8,
              marginTop:10
            }}>
              Upgrade
            </button>
          </a>
        </div>
      )}

    </div>
  )
}

const card={
  background:"#0f172a",
  padding:20,
  borderRadius:12,
  minWidth:120
}

const label={
  opacity:.6,
  fontSize:14
}

const big={
  fontSize:28,
  marginTop:5
}
