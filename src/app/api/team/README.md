# Team Management API Routes

This folder contains team-related API endpoints.

## Routes to Implement

### POST /api/team/create
- **Purpose**: Create a new team
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ name: string, description?: string, settings?: TeamSettings }`
- **Response**: `{ team: Team }`
- **File**: `create/route.ts`

### POST /api/team/invite
- **Purpose**: Invite user to team
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ email: string, role: TeamRole }`
- **Response**: `{ invitation: Invitation }`
- **File**: `invite/route.ts`

### GET /api/team/members
- **Purpose**: Get team members
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ members: TeamMember[] }`
- **File**: `members/route.ts`

### POST /api/team/members
- **Purpose**: Add member to team
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ userId: string, role: TeamRole }`
- **Response**: `{ member: TeamMember }`
- **File**: `members/route.ts`

### DELETE /api/team/members/[userId]
- **Purpose**: Remove member from team
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ success: boolean }`
- **File**: `members/[userId]/route.ts`

## Implementation Requirements

1. Implement role-based access control
2. Check team permissions before actions
3. Validate team member limits
4. Handle team invitation workflows
5. Implement proper error handling
6. Log team activity for audit trails
