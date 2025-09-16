import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import { getStorage } from 'firebase-admin/storage'

// TODO: Set up Firebase Admin SDK
// 1. Go to Firebase Console > Project Settings > Service Accounts
// 2. Click "Generate new private key"
// 3. Save the JSON file securely (NEVER commit to git)
// 4. Add the service account credentials to your environment variables

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID || "TODO_ADD_YOUR_PROJECT_ID",
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL || "TODO_ADD_YOUR_CLIENT_EMAIL",
  privateKey: (process.env.FIREBASE_PRIVATE_KEY || "TODO_ADD_YOUR_PRIVATE_KEY").replace(/\\n/g, '\n'),
}

// TODO: Add these to your .env.local file (NEVER commit this file):
// FIREBASE_PROJECT_ID=your_project_id
// FIREBASE_CLIENT_EMAIL=your_service_account_email
// FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

// Initialize Firebase Admin
if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
    storageBucket: `${serviceAccount.projectId}.appspot.com`,
  })
}

// Export admin services
export const adminAuth = getAuth()
export const adminDb = getFirestore()
export const adminStorage = getStorage()

// Helper functions for common operations
export async function verifyIdToken(token: string) {
  try {
    const decodedToken = await adminAuth.verifyIdToken(token)
    return decodedToken
  } catch (error) {
    console.error('Error verifying token:', error)
    return null
  }
}

export async function setCustomUserClaims(uid: string, claims: Record<string, any>) {
  try {
    await adminAuth.setCustomUserClaims(uid, claims)
    return true
  } catch (error) {
    console.error('Error setting custom claims:', error)
    return false
  }
}

export async function createUser(email: string, password: string, displayName?: string) {
  try {
    const userRecord = await adminAuth.createUser({
      email,
      password,
      displayName,
      emailVerified: false,
    })
    return userRecord
  } catch (error) {
    console.error('Error creating user:', error)
    return null
  }
}

// TODO: Implement server-side API routes that use this admin SDK
// Example: app/api/auth/verify/route.ts for token verification
// Example: app/api/users/create/route.ts for creating users with custom claims