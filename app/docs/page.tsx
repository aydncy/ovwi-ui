
export default function DocsPage(){

  return (
    <main>


      <section
        style={{
          padding:'120px 0'
        }}
      >

        <div className="container">

          <div
            style={{
              maxWidth:900
            }}
          >

            <div className="badge">
              Documentation
            </div>

            <h1
              style={{
                fontSize:72,
                lineHeight:1,
                letterSpacing:-3,
                margin:'24px 0'
              }}
            >
              Production-ready
              API Infrastructure
            </h1>

            <p
              style={{
                color:'rgba(255,255,255,.7)',
                fontSize:20,
                lineHeight:1.8
              }}
            >
              Authenticate users, verify
              webhooks, manage API keys,
              track analytics and monetize
              your infrastructure with OVWI.
            </p>

            <div
              className="glass"
              style={{
                marginTop:40,
                borderRadius:28,
                padding:32
              }}
            >

<pre
style={{
  overflow:'auto',
  color:'#60a5fa'
}}
>{`curl -X POST https://ovwi.cyzora.com/api/verify \\
-H "Content-Type: application/json" \\
-d '{
  "apiKey":"ovwi_live_xxxx"
}'`}
</pre>

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}
