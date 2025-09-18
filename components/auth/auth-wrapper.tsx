'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';

interface AuthWrapperProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  fallback?: React.ReactNode;
}

export function AuthWrapper({ 
  children, 
  requireAuth = true, 
  fallback = null 
}: AuthWrapperProps) {
  const { isAuthenticated, isLoading, user } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If authentication is required and user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Authentication Required
            </h1>
            <p className="text-gray-600">
              You need to be logged in to access the contest features.
            </p>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Redirecting you to the login page...
            </p>
            <div className="animate-pulse">
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-primary rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show fallback if provided and user is not authenticated
  if (!requireAuth && !isAuthenticated && fallback) {
    return <>{fallback}</>;
  }

  // Render children if authenticated or if auth is not required
  return <>{children}</>;
}

// Hook for components that need authentication
export function useRequireAuth() {
  const { isAuthenticated, isLoading, user } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      console.log('🔐 Authentication required - redirecting to login...');
    }
  }, [isAuthenticated, isLoading]);

  return {
    isAuthenticated,
    isLoading,
    user,
    requireAuth: () => {
      if (!isAuthenticated && !isLoading) {
        // The useAuth hook will handle the redirect automatically
        return false;
      }
      return true;
    }
  };
}
