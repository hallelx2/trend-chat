import './globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'TrendChat - Talk to Trends. Act Smarter.',
  description: 'AI-powered platform that tracks, summarizes, and allows you to converse with trends and insights from niche online communities.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={spaceGrotesk.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
