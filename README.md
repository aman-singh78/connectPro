# Connect Pro - Frontend Only

A simplified Next.js frontend application with role-based access control demo.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🔐 Demo Login Credentials

| Email | Password | Role | Access |
|-------|----------|------|---------|
| admin@example.com | password123 | ADMIN | Full access + Admin panel |
| manager@example.com | password123 | MANAGER | Team management + Analytics |
| user@example.com | password123 | USER | Basic dashboard access |

## 📁 Project Structure

```
src/
├── app/                    # Next.js pages
│   ├── dashboard/         # Protected dashboard
│   ├── login/             # Login page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── ui/               # Base UI components
│   └── layout/           # Layout components
└── context/              # React context
    └── AuthContext.tsx   # Authentication state
```

## ✨ Features

- ✅ Role-based navigation (Admin/Manager/User)
- ✅ Mock authentication with demo users
- ✅ Responsive dashboard layout
- ✅ Protected routes
- ✅ Modern UI with Tailwind CSS
- ✅ TypeScript support
- ✅ Clean RAFCE component structure

## 🎨 UI Components

Built with:
- **Tailwind CSS** for styling
- **shadcn/ui** for base components
- **Lucide React** for icons
- **Next.js 15** with App Router

## 📱 Pages

1. **Landing Page** (`/`) - Welcome page with login button
2. **Login Page** (`/login`) - Authentication form
3. **Dashboard** (`/dashboard`) - Main dashboard with stats
4. **Protected Routes** - Role-based access control

## 🛠️ Development Notes

- All components use React Arrow Function Component Export (RAFCE)
- Frontend-only with mock authentication
- No backend dependencies
- Ready for team collaboration
- Easy to extend with real API integration

## 🔄 Next Steps

To add backend functionality:
1. Set up API routes in `src/app/api/`
2. Replace mock authentication with real JWT tokens
3. Add database integration
4. Implement user registration
5. Add real team management features

## 📋 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🌟 Demo Features

- **Role-based UI** - Different users see different navigation options
- **Mock Data** - Realistic demo data for development
- **Responsive Design** - Works on desktop and mobile
- **Loading States** - Proper loading indicators
- **Error Handling** - User-friendly error messages
