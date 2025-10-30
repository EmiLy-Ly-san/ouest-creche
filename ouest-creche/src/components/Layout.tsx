import { Outlet } from 'react-router-dom';
import Header from './Header';
import FooterNav from './FooterNav';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col bg-[#feffee]">
        <Outlet />
      </main>
      <FooterNav />
    </div>
  );
}
