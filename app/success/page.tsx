'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SuccessPage(){
  const router = useRouter()

  useEffect(()=>{
    const email = localStorage.getItem('ovwi_email')

    setTimeout(()=>{
      if(email){
        router.push("/dashboard")
      } else {
        router.push("/login")
      }
    },1000)
  },[])

  return (
    <main style={{
      display:"grid",
      placeItems:"center",
      height:"100vh",
      color:"white"
    }}>
      <div style={{textAlign:"center"}}>
        <h1 style={{fontSize:42}}>Payment Successful</h1>
        <p style={{opacity:0.7, marginTop:10}}>
          Redirecting...
        </p>
      </div>
    </main>
  )
}
