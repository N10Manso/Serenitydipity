import type { Metadata } from 'next';
import './styles.css';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'AppStarter',
  description: 'A minimal full-stack starter with Next.js, Prisma, and Tailwind.'
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>): JSX.Element {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="min-h-full text-gray-900 antialiased">
        <header className="border-b bg-white">
          <div className="container mx-auto max-w-5xl px-4 py-4">
            <h1 className="text-xl font-semibold">AppStarter</h1>
          </div>
        </header>
        <main className="container mx-auto max-w-5xl px-4 py-6">{children}</main>
        <footer className="border-t bg-white">
          <div className="container mx-auto max-w-5xl px-4 py-4 text-sm text-gray-500">
            <span>© {new Date().getFullYear()} AppStarter</span>
          </div>
        </footer>
      </body>
    </html>
  );
}

