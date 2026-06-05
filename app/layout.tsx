import './globals.css';
import type { Metadata } from 'next';
import Navbar from './components/Navbar';

export const metadata: Metadata = {
  title: 'OVWI',
  description: 'AI infrastructure platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>

<div style={{
  background:'#111',
  padding:'10px',
  textAlign:'center',
  borderBottom:'1px solid #333'
}}>
  Upgrade to Pro for more API usage
  <a href="/upgrade" style={{
    marginLeft:'10px',
    color:'#0af',
    fontWeight:'bold'
  }}>
    Upgrade →
  </a>
</div>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
