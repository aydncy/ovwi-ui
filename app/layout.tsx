import './globals.css'
import AuthNav from './components/AuthNav'

export default function RootLayout({
  children
}:{
  children:React.ReactNode
}){

  return (
    <html lang="en">
      <body
        style={{
          margin:0,
          background:'#020617',
          color:'white',
          fontFamily:
            'Inter, sans-serif'
        }}
      >
        <AuthNav />
        {children}
      </body>
    </html>
  )
}
