'use client'

import { useEffect,useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabaseBrowser'

export default function Dashboard(){

  const router = useRouter()

  const [loading,setLoading] =
    useState(true)

  const [email,setEmail] =
    useState('')

  useEffect(()=>{

    async function init(){

      const {
        data:{ session }
      } = await supabase.auth.getSession()

      if(!session){
        router.replace('/login')
        return
      }

      setEmail(
        session.user.email || ''
      )

      setLoading(false)
    }

    init()

  },[])

  if(loading){
    return (
      <main
        style={{
          minHeight:'100vh',
          background:'#020617'
        }}
      />
    )
  }

  return (
    <main
      style={{
        minHeight:'100vh',
        background:
          'linear-gradient(to bottom,#020617,#0f172a)',
        color:'white',
        padding:'40px'
      }}
    >

      <div
        style={{
          maxWidth:1400,
          margin:'0 auto'
        }}
      >

        <div
          style={{
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            marginBottom:40
          }}
        >

          <div>

            <h1
              style={{
                fontSize:58,
                fontWeight:900,
                margin:0
              }}
            >
              OVWI Control Center
            </h1>

            <p
              style={{
                opacity:.7,
                marginTop:12,
                fontSize:18
              }}
            >
              {email}
            </p>

          </div>

          <button
            onClick={async()=>{

              await supabase.auth.signOut()

              router.replace('/login')

            }}
            style={{
              height:54,
              padding:'0 26px',
              border:'none',
              borderRadius:18,
              background:'#2563eb',
              color:'white',
              fontWeight:800,
              cursor:'pointer'
            }}
          >
            Logout
          </button>

        </div>

        <div
          style={{
            display:'grid',
            gridTemplateColumns:
              'repeat(4,1fr)',
            gap:20
          }}
        >

          {[
            ['Revenue','$84,240'],
            ['API Calls','4.2M'],
            ['Growth','+482%'],
            ['Users','18,204']
          ].map((item)=>(
            <div
              key={item[0]}
              style={{
                background:
                  'rgba(255,255,255,.05)',
                border:
                  '1px solid rgba(255,255,255,.08)',
                borderRadius:28,
                padding:28,
                backdropFilter:'blur(14px)'
              }}
            >

              <div
                style={{
                  opacity:.6,
                  marginBottom:12
                }}
              >
                {item[0]}
              </div>

              <div
                style={{
                  fontSize:42,
                  fontWeight:900
                }}
              >
                {item[1]}
              </div>

            </div>
          ))}

        </div>

        <div
          style={{
            marginTop:24,
            display:'grid',
            gridTemplateColumns:
              '1.3fr .7fr',
            gap:24
          }}
        >

          <div
            style={{
              background:
                'rgba(255,255,255,.05)',
              border:
                '1px solid rgba(255,255,255,.08)',
              borderRadius:32,
              padding:30
            }}
          >

            <h2
              style={{
                marginTop:0,
                fontSize:34
              }}
            >
              Live Infrastructure
            </h2>

            <div
              style={{
                marginTop:24,
                height:260,
                borderRadius:24,
                background:
                  'linear-gradient(135deg,#2563eb33,#06b6d433)'
              }}
            />

          </div>

          <div
            style={{
              background:
                'rgba(255,255,255,.05)',
              border:
                '1px solid rgba(255,255,255,.08)',
              borderRadius:32,
              padding:30
            }}
          >

            <h2
              style={{
                marginTop:0,
                fontSize:34
              }}
            >
              API Playground
            </h2>

            <div
              style={{
                marginTop:20,
                background:'#020617',
                borderRadius:20,
                padding:20,
                fontFamily:'monospace',
                color:'#60a5fa',
                whiteSpace:'pre-wrap'
              }}
            >
{`curl -X POST https://ovwi.cyzora.com/api/verify

{
 "apiKey":"ovwi_live_xxx"
}`}
            </div>

          </div>

        </div>

      </div>

    </main>
  )
}

<div
  style={{
    marginTop:24,
    background:'rgba(255,255,255,.05)',
    border:'1px solid rgba(255,255,255,.08)',
    borderRadius:28,
    padding:30
  }}
>

  <h2
    style={{
      marginTop:0,
      fontSize:32
    }}
  >
    API Usage
  </h2>

  <div
    style={{
      marginTop:24
    }}
  >

    <div
      style={{
        display:'flex',
        justifyContent:'space-between',
        marginBottom:10
      }}
    >
      <span>Remaining Requests</span>
      <span>7,421 / 10,000</span>
    </div>

    <div
      style={{
        height:18,
        borderRadius:999,
        overflow:'hidden',
        background:'#111827'
      }}
    >
      <div
        style={{
          width:'74%',
          height:'100%',
          background:
            'linear-gradient(90deg,#2563eb,#06b6d4)'
        }}
      />
    </div>

  </div>

</div>
