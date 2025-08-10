# Connect Pro - Team Role-Based Access Control System

A Next.js application with comprehensive role-based access control, team management, and user authentication system.

## 🏗️ Project Structure

```
connect-pro/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # Backend API routes (to be implemented)
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── user/          # User management endpoints
│   │   │   └── team/          # Team management endpoints
│   │   ├── dashboard/         # Main dashboard pages
│   │   │   ├── layout.tsx     # Dashboard layout with sidebar
│   │   │   └── page.tsx       # Dashboard home page
│   │   ├── login/             # Login page
│   │   ├── admin/             # Admin panel pages
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page
│   ├── components/            # Reusable components
│   │   ├── ui/               # Base UI components (shadcn/ui)
│   │   ├── auth/             # Authentication components
│   │   ├── dashboard/        # Dashboard-specific components
│   │   └── layout/           # Layout components
│   ├── context/              # React contexts
│   │   └── AuthContext.tsx   # Authentication state management
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility libraries
│   ├── middleware/           # Custom middleware
│   │   └── auth.ts          # Authentication middleware
│   ├── types/               # TypeScript type definitions
│   │   ├── auth.ts          # Authentication types
│   │   └── dashboard.ts     # Dashboard types
│   └── utils/               # Utility functions
│       ├── auth.ts          # Authentication utilities
│       └── rbac.ts          # Role-based access control utilities
├── public/                  # Static files
├── middleware.ts           # Next.js middleware entry point
└── package.json           # Dependencies and scripts
```

## 🔐 Role-Based Access Control (RBAC)

### User Roles Hierarchy
1. **SUPER_ADMIN** - Full system access
2. **ADMIN** - User and team management
3. **MANAGER** - Team management and analytics
4. **USER** - Basic user access
5. **GUEST** - Read-only access

### Team Roles Hierarchy
1. **OWNER** - Full team control
2. **ADMIN** - Team administration
3. **MANAGER** - Team management
4. **MEMBER** - Team participation
5. **VIEWER** - Read-only team access

### Permissions System
- **USER_READ/WRITE/DELETE** - User management permissions
- **TEAM_READ/WRITE/DELETE** - Team management permissions
- **TEAM_INVITE/MANAGE_MEMBERS** - Team member management
- **ADMIN_ALL/USERS/TEAMS/SETTINGS** - Administrative permissions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Add required UI components
npx shadcn@latest add button input

# Install additional authentication dependencies
npm install jsonwebtoken bcryptjs @types/jsonwebtoken @types/bcryptjs
```

### Development
```bash
npm run dev
```

### Default Users (for testing)
```
Email: admin@example.com
Password: password123
Role: ADMIN

Email: user@example.com  
Password: password123
Role: USER

Email: manager@example.com
Password: password123  
Role: MANAGER
```

## 📁 Key Files Overview

### Authentication & Security
- `src/utils/auth.ts` - JWT token management, password hashing
- `src/utils/rbac.ts` - Role-based access control logic
- `src/middleware/auth.ts` - Route protection middleware
- `src/context/AuthContext.tsx` - Authentication state management

### UI Components
- `src/components/layout/DashboardSidebar.tsx` - Navigation sidebar
- `src/components/layout/DashboardHeader.tsx` - Top navigation bar
- `src/app/login/page.tsx` - Login page
- `src/app/dashboard/page.tsx` - Main dashboard

### Type Definitions
- `src/types/auth.ts` - User, team, and authentication types
- `src/types/dashboard.ts` - Dashboard and activity types

## 🛠️ Implementation Tasks for Team

### Backend API Routes (Priority: High)
1. **Authentication Routes** (`src/app/api/auth/`)
   - `login/route.ts` - User login endpoint
   - `register/route.ts` - User registration endpoint
   - `refresh/route.ts` - Token refresh endpoint
   - `me/route.ts` - Get current user endpoint

2. **User Management Routes** (`src/app/api/user/`)
   - `profile/route.ts` - User profile management
   - `settings/route.ts` - User settings management

3. **Team Management Routes** (`src/app/api/team/`)
   - `create/route.ts` - Team creation
   - `invite/route.ts` - Team invitations
   - `members/route.ts` - Member management

### Database Integration (Priority: High)
- Choose database (PostgreSQL, MySQL, MongoDB)
- Set up database schema/models
- Replace mock data with real database calls
- Add data validation and sanitization

### Additional Pages (Priority: Medium)
- User profile management page
- Team settings page  
- Admin panel pages
- User management interface
- Analytics dashboard

### Enhanced Features (Priority: Low)
- Real-time notifications
- Activity logging and audit trails
- File upload and management
- Email notifications
- Advanced team permissions
- API rate limiting
- Two-factor authentication

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:
```
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d
DATABASE_URL=your-database-connection-string
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
```

## 📚 Tech Stack

- **Framework**: Next.js 15 with App Router
- **UI**: Tailwind CSS + shadcn/ui components
- **Authentication**: JWT tokens + bcrypt
- **Icons**: Lucide React
- **TypeScript**: Full type safety
- **State Management**: React Context API

## 🤝 Contributing

1. Follow the established folder structure
2. Use TypeScript for all new files
3. Implement proper error handling
4. Add JSDoc comments for functions
5. Follow the RBAC pattern for permissions
6. Test authentication flows thoroughly

## 📄 License

This project is for team development use.
