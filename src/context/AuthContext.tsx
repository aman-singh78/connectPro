'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Simple user type for frontend-only
interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'MANAGER' | 'USER';
  avatar?: string;
}

interface Team {
  id: string;
  name: string;
  description?: string;
}

interface AuthState {
  user: User | null;
  team: Team | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Mock users for frontend-only demo
const mockUsers: Array<{ email: string; password: string; user: User }> = [
  {
    email: 'admin@example.com',
    password: 'password123',
    user: {
      id: '1',
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'ADMIN',
      avatar: undefined
    }
  },
  {
    email: 'manager@example.com',
    password: 'password123',
    user: {
      id: '2',
      email: 'manager@example.com',
      name: 'Team Manager',
      role: 'MANAGER',
      avatar: undefined
    }
  },
  {
    email: 'user@example.com',
    password: 'password123',
    user: {
      id: '3',
      email: 'user@example.com',
      name: 'Regular User',
      role: 'USER',
      avatar: undefined
    }
  }
];

const mockTeam: Team = {
  id: '1',
  name: 'Development Team',
  description: 'Main development team'
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    team: null,
    isAuthenticated: false,
    isLoading: false,
  });

  const login = async (email: string, password: string): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true }));

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockUser = mockUsers.find(u => 
      u.email === email && u.password === password
    );

    if (!mockUser) {
      setState(prev => ({ ...prev, isLoading: false }));
      throw new Error('Invalid credentials');
    }

    setState({
      user: mockUser.user,
      team: mockTeam,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const logout = () => {
    setState({
      user: null,
      team: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
