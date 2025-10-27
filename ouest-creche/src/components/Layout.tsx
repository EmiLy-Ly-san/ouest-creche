import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-pink-50">
      <Header />
      <main className="flex flex-col">
        <Outlet />
      </main>
      <footer className="fbottom-0 left-0 w-full bg-white shadow-inner py-3 text-center text-gray-500 text-sm">
        © Les canapés 2025
      </footer>
    </div>
  );
}
