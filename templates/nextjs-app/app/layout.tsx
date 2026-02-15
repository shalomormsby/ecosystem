import type { Metadata } from 'next';
import { ThemeProvider, TooltipProvider, Toaster } from '@thesage/ui';
import './globals.css';

export const metadata: Metadata = {
  title: 'My Sage App',
  description: 'Built with Sage Design Engine',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground" suppressHydrationWarning>
        <ThemeProvider defaultTheme="studio" defaultMode="system">
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
