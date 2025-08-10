# API Routes

This folder contains the backend API routes for the Connect Pro application.

## Structure

```
api/
├── auth/           # Authentication endpoints
│   ├── login/      # POST /api/auth/login
│   ├── register/   # POST /api/auth/register
│   ├── refresh/    # POST /api/auth/refresh
│   └── me/         # GET /api/auth/me
├── user/           # User management endpoints
│   ├── profile/    # GET/PUT /api/user/profile
│   └── settings/   # GET/PUT /api/user/settings
└── team/           # Team management endpoints
    ├── create/     # POST /api/team/create
    ├── invite/     # POST /api/team/invite
    └── members/    # GET/POST/DELETE /api/team/members
```

## Implementation Notes

- Each folder should contain a `route.ts` file with the API handlers
- Use Next.js App Router API route conventions
- Implement proper error handling and validation
- Add authentication middleware for protected routes
- Follow RESTful API design principles

## Example Route Structure

```typescript
// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Implementation here
  return NextResponse.json({ message: 'Success' });
}
```

## Authentication Flow

1. User logs in via POST /api/auth/login
2. Server returns JWT tokens (access + refresh)
3. Client stores tokens securely
4. Protected routes verify JWT in middleware
5. Refresh tokens when needed via POST /api/auth/refresh
