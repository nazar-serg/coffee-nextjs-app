import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400','500','700'],
  style: ['normal', 'italic'],
});

export const metadata = {
  title: 'WP Next Theme',
  description: 'Headless WordPress сайт на Next.js',
  icons: {
    icon: './favicon.png',
  },
};

export default function RootLayout({ children }) {

  return (
    <html lang="en" className={roboto.className}>
      <body>
        <Header />
        <main>
            {children}
          </main>
          <Footer />
      </body>
    </html>
  );
}
