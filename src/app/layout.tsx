import './globals.scss';
import { Header } from '../components/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <main className="app-layout">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
