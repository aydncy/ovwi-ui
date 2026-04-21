'use client'

import { supabase } from '../lib/supabase'

export default function Login(){

  const loginGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider:'google',
      options:{
        redirectTo: `${window.location.origin}/dashboard`
      }
    })
  }

  return (
    <main className="container" style={{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      minHeight:'80vh'
    }}>

      <div className="card" style={{
        width:420,
        padding:30,
        textAlign:'center'
      }}>

        <h1 style={{fontSize:32}}>Login</h1>

        <p style={{opacity:0.6, marginBottom:20}}>
          Continue with Google
        </p>

        <button
          className="btn-primary"
          style={{width:'100%'}}
          onClick={loginGoogle}
        >
          Continue with Google
        </button>

      </div>

    </main>
  )
}
