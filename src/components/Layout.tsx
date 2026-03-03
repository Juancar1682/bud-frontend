import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function Layout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-5 pb-24 sm:px-6 sm:py-8 md:pb-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
