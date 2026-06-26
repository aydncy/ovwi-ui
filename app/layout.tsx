import './globals.css';
import { ThemeUIProvider } from 'theme-ui';
import { theme } from '@/lib/theme';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeUIProvider theme={theme}>
          {children}
        </ThemeUIProvider>
      </body>
    </html>
  );
}
