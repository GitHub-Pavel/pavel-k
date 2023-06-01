import './globals.css';
import 'react-loading-skeleton/dist/skeleton.css';

import { Providers } from '@store';
import classNames from 'classnames';
import { Inter } from 'next/font/google';
import { 
  Header, 
  Footer, 
  Preloader, 
  PortalRoot,
  CircleContact, 
  InitialEvents,
  QueryProvider,
} from '@components';


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Pavel K. - Web developer',
  description: 'Web developer portfolio site Pavel K.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bodyClasses = classNames(
    inter.className, 'loading',
    'scrollbar scrollbar-thumb-red scrollbar-track-dark scrollbar-thin flex flex-col min-h-screen'
  );

  return (
    <html lang="en">
      <head>
        <link 
          rel="icon" 
          href="/favicon.ico" 
          sizes="any"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body className={bodyClasses}>
        <QueryProvider >
          <Providers>
            <Preloader />
            <Header />
            {children}
            <Footer />
            <CircleContact />
            <InitialEvents />
            <PortalRoot />
          </Providers>
        </QueryProvider>
      </body>
    </html>
  )
}