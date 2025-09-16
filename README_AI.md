# AI Agent Instructions - Next.js ShadCN Boilerplate

## Project Structure Overview

This is a modern Next.js application template with TypeScript, Tailwind CSS, and ShadCN UI components. The project follows best practices for scalability and maintainability.

### Key Directories:
- `app/` - Next.js App Router pages and layouts
- `components/` - React components (custom components here)
- `components/ui/` - ShadCN UI primitive components (avoid editing these)
- `components/layout/` - Layout-specific components (header, sidebar, etc.)
- `lib/` - Utility functions and configurations
- `public/` - Static assets

## IMPORTANT RULES FOR AI MODIFICATIONS

### 1. Component Usage Hierarchy
- **ALWAYS** use existing ShadCN components from `components/ui/` when available
- **NEVER** recreate UI primitives that already exist (Button, Card, Input, etc.)
- Place new custom components in `components/` directory
- Complex layout components go in `components/layout/`

### 2. Styling Guidelines
- **USE** Tailwind CSS classes for all styling
- **AVOID** inline styles or separate CSS files
- **FOLLOW** the existing color scheme using CSS variables defined in `globals.css`
- **MAINTAIN** dark mode support using `dark:` prefixes
- **USE** consistent spacing: `space-y-4`, `gap-4`, `p-4`, `p-6`, etc.

### 3. Routing Best Practices
- **USE** App Router conventions (folders with `page.tsx`)
- **IMPLEMENT** loading states with `loading.tsx` when needed
- **ADD** error boundaries with `error.tsx` for error handling
- **CREATE** layouts with `layout.tsx` for shared UI
- **ORGANIZE** related routes in route groups using `(groupname)` folders

### 4. State Management
- **PREFER** React Server Components when possible
- **USE** `'use client'` directive only when necessary (interactivity, hooks, browser APIs)
- **IMPLEMENT** forms using React Hook Form when complex validation is needed
- **USE** Zod for schema validation
- **AVOID** unnecessary client-side state

### 5. Data Fetching Patterns
- **USE** Server Components for data fetching when possible
- **IMPLEMENT** loading and error states properly
- **CACHE** data appropriately using Next.js caching strategies
- **HANDLE** errors gracefully with try-catch blocks

### 6. Code Quality Standards
- **MAINTAIN** TypeScript strict mode
- **DEFINE** proper types for all props and functions
- **AVOID** using `any` type
- **USE** descriptive variable and function names
- **FOLLOW** existing naming conventions (camelCase for variables, PascalCase for components)

### 7. File Organization
- **ONE** component per file
- **EXPORT** components as default exports from page files
- **EXPORT** utilities and hooks as named exports
- **GROUP** related functionality together

### 8. Performance Optimization
- **LAZY LOAD** heavy components using dynamic imports
- **OPTIMIZE** images using Next.js Image component
- **MINIMIZE** client-side JavaScript
- **USE** proper semantic HTML elements

### 9. Accessibility Requirements
- **ADD** proper ARIA labels where needed
- **ENSURE** keyboard navigation works
- **MAINTAIN** proper heading hierarchy
- **USE** semantic HTML elements
- **TEST** with screen readers in mind

### 10. Common Patterns to Follow

#### Creating a New Page:
```typescript
// app/your-route/page.tsx
export default function YourPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Page Title</h1>
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

## Available Example Routes

The template includes 5 example routes to demonstrate different patterns:

1. `/dashboard` - Main dashboard with metrics and charts
2. `/settings` - User settings and preferences
3. `/projects` - Project management interface
4. `/users` - User management system
5. `/billing` - Billing and subscription management

## Common Modifications Scenarios

### Adding a New Feature
1. Determine if it needs a new route or fits within existing routes
2. Check for reusable components in `components/ui/`
3. Create new components in `components/` if needed
4. Follow the existing data flow patterns
5. Maintain consistent styling with the rest of the app

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
- **AVOID** mixing styling approaches (stick to Tailwind)
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

This boilerplate is designed to be a starting point. When users request modifications:

1. **UNDERSTAND** the full requirement before making changes
2. **ASK** for clarification if the request is ambiguous
3. **SUGGEST** best practices if the request could be improved
4. **IMPLEMENT** changes incrementally, testing along the way
5. **DOCUMENT** any complex logic or non-obvious implementations

Remember: The goal is to maintain a clean, scalable, and maintainable codebase while implementing the user's requirements efficiently.