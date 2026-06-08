import './globals.css';

export const metadata = {
  title: 'Baz-V AI Trading Dashboard',
  description: 'Dashboard AI trading crypto institutional dengan Binance dan OpenAI.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
