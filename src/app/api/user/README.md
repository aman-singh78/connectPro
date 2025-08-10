# User Management API Routes

This folder contains user-related API endpoints.

## Routes to Implement

### GET /api/user/profile
- **Purpose**: Get user profile
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ user: User }`
- **File**: `profile/route.ts`

### PUT /api/user/profile
- **Purpose**: Update user profile
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ name?: string, avatar?: string, email?: string }`
- **Response**: `{ user: User }`
- **File**: `profile/route.ts`

### GET /api/user/settings
- **Purpose**: Get user settings
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ settings: UserSettings }`
- **File**: `settings/route.ts`

### PUT /api/user/settings
- **Purpose**: Update user settings
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ settings: Partial<UserSettings> }`
- **Response**: `{ settings: UserSettings }`
- **File**: `settings/route.ts`

## Implementation Requirements

1. Require authentication for all routes
2. Validate user permissions
3. Sanitize and validate input data
4. Handle profile image uploads if needed
5. Implement proper error handling
