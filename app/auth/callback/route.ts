import { NextRequest, NextResponse } from 'next/server';
import { verifyCoreSSO } from '@/lib/sso';
import { getSession, setUserId } from '@/lib/session';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const redirectTo = searchParams.get('redirectTo') || '/';

    console.log('🔐 Auth callback received:', { 
      hasToken: !!token, 
      redirectTo,
      userAgent: request.headers.get('user-agent')?.substring(0, 50) 
    });

    // Validate token parameter
    if (!token) {
      console.error('❌ Auth callback missing token');
      return NextResponse.redirect(
        new URL(`/?error=missing_token`, request.url)
      );
    }

    // Verify the SSO token
    const verification = await verifyCoreSSO(token);
    
    if (!verification.isValid) {
      console.error('❌ SSO token verification failed:', verification.error);
      return NextResponse.redirect(
        new URL(`/?error=invalid_token&details=${encodeURIComponent(verification.error || 'Unknown error')}`, request.url)
      );
    }

    console.log('✅ SSO token verified for user:', verification.sub);

    // Get or create session
    const session = await getSession(request);
    
    // Set user ID in session
    await setUserId(session, verification.sub);
    
    console.log('✅ Session created for user:', verification.sub);

    // Redirect to the intended destination
    const redirectUrl = new URL(redirectTo, request.url);
    
    // Add success message
    redirectUrl.searchParams.set('message', 'login_success');
    
    console.log('🔄 Redirecting to:', redirectUrl.toString());
    
    return NextResponse.redirect(redirectUrl);

  } catch (error) {
    console.error('❌ Auth callback error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.redirect(
      new URL(`/?error=auth_failed&details=${encodeURIComponent(errorMessage)}`, request.url)
    );
  }
}
