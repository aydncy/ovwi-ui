'use client';
import Navbar from '@/app/components/Navbar';
export default function DocsPage() {
  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard-top"><h1>Docs</h1><p style={{color:'#8da6cf'}}>Production-ready verification API</p></div>
        <div className="panel"><h2>Create Key</h2><pre className="result">POST /api/create-key</pre></div>
        <div className="panel"><h2>Verify</h2><pre className="result">POST /api/verify&#123;"email":"you@co.com"&#125;</pre></div>
      </div>
    </>
  );
}
