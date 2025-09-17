# 🚀 BaaS Integration Guide

This boilerplate comes with a fully integrated Backend-as-a-Service (BaaS) that requires **zero configuration**.

## What's Included

✅ **Authentication** - Login, signup, password reset, social auth  
✅ **Database** - Automatic per-app database provisioning  
✅ **File Storage** - Integrated file uploads  
✅ **Real-time** - WebSocket support for live data  
✅ **Auto-scaling** - Scales with your usage automatically  

## Quick Start

### For Local Development

1. The app works out of the box with mock data
2. Just run `npm run dev` and start building
3. Auth pages are at `/login` and `/signup`
4. All BaaS operations return mock data in development

### For Production

When you deploy through the AI App Builder platform:

1. **Automatic Setup** - Everything is configured automatically
2. **No API Keys** - No need to manage credentials
3. **Instant Database** - Your database is created instantly
4. **Auth Ready** - Authentication works immediately

## Using the BaaS SDK

### Authentication

```typescript
import { useAuth } from '@/lib/baas/auth-context'

function MyComponent() {
  const { user, signIn, signOut } = useAuth()
  
  // Check if user is logged in
  if (!user) {
    return <div>Please log in</div>
  }
  
  return <div>Welcome, {user.email}!</div>
}
```

### Database Operations

```typescript
import { baas } from '@/lib/baas/client'

// Get a single record
const user = await baas.collection('users').get('user_id')

// List records
const todos = await baas.collection('todos').list()

// Create a record
const newTodo = await baas.collection('todos').create({
  title: 'My Todo',
  completed: false
})

// Update a record
await baas.collection('todos').update('todo_id', {
  completed: true
})

// Delete a record
await baas.collection('todos').delete('todo_id')
```

### Using React Hooks

```typescript
import { useQuery, useMutation } from '@/lib/baas/hooks'

function TodoList() {
  // Fetch data
  const { data: todos, loading } = useQuery('todos')
  
  // Mutations
  const { create, update, remove } = useMutation('todos')
  
  if (loading) return <div>Loading...</div>
  
  return (
    <div>
      {todos?.map(todo => (
        <div key={todo.id}>
          {todo.title}
          <button onClick={() => remove(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}
```

### File Storage

```typescript
import { useStorage } from '@/lib/baas/hooks'

function FileUpload() {
  const { upload, uploading } = useStorage()
  
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    const url = await upload(file, `avatars/${user.id}`)
    console.log('File uploaded to:', url)
  }
  
  return (
    <input 
      type="file" 
      onChange={handleUpload}
      disabled={uploading}
    />
  )
}
```

### Real-time Subscriptions

```typescript
import { useSubscription } from '@/lib/baas/hooks'

function LiveChat() {
  // Subscribe to real-time updates
  const messages = useSubscription('messages', (newMessage) => {
    console.log('New message:', newMessage)
  })
  
  return <div>{/* Display messages */}</div>
}
```

## Database Schema

The BaaS automatically creates tables based on your usage. Common patterns:

```sql
-- Users table (created automatically)
users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE,
  name TEXT,
  avatar TEXT,
  created_at TIMESTAMP
)

-- Your custom tables (created on first use)
todos (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  title TEXT,
  completed BOOLEAN,
  created_at TIMESTAMP
)
```

## Security

- **Isolated Databases** - Each app has its own isolated database
- **Automatic Auth** - All requests are authenticated automatically
- **Row-level Security** - Users can only access their own data
- **Encrypted** - All data is encrypted in transit and at rest

## Limits (Free Plan)

- 10,000 database rows
- 1GB file storage  
- 100,000 API calls/month
- 1,000 concurrent users

## Need Help?

- The BaaS SDK is in `/lib/baas/`
- Mock data works in development
- Everything is configured automatically in production
- No setup required!

## FAQ

**Q: Do I need to set up a database?**  
A: No, it's created automatically when you deploy.

**Q: How do I configure authentication?**  
A: It's already configured. Just use the auth pages at `/login` and `/signup`.

**Q: Can I use my own database?**  
A: The platform is designed to work with the integrated BaaS for simplicity.

**Q: How do I handle migrations?**  
A: Tables are created automatically when you first use them.

**Q: Is it secure?**  
A: Yes, each app is isolated with its own database and authentication.