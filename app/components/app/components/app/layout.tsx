import './globals.css';
import Navbar from './components/navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#020617] text-white">

        <div className="text-center text-xs py-2 border-b border-gray-800">
          Upgrade to Pro for more API usage
          <a href="/upgrade" className="ml-2 underline">Upgrade →</a>
        </div>

        <Navbar />

        {children}

      </body>
    </html>
  );
}
