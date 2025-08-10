'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect authenticated users to dashboard
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Connect Pro
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Role-based team management platform with advanced access control
          </p>
        </div>
        
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Welcome to Connect Pro
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Manage your team with powerful role-based access control
              </p>
            </div>

            <div className="space-y-4">
              <Link href="/login">
                <Button className="w-full">
                  Sign In
                </Button>
              </Link>
              
              <div className="text-center">
                <span className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Sign up
                  </Link>
                </span>
              </div>
            </div>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Demo Credentials</span>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <div className="bg-gray-50 p-3 rounded">
                  <strong>Admin:</strong> admin@example.com / password123
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <strong>Manager:</strong> manager@example.com / password123
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <strong>User:</strong> user@example.com / password123
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Features</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-center space-x-2">
                  <span>✅</span>
                  <span>Role-based access control</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span>✅</span>
                  <span>Team management</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span>✅</span>
                  <span>User authentication</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span>✅</span>
                  <span>Dashboard analytics</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
