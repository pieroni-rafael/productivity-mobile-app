# 🔥 Firebase Setup Guide

This project is pre-configured to use Firebase for authentication and database. Follow these steps to get started:

## Quick Start Checklist

- [ ] Create Firebase Project
- [ ] Get configuration keys
- [ ] Set up .env.local file
- [ ] Enable Authentication
- [ ] Create Firestore Database
- [ ] Set Security Rules
- [ ] Install dependencies
- [ ] Test the connection

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Create Project"**
3. Enter your project name
4. (Optional) Enable Google Analytics
5. Click **"Create Project"**

## Step 2: Get Your Configuration

### Client SDK Keys (for frontend)
1. In Firebase Console, click the **gear icon** > **Project Settings**
2. Scroll to **"Your apps"** section
3. Click **"Add app"** > **Web icon (</?>)**
4. Register your app with a nickname
5. Copy the configuration object

### Admin SDK Keys (for backend)
1. Go to **Project Settings** > **Service Accounts**
2. Click **"Generate new private key"**
3. Save the JSON file securely (⚠️ NEVER commit this to git!)

## Step 3: Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
```bash
cp .env.local.example .env.local
```

2. Fill in all the values from your Firebase configuration

## Step 4: Enable Authentication

1. Go to **Authentication** > **Sign-in method**
2. Enable **Email/Password** authentication
3. (Optional) Enable social providers:
   - Google
   - GitHub
   - Facebook
   - Twitter

## Step 5: Set Up Firestore Database

1. Go to **Firestore Database**
2. Click **"Create database"**
3. Choose **Production mode**
4. Select your preferred region
5. Go to the **Rules** tab
6. Copy rules from `lib/firebase/firestore-rules.txt`

## Step 6: Set Up Storage (Optional)

1. Go to **Storage**
2. Click **"Get started"**
3. Go to the **Rules** tab
4. Copy rules from `lib/firebase/storage-rules.txt`

## Step 7: Install Dependencies

```bash
npm install firebase firebase-admin
```

## Step 8: Test Your Setup

1. Start the development server:
```bash
npm run dev
```

2. Check the browser console for any Firebase errors
3. Try creating a test user account

## Common Issues & Solutions

### "Permission Denied" Error
- Check your Firestore/Storage security rules
- Ensure the user is properly authenticated

### "Invalid API Key" Error
- Double-check your `.env.local` file
- Make sure you're using NEXT_PUBLIC_ prefix for client-side keys

### "Firebase App not initialized"
- Ensure Firebase is initialized before using any services
- Check `lib/firebase/client.ts` is properly configured

## Important Security Notes

⚠️ **NEVER commit these files to git:**
- `.env.local`
- Service account JSON file
- Any file containing private keys

✅ **Safe to commit:**
- `.env.local.example` (with placeholder values)
- Security rules files
- Firebase configuration files (without actual keys)

## Next Steps

After setup, you can:
1. Wrap your app with `AuthProvider` from `lib/firebase/auth-context.tsx`
2. Use `useAuth()` hook in your components
3. Create protected routes using the middleware
4. Start building your app features!

## Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Auth with Next.js](https://firebase.google.com/docs/auth/web/start)
- [Firestore with Next.js](https://firebase.google.com/docs/firestore/quickstart)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)