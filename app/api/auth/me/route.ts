import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Get current session
    const session = await getSession(request);
    
    console.log('🔍 Auth check:', { 
      isLoggedIn: session.isLoggedIn, 
      userId: session.userId,
      userAgent: request.headers.get('user-agent')?.substring(0, 50) 
    });

    if (!session.isLoggedIn || !session.userId) {
      return NextResponse.json(
        { 
          isAuthenticated: false, 
          user: null,
          message: 'Not authenticated' 
        },
        { status: 401 }
      );
    }

    // Return user information
    return NextResponse.json({
      isAuthenticated: true,
      user: {
        id: session.userId,
        // Add other user properties as needed
      },
      session: {
        createdAt: session.createdAt,
        isLoggedIn: session.isLoggedIn,
      }
    });

  } catch (error) {
    console.error('❌ Auth check error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      { 
        isAuthenticated: false, 
        user: null,
        error: 'Authentication check failed',
        details: errorMessage 
      },
      { status: 500 }
    );
  }
}
