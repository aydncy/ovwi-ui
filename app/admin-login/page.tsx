'use client'

export default function AdminLogin(){

  const login = async () => {
    await fetch('/api/admin/login',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        email: process.env.NEXT_PUBLIC_ADMIN_EMAIL
      })
    })

    window.location.href = '/dashboard'
  }

  return (
    <main className="container">
      <h1>Admin Access</h1>

      <button className="btn-primary" onClick={login}>
        Enter Dashboard
      </button>
    </main>
  )
}
