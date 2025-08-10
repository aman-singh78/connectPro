'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  HomeIcon, 
  UsersIcon, 
  CogIcon, 
  ChartBarIcon,
  ShieldCheckIcon,
  Users,
  FolderIcon
} from 'lucide-react';

const navigation = [
  { 
    name: 'Dashboard', 
    href: '/dashboard', 
    icon: HomeIcon,
    roles: ['ADMIN', 'MANAGER', 'USER']
  },
  { 
    name: 'Team', 
    href: '/dashboard/team', 
    icon: Users,
    roles: ['ADMIN', 'MANAGER', 'USER']
  },
  { 
    name: 'Projects', 
    href: '/dashboard/projects', 
    icon: FolderIcon,
    roles: ['ADMIN', 'MANAGER', 'USER']
  },
  { 
    name: 'Users', 
    href: '/dashboard/users', 
    icon: UsersIcon,
    roles: ['ADMIN', 'MANAGER']
  },
  { 
    name: 'Analytics', 
    href: '/dashboard/analytics', 
    icon: ChartBarIcon,
    roles: ['ADMIN', 'MANAGER']
  },
  { 
    name: 'Admin Panel', 
    href: '/admin', 
    icon: ShieldCheckIcon,
    roles: ['ADMIN']
  },
  { 
    name: 'Settings', 
    href: '/dashboard/settings', 
    icon: CogIcon,
    roles: ['ADMIN', 'MANAGER', 'USER']
  },
];

const DashboardSidebar = () => {
  const { user, team } = useAuth();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!user) return null;

  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(user.role)
  );

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden">
        <button
          type="button"
          className="fixed top-4 left-4 z-50 rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="sr-only">Open sidebar</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75" onClick={() => setIsMobileMenuOpen(false)} />
        </div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex h-16 items-center justify-center bg-gray-900">
          <h1 className="text-xl font-bold text-white">Connect Pro</h1>
        </div>
        
        <nav className="mt-8 space-y-1 px-3">
          {filteredNavigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  group flex items-center rounded-md px-2 py-2 text-sm font-medium transition-colors
                  ${isActive
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }
                `}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Team info */}
        {team && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-900">
            <div className="text-xs text-gray-400">Current Team</div>
            <div className="text-sm font-medium text-white truncate">{team.name}</div>
          </div>
        )}
      </div>
    </>
  );
};

export { DashboardSidebar };
