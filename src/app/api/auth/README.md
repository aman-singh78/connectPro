# Authentication API Routes

This folder contains authentication-related API endpoints.

## Routes to Implement

### POST /api/auth/login
- **Purpose**: User login
- **Body**: `{ email: string, password: string }`
- **Response**: `{ user: User, token: string, refreshToken: string }`
- **File**: `login/route.ts`

### POST /api/auth/register  
- **Purpose**: User registration
- **Body**: `{ email: string, password: string, name: string, teamName?: string }`
- **Response**: `{ user: User, token: string, refreshToken: string }`
- **File**: `register/route.ts`

### POST /api/auth/refresh
- **Purpose**: Refresh access token
- **Body**: `{ refreshToken: string }`
- **Response**: `{ token: string, refreshToken: string }`
- **File**: `refresh/route.ts`

### GET /api/auth/me
- **Purpose**: Get current user profile
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ user: User, team?: Team }`
- **File**: `me/route.ts`

## Implementation Requirements

1. Use bcrypt for password hashing
2. Use JWT for token generation
3. Implement proper error handling
4. Validate input data
5. Return consistent response formats
6. Set secure HTTP-only cookies for tokens
