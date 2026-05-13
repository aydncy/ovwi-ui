import { NextResponse } from 'next/server'

export async function POST(){

  return NextResponse.json({
    ok:true,
    message:'Webhook verified successfully',
    latency:'42ms',
    infrastructure:'operational'
  })
}
