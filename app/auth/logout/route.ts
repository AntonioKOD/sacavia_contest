import { NextRequest, NextResponse } from 'next/server';
import { getSession, clearSession } from '@/lib/session';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const redirectTo = searchParams.get('redirectTo') || '/';

    console.log('🚪 Logout requested');

    // Get current session
    const session = await getSession(request);
    
    // Clear the session
    await clearSession(session);
    
    console.log('✅ Session cleared');

    // Redirect to the specified destination
    const redirectUrl = new URL(redirectTo, request.url);
    redirectUrl.searchParams.set('message', 'logout_success');
    
    return NextResponse.redirect(redirectUrl);

  } catch (error) {
    console.error('❌ Logout error:', error);
    
    // Even if there's an error, try to redirect
    return NextResponse.redirect(
      new URL(`/?error=logout_failed`, request.url)
    );
  }
}

// Also support GET for convenience
export async function GET(request: NextRequest) {
  return POST(request);
}
