import type { Metadata } from 'next';
import { Providers } from '~/components/providers';

import '~/styles/globals.css';
import 'sweetalert2/src/sweetalert2.scss'

export const metadata: Metadata = {
  title: 'Gamatecha',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
