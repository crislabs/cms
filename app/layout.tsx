import { ReactQueryProvider } from '@/src/providers/ReactQueryContext';
import { SessionAuthProvider } from '@/src/providers/SessionContext';
import { UIProvider } from '@/src/providers/UIContext';
import '@/styles/globals.css';
import Header from '@/ui/Header';
import React from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <title>criscms</title>
      </head>
      <body>
        <SessionAuthProvider>
        <ReactQueryProvider>
          <UIProvider>
            <Header />
            {children}
          </UIProvider>
        </ReactQueryProvider>
        </SessionAuthProvider>
      </body>
    </html>
  );
}
