import { getIronSession } from 'iron-session';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

// Session data interface
export interface SessionData {
  userId?: string;
  isLoggedIn: boolean;
  createdAt?: number;
}

// Iron session options
export const ironOptions = {
  cookieName: 'contest_sess',
  password: process.env.SESSION_PASSWORD || 'complex_password_at_least_32_characters_long',
  ttl: 7 * 24 * 60 * 60, // 7 days in seconds
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    httpOnly: true,
  },
};

// Check for main app JWT token
export async function checkMainAppJWT(req?: NextRequest): Promise<string | null> {
  if (!req) return null;
  
  try {
    // Check for payload-token cookie from main app
    const payloadToken = req.cookies.get('payload-token')?.value;
    
    if (payloadToken) {
      // Verify the JWT token
      const secret = process.env.PAYLOAD_SECRET || 'your-secret-here';
      const decoded = jwt.verify(payloadToken, secret) as any;
      
      if (decoded && decoded.id) {
        console.log('✅ Main app JWT token found:', decoded.id);
        return decoded.id;
      }
    }
  } catch (error) {
    console.log('❌ Main app JWT token verification failed:', error);
  }
  
  return null;
}

// Get session from request/response
export async function getSession(req?: NextRequest, res?: NextResponse): Promise<SessionData> {
  const cookieStore = await cookies();
  
  const session = await getIronSession<SessionData>(cookieStore, ironOptions);
  
  // Check for main app JWT token first
  if (req) {
    const mainAppUserId = await checkMainAppJWT(req);
    if (mainAppUserId) {
      session.userId = mainAppUserId;
      session.isLoggedIn = true;
      session.createdAt = Date.now();
      return session;
    }
  }
  
  // Initialize session if it doesn't exist
  if (!session.isLoggedIn) {
    session.isLoggedIn = false;
    session.createdAt = Date.now();
  }
  
  return session;
}

// Set user ID in session
export async function setUserId(session: SessionData, userId: string): Promise<void> {
  session.userId = userId;
  session.isLoggedIn = true;
  session.createdAt = Date.now();
}

// Clear user session
export async function clearSession(session: SessionData): Promise<void> {
  session.userId = undefined;
  session.isLoggedIn = false;
  session.createdAt = undefined;
}

// Require user authentication (throws error if not logged in)
export async function requireUser(req?: NextRequest, res?: NextResponse): Promise<{ userId: string; session: SessionData }> {
  const session = await getSession(req, res);
  
  if (!session.isLoggedIn || !session.userId) {
    throw new Error('Authentication required');
  }
  
  return { userId: session.userId, session };
}

// Check if user is authenticated
export async function isAuthenticated(req?: NextRequest, res?: NextResponse): Promise<boolean> {
  const session = await getSession(req, res);
  return session.isLoggedIn && !!session.userId;
}

// Get current user ID if authenticated
export async function getCurrentUserId(req?: NextRequest, res?: NextResponse): Promise<string | null> {
  const session = await getSession(req, res);
  return session.isLoggedIn ? session.userId || null : null;
}

// Save session changes
export async function saveSession(session: SessionData): Promise<void> {
  const cookieStore = await cookies();
  await getIronSession<SessionData>(cookieStore, ironOptions);
  // The session is automatically saved when modified
}

// Note: createSealedSession and unsealSession removed as they're not needed
// for the current implementation
