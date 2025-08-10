'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { BellIcon, UserCircleIcon, ChevronDownIcon } from 'lucide-react';

const DashboardHeader = () => {
  const { user, logout } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left side - could add breadcrumbs or search */}
          <div className="flex items-center">
            <h1 className="text-lg font-semibold text-gray-900 lg:hidden">
              Connect Pro
            </h1>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button variant="outline" size="sm" className="relative">
              <BellIcon className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></span>
            </Button>

            {/* User menu */}
            <div className="relative" ref={userMenuRef}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2"
              >
                {user.avatar ? (
                  <img
                    className="h-6 w-6 rounded-full"
                    src={user.avatar}
                    alt={user.name}
                  />
                ) : (
                  <UserCircleIcon className="h-6 w-6" />
                )}
                <span className="text-sm font-medium">{user.name}</span>
                <ChevronDownIcon className="h-4 w-4" />
              </Button>

              {isUserMenuOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-gray-500">{user.email}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      Role: {user.role.toLowerCase()}
                    </div>
                  </div>
                  
                  <a
                    href="/dashboard/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Profile Settings
                  </a>
                  
                  <a
                    href="/dashboard/team"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Team Settings
                  </a>
                  
                  <a
                    href="/dashboard/billing"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Billing
                  </a>
                  
                  <div className="border-t border-gray-100">
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-sm text-red-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { DashboardHeader };
