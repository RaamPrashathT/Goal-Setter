import Header from '../components/Header';
import '../styles/globals.css';

export const metadata = {
  title: 'Goal Setter App',
  description: 'Set and manage your goals',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 font-sans">
        <Header />
        <main className="h-screen w-full">{children}</main>
      </body>
    </html>
  );
}