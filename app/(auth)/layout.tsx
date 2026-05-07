import { createSupabaseServer } from '../lib/supabaseServer'
import { redirect } from 'next/navigation'

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const supabase = await createSupabaseServer()
  const { data:{ session } } = await supabase.auth.getSession()

  if(!session){
    redirect('/login')
  }

  return <>{children}</>
}
