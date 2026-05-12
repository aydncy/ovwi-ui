import './globals.css'

export const metadata = {
  title: 'OVWI',
  description: 'AI Infrastructure Platform'
}

export default function RootLayout({
  children,
}:{
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
