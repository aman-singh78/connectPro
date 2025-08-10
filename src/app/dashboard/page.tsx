'use client';

import { useAuth } from '@/context/AuthContext';
import { 
  Users, 
  UserCheck, 
  Building, 
  Activity,
  TrendingUp,
  Calendar,
  Bell,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data for demo
const mockStats = {
  totalUsers: 150,
  activeUsers: 142,
  totalTeams: 23,
  activeTeams: 21,
  recentActivity: [
    {
      id: '1',
      description: 'John Doe logged in',
      createdAt: new Date(Date.now() - 1000 * 60 * 5),
    },
    {
      id: '2',
      description: 'Alice Johnson joined Development Team',
      createdAt: new Date(Date.now() - 1000 * 60 * 15),
    },
    {
      id: '3',
      description: 'New team "Marketing" was created',
      createdAt: new Date(Date.now() - 1000 * 60 * 30),
    }
  ]
};

const StatCard = ({ icon: Icon, title, value, description, trend }: {
  icon: any;
  title: string;
  value: string | number;
  description: string;
  trend?: { value: number; isPositive: boolean };
}) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Icon className="h-6 w-6 text-gray-400" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  {value}
                </div>
                {trend && (
                  <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                    trend.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className="h-4 w-4 flex-shrink-0" />
                    {trend.value}%
                  </div>
                )}
              </dd>
            </dl>
          </div>
        </div>
        <div className="mt-3">
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
};

const ActivityFeed = ({ activities }: { activities: any[] }) => {
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
        <div className="flow-root">
          <ul className="-mb-8">
            {activities.map((activity, idx) => (
              <li key={activity.id}>
                <div className="relative pb-8">
                  {idx !== activities.length - 1 && (
                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" />
                  )}
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                        <Activity className="h-4 w-4 text-white" />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500">{activity.description}</p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        {formatTimeAgo(activity.createdAt)}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <Button variant="outline" className="w-full">
            View all activity
          </Button>
        </div>
      </div>
    </div>
  );
};

const QuickActions = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  const actions = [
    {
      name: 'Invite Team Member',
      href: '/dashboard/team/invite',
      icon: Users,
      color: 'bg-blue-600 hover:bg-blue-700',
      roles: ['ADMIN', 'MANAGER']
    },
    {
      name: 'Create Project',
      href: '/dashboard/projects/new',
      icon: Plus,
      color: 'bg-green-600 hover:bg-green-700',
      roles: ['ADMIN', 'MANAGER', 'USER']
    },
    {
      name: 'Schedule Meeting',
      href: '/dashboard/calendar/new',
      icon: Calendar,
      color: 'bg-purple-600 hover:bg-purple-700',
      roles: ['ADMIN', 'MANAGER', 'USER']
    },
    {
      name: 'Send Announcement',
      href: '/dashboard/announcements/new',
      icon: Bell,
      color: 'bg-orange-600 hover:bg-orange-700',
      roles: ['ADMIN', 'MANAGER']
    }
  ];

  const availableActions = actions.filter(action => 
    action.roles.includes(user.role)
  );

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {availableActions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.name}
                variant="outline"
                className={`p-4 h-auto flex-col space-y-2 ${action.color} text-white hover:text-white border-0`}
                onClick={() => window.location.href = action.href}
              >
                <Icon className="h-6 w-6" />
                <span className="text-sm font-medium">{action.name}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const { user, team } = useAuth();

  if (!user) return null;

  const canViewAdminStats = user.role === 'ADMIN' || user.role === 'MANAGER';

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user.name}!
        </h1>
        <p className="text-gray-600">
          {team ? `You're part of ${team.name}` : 'No team assigned'} • Role: {user.role.toLowerCase()}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Users}
          title="Total Users"
          value={mockStats.totalUsers}
          description="Registered users"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          icon={UserCheck}
          title="Active Users"
          value={mockStats.activeUsers}
          description="Users active this week"
          trend={{ value: 8, isPositive: true }}
        />
        {canViewAdminStats && (
          <>
            <StatCard
              icon={Building}
              title="Teams"
              value={mockStats.totalTeams}
              description="Active teams"
              trend={{ value: 3, isPositive: true }}
            />
            <StatCard
              icon={Activity}
              title="Team Activity"
              value={mockStats.activeTeams}
              description="Teams with recent activity"
              trend={{ value: 15, isPositive: true }}
            />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <QuickActions />
        
        {/* Recent Activity */}
        <ActivityFeed activities={mockStats.recentActivity} />
      </div>
    </div>
  );
};

export default DashboardPage;
