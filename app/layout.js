import './globals.css';

export const metadata = {
  title: 'BAZ HOLDING GROUP - Institutional Asset Management',
  description: 'Professional Fund Management Platform. Institutional Asset Management with Real-time Performance Tracking & Analysis.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <nav>
          <div className="logo">BAZ HOLDING GROUP</div>
          <ul className="nav-items">
            <li><a href="#dashboard">Dashboard</a></li>
            <li><a href="#assets">Aset</a></li>
            <li><a href="#performance">Performa</a></li>
            <li><a href="#settings">Pengaturan</a></li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
