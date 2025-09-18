'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface User {
  id: string;
  // Add other user properties as needed
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  const router = useRouter();
  const pathname = usePathname();

  // Login function
  const login = useCallback((redirectTo?: string) => {
    const coreAppUrl = process.env.NEXT_PUBLIC_MAIN_APP_URL || 'https://sacavia.com';
    const contestAppUrl = process.env.NEXT_PUBLIC_CONTEST_APP_URL || 'https://vote.sacavia.com';
    
    // Construct the return URL for after login
    const returnTo = redirectTo || `${contestAppUrl}${pathname}`;
    
    // Redirect to core app login with return URL
    const loginUrl = `${coreAppUrl}/login?returnTo=${encodeURIComponent(returnTo)}`;
    
    console.log('🔐 Redirecting to login:', loginUrl);
    console.log('🔐 Return URL after login:', returnTo);
    
    // Redirect to main app login page
    window.location.href = loginUrl;
  }, [pathname]);

  // Check authentication status
  const checkAuth = useCallback(async (autoRedirect = true) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // Make a request to check if user is authenticated
      const response = await fetch('/api/auth/me', {
        credentials: 'include', // Include cookies
      });

      if (response.ok) {
        const userData = await response.json();
        if (userData.isAuthenticated) {
          setAuthState({
            user: userData.user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } else {
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
          // Auto-redirect to login if not authenticated
          if (autoRedirect) {
            console.log('🔐 User not authenticated, redirecting to login...');
            login();
          }
        }
      } else {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
        // Auto-redirect to login if not authenticated
        if (autoRedirect) {
          console.log('🔐 User not authenticated, redirecting to login...');
          login();
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: 'Authentication check failed',
      });
      // Auto-redirect to login on error
      if (autoRedirect) {
        console.log('🔐 Auth check failed, redirecting to login...');
        login();
      }
    }
  }, [login]);

  // Logout function
  const logout = useCallback(async (redirectTo?: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      // Call logout API
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      // Clear local state
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });

      // Redirect if specified
      if (redirectTo) {
        router.push(redirectTo);
      }
    } catch (error) {
      console.error('Logout failed:', error);
      setAuthState(prev => ({ ...prev, error: 'Logout failed', isLoading: false }));
    }
  }, [router]);

  // Require authentication (redirect to login if not authenticated)
  const requireAuth = useCallback((redirectTo?: string) => {
    if (!authState.isAuthenticated && !authState.isLoading) {
      login(redirectTo);
      return false;
    }
    return true;
  }, [authState.isAuthenticated, authState.isLoading, login]);

  // Check auth on mount and when pathname changes
  useEffect(() => {
    checkAuth();
  }, [checkAuth, pathname]);

  return {
    ...authState,
    login,
    logout,
    requireAuth,
    checkAuth,
  };
}

// Hook for protecting routes
export function useRequireAuth(redirectTo?: string) {
  const { isAuthenticated, isLoading, requireAuth } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      requireAuth(redirectTo);
    }
  }, [isAuthenticated, isLoading, requireAuth, redirectTo]);

  return { isAuthenticated, isLoading };
}
