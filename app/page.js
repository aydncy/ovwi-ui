"use client"
import { useState } from "react"

export default function Page() {
  const [email,setEmail]=useState("aydinceylan07@gmail.com")
  const [payload,setPayload]=useState(`{
"id":"evt_123456",
"type":"charge.succeeded"
}`)
  const [result,setResult]=useState(null)

  const verify=async()=>{
    const res=await fetch("/api/verify",{
      method:"POST",
      headers:{ "Content-Type":"application/json"},
      body:JSON.stringify({ key:"ovwi_live_onjneyjiwh" })
    })
    const data=await res.json()
    setResult(data)
  }

  return (
    <div style={{minHeight:"100vh",background:"#020617",color:"#fff",padding:40}}>

      {/* NAVBAR */}
      <div style={{display:"flex",justifyContent:"space-between"}}>
        <h2>Cyzora</h2>
        <button style={{background:"#3b82f6",padding:"8px 16px",borderRadius:10}}>
          Login
        </button>
      </div>

      {/* HERO */}
      <div style={{display:"flex",gap:40,marginTop:60}}>

        <div style={{flex:1}}>
          <h1 style={{fontSize:48,fontWeight:800}}>
            Stop debugging.<br/>
            <span style={{color:"#3b82f6"}}>Start verifying.</span>
          </h1>

          <p style={{opacity:.7,marginTop:10}}>
            Verify webhooks instantly with real-time feedback and zero setup.
          </p>

          <div style={{marginTop:20}}>
            <button style={{marginRight:10}}>Get Started</button>
            <button>View Demo</button>
          </div>
        </div>

        {/* DEMO PANEL */}
        <div style={{flex:1,background:"#0f172a",padding:20,borderRadius:12}}>

          <div>Email</div>
          <input value={email} onChange={e=>setEmail(e.target.value)}
            style={{width:"100%",padding:10,marginBottom:10}}/>

          <div>Payload</div>
          <textarea value={payload} onChange={e=>setPayload(e.target.value)}
            style={{width:"100%",height:120,padding:10}}/>

          <div style={{marginTop:10}}>
            <button onClick={verify}>Verify</button>
          </div>

          {result && (
            <pre style={{marginTop:20,color:"#0f0"}}>
{JSON.stringify(result,null,2)}
            </pre>
          )}

        </div>

      </div>

    </div>
  )
}
