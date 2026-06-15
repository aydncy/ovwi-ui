import './globals.css';
import Navbar from './components/navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#020617] text-white">

        <Navbar />

        <div className="max-w-6xl mx-auto px-6">
          {children}
        </div>

      </body>
    </html>
  );
}
