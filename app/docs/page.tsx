'use client';

import Navbar from '@/app/components/Navbar';

export default function DocsPage(){

  return (
    <>
      <Navbar />

      <div className="dashboard">

        <div className="dashboard-top">
          <div>
            <h1>Docs</h1>
            <p style={{color:'#8da6cf',marginTop:12}}>
              Production-ready verification API
            </p>
          </div>
        </div>

        <div className="panel">

          <h2 style={{marginBottom:20}}>
            Create Key
          </h2>

<pre className="result">{`POST /api/create-key`}</pre>

        </div>

        <div className="panel">

          <h2 style={{marginBottom:20}}>
            Verify Webhook
          </h2>

<pre className="result">{`POST /api/verify

{
  "email":"you@company.com"
}`}</pre>

        </div>

        <div className="panel">

          <h2 style={{marginBottom:20}}>
            Response
          </h2>

<pre className="result">{`{
  "ok":true,
  "usage":12,
  "remaining":38
}`}</pre>

        </div>

      </div>
    </>
  );
}
