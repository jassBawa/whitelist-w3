'use client';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

import Header from '@/components/ui/Header';
import ClientProviders from '@/provider';
import { AnimatePresence, motion } from 'framer-motion';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientProviders>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
            <Header />
            <AnimatePresence key="layout">
              <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="container mx-auto px-4 flex-1 flex flex-col items-center justify-center py-12 max-w-3xl"
              >
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-4 w-full"
                >
                  <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.7 }}
                    className="text-4xl font-bold text-[#3B82F6] mb-4"
                  >
                    Join the Whitelist
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.7 }}
                    className="text-lg text-gray-300"
                  >
                    Complete all tasks to secure your spot
                  </motion.p>
                </motion.div>
                {children}
              </motion.main>
            </AnimatePresence>
          </div>
          <Toaster position="top-right" />
        </body>
      </html>
    </ClientProviders>
  );
}
