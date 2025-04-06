import './globals.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '../components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatBot from '@/components/chat/ChatBot';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'iTech Institute - Advanced Technology Education',
  description: 'Leading technology education institute offering courses in Full Stack Development, AI/ML, Cybersecurity and more.',
  keywords: 'technology education, coding bootcamp, cybersecurity training, AI/ML courses',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://itech-institute.com',
    title: 'iTech Institute',
    description: 'Advanced Technology Education',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'iTech Institute'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'iTech Institute',
    description: 'Advanced Technology Education',
    images: ['/og-image.jpg']
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://itech-institute.com" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-sans">
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <ChatBot />
        </ThemeProvider>
      </body>
    </html>
  );
}
