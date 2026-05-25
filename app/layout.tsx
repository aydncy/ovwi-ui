import "./globals.css";

export const metadata = {
  title: "OVWI Money Engine v3",
  description: "Production SaaS Billing + API Monetization System"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
