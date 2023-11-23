import type { AppProps } from 'next/app';
import { NextUIProvider } from '@nextui-org/react';

import '@/styles/globals.css';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider className='h-full'>
      <div className="relative flex flex-col h-full">
        <main className="dark text-foreground bg-background h-full">
          <Component {...pageProps} />
        </main>
      </div>
    </NextUIProvider>
  )
}
