# Development Instructions

## Current Status

✅ **Completed (Frontend Ready)**
- Complete folder structure for role-based access control
- Authentication context with mock data
- Login page with form validation
- Dashboard layout with sidebar and header
- Role-based navigation and permissions
- TypeScript types for all entities
- UI components using shadcn/ui
- Middleware structure (ready for backend)

❌ **Not Implemented (Backend Required)**
- API routes (placeholder folders exist)
- Database integration
- Real user authentication
- Password hashing and JWT verification
- User registration flow
- Team management backend

## Quick Start for Development

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Test login with mock credentials:**
   - Email: `admin@example.com`, Password: `password123` (Admin role)
   - Email: `user@example.com`, Password: `password123` (User role)  
   - Email: `manager@example.com`, Password: `password123` (Manager role)

3. **Access different areas:**
   - Dashboard: http://localhost:3000/dashboard
   - Login: http://localhost:3000/login
   - Admin (admin only): http://localhost:3000/admin

## Next Steps for Your Team

### 1. Set Up Database (Priority: HIGH)
Choose and configure your database:
- **PostgreSQL** (recommended for production)
- **MySQL** (good alternative)
- **MongoDB** (if you prefer NoSQL)
- **SQLite** (for development/testing)

Install your chosen database adapter:
```bash
# For PostgreSQL
npm install pg @types/pg

# For MySQL  
npm install mysql2 @types/mysql2

# For MongoDB
npm install mongodb @types/mongodb

# For Prisma ORM (recommended)
npm install prisma @prisma/client
npx prisma init
```

### 2. Implement API Routes (Priority: HIGH)
Start with authentication routes in order:

1. **`src/app/api/auth/me/route.ts`** - Get current user
2. **`src/app/api/auth/login/route.ts`** - User login  
3. **`src/app/api/auth/register/route.ts`** - User registration
4. **`src/app/api/auth/refresh/route.ts`** - Token refresh

Example implementation structure:
```typescript
// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/utils/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    // 1. Validate input
    // 2. Find user in database  
    // 3. Verify password
    // 4. Generate JWT tokens
    // 5. Return user data and tokens
    
    return NextResponse.json({ user, token, refreshToken });
  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 401 });
  }
}
```

### 3. Update AuthContext (Priority: HIGH)
Replace mock functions in `src/context/AuthContext.tsx`:

```typescript
// Replace mock login with real API call
const login = async (credentials: LoginCredentials) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  
  if (!response.ok) {
    throw new Error('Login failed');
  }
  
  const data = await response.json();
  // Handle success...
};
```

### 4. Environment Configuration (Priority: MEDIUM)
Create `.env.local`:
```env
# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_REFRESH_SECRET=your-refresh-secret-key-min-32-chars
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# Database
DATABASE_URL=your-database-connection-string

# Next.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
```

### 5. Additional Pages (Priority: MEDIUM)
Implement remaining pages:
- `src/app/register/page.tsx` - User registration
- `src/app/dashboard/team/page.tsx` - Team management
- `src/app/dashboard/users/page.tsx` - User management (admin)
- `src/app/admin/page.tsx` - Admin panel

### 6. Database Schema (Priority: MEDIUM)
Design your database schema based on the types in `src/types/auth.ts`:

```sql
-- Example PostgreSQL schema
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'USER',
  team_id UUID REFERENCES teams(id),
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  owner_id UUID REFERENCES users(id),
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  team_id UUID REFERENCES teams(id),
  role VARCHAR(50) NOT NULL DEFAULT 'MEMBER',
  permissions TEXT[] DEFAULT '{}',
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, team_id)
);
```

## File Structure Explanation

```
src/
├── app/                    # Next.js 13+ App Router
│   ├── api/               # API routes (backend endpoints)
│   ├── dashboard/         # Protected dashboard pages  
│   ├── login/             # Authentication pages
│   └── admin/             # Admin-only pages
├── components/            # Reusable UI components
│   ├── ui/               # Base components (buttons, inputs)
│   ├── auth/             # Auth-specific components
│   └── layout/           # Layout components (sidebar, header)
├── context/              # React Context providers
├── hooks/                # Custom React hooks
├── middleware/           # Custom middleware functions
├── types/               # TypeScript type definitions
└── utils/               # Utility functions (auth, RBAC)
```

## Available Mock Users

For testing different permission levels:

| Email | Password | Role | Access Level |
|-------|----------|------|-------------|
| admin@example.com | password123 | ADMIN | Full admin access |
| manager@example.com | password123 | MANAGER | Team management |
| user@example.com | password123 | USER | Basic user access |

## Common Issues & Solutions

### 1. Authentication Not Working
- Check if JWT_SECRET is set in environment variables
- Verify token is being stored correctly in localStorage
- Check browser console for authentication errors

### 2. Permission Errors
- Verify user role in the RBAC system
- Check if middleware is properly protecting routes
- Ensure permissions are correctly assigned in `src/utils/rbac.ts`

### 3. UI Components Missing
- Run `npx shadcn@latest add <component-name>` to add missing components
- Check if Tailwind CSS is properly configured

## Resources

- [Next.js App Router](https://nextjs.org/docs/app)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [JWT.io](https://jwt.io/) - JWT token debugging
- [Tailwind CSS](https://tailwindcss.com/docs)

## Questions?

Check the comprehensive documentation in `PROJECT_STRUCTURE.md` or refer to the README files in each API folder for specific implementation details.
