import Link from 'next/link'

export default function LoginPage(){

  return (
    <main
      style={{
        minHeight:'100vh',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        padding:'40px'
      }}
    >

      <div
        className="glass"
        style={{
          width:'100%',
          maxWidth:520,
          borderRadius:32,
          padding:40
        }}
      >

        <div
          style={{
            fontSize:48,
            fontWeight:900,
            marginBottom:12,
            letterSpacing:-2
          }}
        >
          Welcome Back
        </div>

        <div
          style={{
            color:'rgba(255,255,255,.65)',
            marginBottom:30,
            lineHeight:1.7
          }}
        >
          Continue with Google to access
          your OVWI dashboard, API keys,
          analytics and infrastructure tools.
        </div>

        <a
          href="/api/auth/google"
          className="primary-btn"
          style={{
            width:'100%',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            height:62,
            fontSize:18,
            borderRadius:18
          }}
        >
          Continue with Google
        </a>

        <div
          style={{
            marginTop:24,
            textAlign:'center'
          }}
        >
          <Link
            href="/"
            style={{
              color:'#60a5fa'
            }}
          >
            Back to Home
          </Link>
        </div>

      </div>

    </main>
  )
}
