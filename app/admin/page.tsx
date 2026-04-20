import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Admin(){

  const cookieStore = await cookies()
  const admin = cookieStore.get('admin_auth')?.value === '1'

  if(!admin) redirect('/')

  return (
    <main className="container">
      <h1>Admin Panel</h1>
      <p>Full control active</p>
    </main>
  )
}
