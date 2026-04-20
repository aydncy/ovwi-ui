import { NextResponse } from 'next/server'

export async function POST(req: Request){
  const { email } = await req.json()

  if(email !== process.env.ADMIN_EMAIL){
    return NextResponse.json({ ok:false })
  }

  const res = NextResponse.json({ ok:true })
  res.cookies.set('admin_auth','1',{ path:'/' })
  return res
}
