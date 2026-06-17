import './globals.css';
import Navbar from '@/components/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-black via-gray-900 to-black text-white min-h-screen">

        <Navbar />

        <main className="min-h-screen">
          {children}
        </main>

      </body>
    </html>
  );
}
