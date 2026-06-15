import './globals.css';
import Navbar from '@/app/components/navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#020617] text-white">

        <Navbar />

        {children}

      </body>
    </html>
  );
}
