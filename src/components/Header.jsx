import { Link, useLocation } from 'react-router-dom';
import { Package, Store, Map as MapIcon, LayoutDashboard } from 'lucide-react';

export default function Header() {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Items', path: '/items', icon: Package },
    { name: 'Stores', path: '/stores', icon: Store },
    { name: 'Map', path: '/map', icon: MapIcon },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-primary flex items-center gap-2">
                <Store className="h-8 w-8 text-emerald-600" />
                <span className="text-gray-900 tracking-tight">Ahram ERP</span>
              </Link>
            </div>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => {
                const isActive = location.pathname.startsWith(item.path) || (location.pathname === '/' && item.path === '/dashboard');
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive
                        ? 'border-emerald-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
