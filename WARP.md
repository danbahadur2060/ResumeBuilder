# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Running the Application
```bash
# Development server (runs on http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint
```

### Testing Build
```bash
# Test build script (executes npm run build and reports success/failure)
node test-build.js
```

## Environment Setup

Copy `.env.example` to `.env` and configure:
- **MONGODB_URI**: MongoDB connection string (default: `mongodb://localhost:27017/aiResumebuilder`)
- **BETTER_AUTH_SECRET**: Secret key for Better Auth
- **GEMINI_API_KEY** and **GEMINI_BASI_URL**: AI/LLM configuration (supports Gemini or OpenAI-compatible endpoints)
- **IMAGEKIT_PUBLIC_KEY**, **IMAGEKIT_PRIVATE_KEY**, **IMAGEKIT_URL_ENDPOINT**: ImageKit for profile image uploads (optional)
- **GOOGLE_CLIENT_ID**, **GOOGLE_CLIENT_SECRET**: Google OAuth (optional)

## Architecture Overview

### Authentication & Authorization
- **Better Auth** (`better-auth`) handles authentication via email/password and Google OAuth
- Auth configuration: `app/lib/auth.ts` - lazily initializes MongoDB adapter
- Middleware: `middleware.ts` protects `/dashboard/*` and `/builder/*` routes using session cookies
- Unauthenticated users are redirected to `/login` with `?from=` parameter for post-login redirect

### Database Layer
- **MongoDB** + **Mongoose** for data persistence
- Connection: `configs/db.js` - cached connection pattern prevents re-initialization
- Models: `models/Resume.js` - Resume schema with personal info, experience, education, projects, skills
- Dual MongoDB setup: Better Auth uses native MongoDB client, Mongoose for application data

### API Routes (`app/api/*`)
All routes use `export const runtime = "nodejs"` and follow consistent patterns via `app/api/utils/apiHelpers.js` helpers:
- **Authentication**: Routes use `auth.api.getSession()` with Next.js headers
- **Resume CRUD**: 
  - POST `/api/resume` - Create new resume
  - GET `/api/getuserresume` - Fetch all user resumes
  - GET/PUT/DELETE `/api/resume/[id]` - Individual resume operations
  - GET `/api/resume/public/[resumeId]` - Public resume view
- **AI Enhancement**:
  - POST `/api/ai/enhance-job-desc` - Enhance job descriptions with AI
  - POST `/api/ai/enhance-pro-sum` - Enhance professional summaries
  - POST `/api/ai/upload-resume` - Parse uploaded resume PDF
- AI routes gracefully degrade when `AI_MODEL` env var is missing (return formatted input or mock responses)

### Frontend Structure
- **Next.js 15 App Router** with React 19
- Route organization:
  - `app/(auth)/*` - Login, signup, forgot password (route group, no layout nesting)
  - `app/(dashboard)/*` - Protected dashboard and builder routes
  - `app/builder/[resumeid]/*` - Resume editing interface
  - `app/view/[resumeid]/*` - Public resume view
- **Resume Builder** (`app/(dashboard)/builder/[resumeid]/page.jsx`):
  - Multi-step form with sections (Personal Info, Summary, Experience, Education, Projects, Skills)
  - Live preview with template selection (Classic, Modern, Minimal, MinimalImage)
  - Color picker for accent colors
  - Image upload via FormData with ImageKit integration
  - Print/download functionality using CSS print media queries
  - Share functionality with `navigator.share` API
  - Toggle public/private visibility
- Templates: `app/assets/templates/*.jsx` - Multiple resume layout options

### AI Integration
- **OpenAI SDK** configured in `configs/ai.js` to work with Gemini or OpenAI-compatible endpoints via `baseURL`
- Environment variable fallback chain: `OPENAI_API_KEY` → `AI_API_KEY` → `GEMINI_API_KEY`
- Mock AI client returns user input when no API key configured (dev-friendly)

### Image Handling
- **ImageKit** for profile picture uploads (optional feature)
- Next.js Image component configured for `ik.imagekit.io` and `lh3.googleusercontent.com` (Google OAuth avatars)
- Configuration: `next.config.mjs`

### Styling
- **Tailwind CSS v4** via PostCSS

## Code Patterns

### API Response Helpers
Use standardized response helpers from `app/api/utils/apiHelpers.js`:
- `successResponse(data, message, statusCode)` - Success responses
- `errorResponse(error, message, statusCode)` - Error handling
- `unauthorizedError(message)` - 401 responses
- `notFoundError(resource)` - 404 responses
- `withAuth(handler)` - HOC for protected routes

### Resume Data Updates
When updating resume data with file uploads:
1. Create FormData object
2. Append file as `image`
3. Serialize resume data (removing File objects) as `resumeData` JSON string
4. Append `removeBackground` flag if applicable
5. Send to PUT `/api/resume/[id]`

### Database Connection
Always call `await connectDB()` before Mongoose operations. Connection is cached globally and reused across requests.

### TypeScript Configuration
- Target: ES2017
- Strict mode: disabled
- Path alias: `@/*` maps to project root
- Allows JS files alongside TS/TSX

## Deployment
- Vercel-optimized (`vercel.json` sets 30s timeout for API routes)
- `serverExternalPackages: ['mongoose']` in Next.js config prevents Mongoose bundling issues
