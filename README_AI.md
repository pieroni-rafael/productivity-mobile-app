# AI Agent Instructions - Next.js ShadCN Boilerplate

## CRITICAL: Understanding Your Role

### You Are Working With a Template
- **YOU ALWAYS START** with a pre-built Next.js boilerplate/template
- **YOUR JOB** is to MODIFY and ENHANCE this template to meet the user's needs
- **NEVER** create a new project from scratch - the template is your starting point
- **TRANSFORM** the generic template into the specific app the user wants

### Production-Ready Mindset
When a user requests something like "Create a todo app" or "Build a task manager":
- **ASSUME** they want a PRODUCTION-READY application, not a toy example
- **THINK** like building for real users who will actually use this app
- **IMPLEMENT** professional features, not just basic CRUD operations
- **DESIGN** for scalability, user experience, and real-world usage

## MANDATORY: Planning Before Implementation

### When User Requests a New App (e.g., "Create a todo app"):

1. **IMMEDIATELY CREATE A PLAN** before any coding:
   ```markdown
   ## Implementation Plan for [App Name]
   
   ### Core Features (MVP - Phase 1):
   1. **Feature 1**: [Description with specific functionality]
   2. **Feature 2**: [Description with specific functionality]
   3. **Feature 3**: [Description with specific functionality]
   
   ### User Experience Enhancements:
   - [UX improvement 1]
   - [UX improvement 2]
   
   ### Technical Architecture:
   - Data models needed
   - Key components to create
   - State management approach
   
   ### Implementation Steps:
   1. Set up data models and BaaS integration
   2. Create core UI components
   3. Implement business logic
   4. Add user experience features
   5. Test and refine
   ```

2. **PRESENT THE PLAN** to the user for approval
3. **EXECUTE** the plan systematically
4. **UPDATE** PROJECT_AI.md with progress after each step

### Example: "Create a Todo App" Should Result In:

**BAD APPROACH** ❌:
- Simple list with add/delete
- Basic checkbox to mark complete
- No user considerations

**GOOD APPROACH** ✅:
- **Smart Features**: Due dates, priorities, categories/projects
- **User Experience**: Drag-and-drop reordering, keyboard shortcuts, quick add
- **Productivity Tools**: Recurring tasks, subtasks, progress tracking
- **Data Intelligence**: Search, filters, sorting, analytics dashboard
- **Professional Polish**: Smooth animations, loading states, error handling
- **Real-world Ready**: Data persistence, user preferences, export capabilities

## Project Structure Overview

This is a modern Next.js application template with TypeScript, Tailwind CSS, and ShadCN UI components. The project follows best practices for scalability and maintainability.

### Key Directories:
- `app/` - Next.js App Router pages and layouts (MODIFY existing routes, ADD new ones)
- `components/` - React components (CREATE your custom components here)
- `components/ui/` - ShadCN UI primitive components (USE these, don't recreate)
- `components/layout/` - Layout-specific components (CUSTOMIZE for your app)
- `lib/` - Utility functions and configurations (EXTEND with your logic)
- `public/` - Static assets

## Template Modification Strategy

### What to Keep:
- Authentication system (already integrated)
- Database setup (BaaS is pre-configured)
- UI component library (ShadCN)
- Dark mode support
- Responsive layout structure

### What to Modify:
- Route names and structure (rename /projects to /tasks, etc.)
- Page content and functionality
- Navigation items in sidebar/header
- Data models and schemas
- Business logic and workflows

### What to Add:
- App-specific features
- Custom components for your use case
- New API endpoints if needed
- Domain-specific functionality

## IMPORTANT RULES FOR AI MODIFICATIONS

### 1. Project Documentation Management (PROJECT_AI.md)

#### CRITICAL: Always Maintain PROJECT_AI.md
- **CREATE** a `PROJECT_AI.md` file at the root if it doesn't exist
- **UPDATE** it continuously as the project evolves
- **KEEP IT CONCISE** - Maximum 200 lines, summarize older information
- **REPLACE** outdated information instead of appending endlessly

#### Required Sections in PROJECT_AI.md:
```markdown
# Project Overview
Brief description of what the app does (2-3 lines)

## Target Audience
Who will use this application

## Core Features
- Feature 1: Brief description
- Feature 2: Brief description
(List only main features, max 10)

## Implementation Status
### Completed ✅
- Feature/component name: Brief note

### In Progress 🚧
- Feature/component name: Current status

### Planned 📋
- Feature/component name: Priority level

## Technical Decisions
- Key architecture choices
- Important libraries/APIs used
- Design patterns implemented

## User Preferences
- Specific requirements mentioned by user
- Style preferences
- Business logic rules
```

#### Update Rules:
- **AFTER EACH SESSION**: Update implementation status
- **WHEN USER CLARIFIES**: Update project overview or requirements
- **KEEP HISTORICAL INFO MINIMAL**: Focus on current state, not history
- **USE BULLET POINTS**: Avoid long paragraphs
- **REMOVE COMPLETED ITEMS**: After 2-3 sessions, archive completed features

### 2. Component Usage Hierarchy
- **ALWAYS** use existing ShadCN components from `components/ui/` when available
- **NEVER** recreate UI primitives that already exist (Button, Card, Input, etc.)
- Place new custom components in `components/` directory
- Complex layout components go in `components/layout/`

### 3. Styling Guidelines - CRITICAL COLOR SYSTEM

#### Color Usage (HIGHEST PRIORITY)
- **ALWAYS USE** semantic color variables from the system defined in `globals.css`
- **NEVER USE** direct Tailwind colors like `text-blue-500`, `bg-red-400`, etc.
- **APPROVED COLOR SYSTEM:**
  - `bg-background` / `text-foreground` - Main background and text colors
  - `bg-card` / `text-card-foreground` - For cards and containers
  - `bg-primary` / `text-primary-foreground` - Primary actions/highlights
  - `bg-secondary` / `text-secondary-foreground` - Secondary elements
  - `bg-muted` / `text-muted-foreground` - Subtle text and backgrounds
  - `bg-accent` / `text-accent-foreground` - Accent elements
  - `bg-destructive` / `text-destructive` - Dangerous actions/errors
  - `border-border` - All borders
  - `ring-ring` - Focus rings
  - `bg-popover` / `text-popover-foreground` - Popovers and dropdowns

#### Allowed Exceptions for Direct Colors
- **ONLY** use direct Tailwind colors in very specific cases:
  - Temporary status indicators (e.g., `text-green-500` for "online")
  - Charts and data visualizations
  - Decorative icons without semantic importance
- **ALWAYS** justify the use of direct colors with a code comment

#### Other Styling Guidelines
- **USE** Tailwind CSS classes for all styling
- **AVOID** inline styles or separate CSS files
- **MAINTAIN** dark mode support using `dark:` prefixes
- **USE** consistent spacing: `space-y-4`, `gap-4`, `p-4`, `p-6`, etc.
- **IMPLEMENT** all dark mode colors using variables - they change automatically

### 4. Routing Best Practices
- **USE** App Router conventions (folders with `page.tsx`)
- **IMPLEMENT** loading states with `loading.tsx` when needed
- **ADD** error boundaries with `error.tsx` for error handling
- **CREATE** layouts with `layout.tsx` for shared UI
- **ORGANIZE** related routes in route groups using `(groupname)` folders

### 5. State Management
- **PREFER** React Server Components when possible
- **USE** `'use client'` directive only when necessary (interactivity, hooks, browser APIs)
- **IMPLEMENT** forms using React Hook Form when complex validation is needed
- **USE** Zod for schema validation
- **AVOID** unnecessary client-side state

### 6. Authentication & Database (Integrated BaaS)

#### This boilerplate uses an integrated Backend-as-a-Service:
- **Authentication**: Built-in auth system (no configuration needed)
- **Database**: Automatic database provisioning per app
- **File Storage**: Integrated file storage
- **Real-time**: WebSocket support for live updates

#### Implementation Requirements:
- **USE** the provided BaaS client SDK (`lib/baas/client.ts`)
- **NEVER** try to connect directly to external databases
- **NEVER** implement your own auth (login/signup pages are pre-built)
- **ALL** backend operations go through the BaaS API
- **NO CONFIGURATION NEEDED** - everything is automatic

#### BaaS Client Files:
- `lib/baas/client.ts` - BaaS client SDK
- `lib/baas/auth-context.tsx` - Auth context provider
- `lib/baas/hooks.ts` - React hooks for data fetching
- `middleware.ts` - Auth middleware (pre-configured)

### 7. Data Fetching Patterns
- **USE** the BaaS client for ALL data operations
- **PREFER** Server Components with BaaS SDK when possible
- **USE** the provided hooks for real-time data in client components
- **IMPLEMENT** loading and error states properly
- **CACHE** data appropriately using Next.js caching strategies
- **HANDLE** errors gracefully with try-catch blocks

### 8. Code Quality Standards
- **MAINTAIN** TypeScript strict mode
- **DEFINE** proper types for all props and functions
- **AVOID** using `any` type
- **USE** descriptive variable and function names
- **FOLLOW** existing naming conventions (camelCase for variables, PascalCase for components)

### 9. File Organization
- **ONE** component per file
- **EXPORT** components as default exports from page files
- **EXPORT** utilities and hooks as named exports
- **GROUP** related functionality together

### 10. Performance Optimization
- **LAZY LOAD** heavy components using dynamic imports
- **OPTIMIZE** images using Next.js Image component
- **MINIMIZE** client-side JavaScript
- **USE** proper semantic HTML elements

### 11. Accessibility Requirements
- **ADD** proper ARIA labels where needed
- **ENSURE** keyboard navigation works
- **MAINTAIN** proper heading hierarchy
- **USE** semantic HTML elements
- **TEST** with screen readers in mind

### 12. Common Patterns to Follow

#### Creating a New Page:
```typescript
// app/your-route/page.tsx
export default function YourPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8 text-foreground">Page Title</h1>
      {/* Content */}
    </div>
  )
}
```

#### Creating a Form:
```typescript
'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function YourForm() {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="field">Field Label</Label>
        <Input id="field" type="text" placeholder="Enter value" />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  )
}
```

#### Using Cards for Content:
```typescript
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function YourCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Your content */}
      </CardContent>
    </Card>
  )
}
```

## Template Routes to Transform

The template includes 5 example routes that you should TRANSFORM for the user's app:

1. `/dashboard` - Transform into app-specific dashboard (e.g., task overview, analytics)
2. `/settings` - Keep but customize for app-specific preferences
3. `/projects` - Rename/repurpose for main functionality (e.g., /tasks, /documents)
4. `/users` - Adapt based on app needs (team members, collaborators, etc.)
5. `/billing` - Keep if app needs monetization, remove if not needed

**IMPORTANT**: Don't just add new routes - TRANSFORM existing ones to maintain consistency

## Common Modifications Scenarios

### Adding a New Feature
1. Determine if it needs a new route or fits within existing routes
2. Check for reusable components in `components/ui/`
3. Create new components in `components/` if needed
4. Follow the existing data flow patterns
5. **USE ONLY SYSTEM COLOR VARIABLES** - never `bg-blue-500` or similar
6. Maintain visual consistency with the rest of the app using semantic colors

### Modifying Existing Features
1. Understand the current implementation first
2. Maintain backward compatibility when possible
3. Update types if data structures change
4. Test all affected components
5. Keep the same visual consistency

### Integrating APIs
1. Create API routes in `app/api/` directory
2. Use proper HTTP methods and status codes
3. Implement error handling
4. Add loading states in UI components
5. Cache responses when appropriate

### Adding Authentication
1. Use Next-Auth or similar established solutions
2. Protect routes using middleware
3. Add user context providers
4. Update navigation to show auth state
5. Secure API endpoints

## Important Warnings

- **NEVER** commit sensitive information (API keys, passwords)
- **NEVER** remove TypeScript types to "fix" errors
- **NEVER** use deprecated Next.js features
- **NEVER** use direct Tailwind colors (`bg-blue-500`, `text-red-400`, etc.) - USE SYSTEM VARIABLES
- **AVOID** mixing styling approaches (stick to Tailwind with system colors)
- **AVOID** creating duplicate components
- **AVOID** deeply nested component structures

## Testing Checklist

Before considering any modification complete:
- [ ] All TypeScript errors are resolved
- [ ] The UI is responsive on mobile, tablet, and desktop
- [ ] Dark mode works correctly
- [ ] No console errors or warnings
- [ ] Forms have proper validation
- [ ] Loading states are implemented
- [ ] Error states are handled
- [ ] Accessibility standards are met

## Resource Limits

- Keep bundle size minimal
- Optimize images before adding them
- Limit the number of client components
- Use dynamic imports for large libraries
- Implement pagination for large data sets

## Final Notes

### When Users Request a New App:

1. **CREATE A PLAN FIRST** - Don't jump into coding
2. **THINK PRODUCTION** - This isn't a tutorial, it's a real app
3. **PROPOSE 2-3 CORE FEATURES** - Start focused but professional
4. **TRANSFORM THE TEMPLATE** - Don't add alongside, replace and modify
5. **USE EXISTING INFRASTRUCTURE** - Auth, DB, and UI are already there
6. **IMPLEMENT SYSTEMATICALLY** - Follow your plan step by step
7. **UPDATE PROJECT_AI.md** - Keep track of what you're building

### Quality Checklist for Any App:
- [ ] Has at least 2-3 meaningful features beyond basic CRUD
- [ ] Includes proper loading and error states
- [ ] Provides good UX with feedback messages
- [ ] Uses the existing auth system properly
- [ ] Leverages the BaaS for data persistence
- [ ] Maintains visual consistency with system colors
- [ ] Works well on mobile and desktop
- [ ] Feels like a real product, not a demo

### Example Transformations:
- **"Todo App"** → Professional task management system with projects, deadlines, and productivity analytics
- **"Note App"** → Knowledge management system with tags, search, markdown support, and organization
- **"Budget App"** → Financial tracking with categories, trends, budgets, and insights
- **"Recipe App"** → Culinary platform with meal planning, shopping lists, and nutritional data
- **"Habit Tracker"** → Personal development tool with streaks, statistics, and goal setting

### GOLDEN RULES

1. **PLANNING RULE**: Always create a comprehensive plan before coding when building a new app
2. **PRODUCTION RULE**: Build like it's going to production tomorrow with real users
3. **TRANSFORMATION RULE**: Modify the template, don't just add to it
4. **COLOR RULE**: Use system color variables, never direct Tailwind colors
5. **FEATURE RULE**: Implement meaningful features, not just basic functionality
6. **USER RULE**: Think about the actual end user, not just the technical requirements

Remember: You're not building a demo or tutorial - you're creating a real application that solves real problems for real users. The template is your canvas - transform it into something valuable.