import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { Navigation } from '@/components/navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_CONTEST_APP_URL || 'https://vote.sacavia.com'),
  title: 'Hidden Gems Contest - Vote for Amazing Local Places',
  description: 'Discover and vote for the best hidden gems in your city. Win up to $25,000 in prizes.',
  keywords: 'hidden gems, contest, local places, voting, prizes, sacavia, community',
  authors: [{ name: 'Sacavia Team' }],
  creator: 'Sacavia',
  publisher: 'Sacavia',
  robots: 'index, follow',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/icon-192.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vote.sacavia.com',
    title: 'Hidden Gems Contest - Vote for Amazing Local Places',
    description: 'Discover and vote for the best hidden gems in your city. Win up to $25,000 in prizes.',
    siteName: 'Hidden Gems Contest',
    images: [
      {
        url: '/logo.svg',
        width: 1024,
        height: 1024,
        alt: 'Sacavia Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hidden Gems Contest - Vote for Amazing Local Places',
    description: 'Discover and vote for the best hidden gems in your city. Win up to $25,000 in prizes.',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FF6B6B',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
