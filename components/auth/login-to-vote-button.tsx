'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogIn, Vote } from 'lucide-react';

interface LoginToVoteButtonProps {
  className?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children?: React.ReactNode;
}

export function LoginToVoteButton({ 
  className = '', 
  variant = 'default',
  size = 'default',
  children 
}: LoginToVoteButtonProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Get environment variables
  const coreAppUrl = process.env.NEXT_PUBLIC_MAIN_APP_URL || 'https://sacavia.com';
  const contestAppUrl = process.env.NEXT_PUBLIC_CONTEST_APP_URL || 'https://vote.sacavia.com';

  const handleLoginClick = () => {
    // Construct the return URL for after login
    const returnTo = `${contestAppUrl}${pathname}`;
    
    // Redirect to core app login with return URL
    const loginUrl = `${coreAppUrl}/login?returnTo=${encodeURIComponent(returnTo)}`;
    
    console.log('🔐 Redirecting to login:', loginUrl);
    
    // Open in new tab or redirect
    if (!window.open(loginUrl, '_blank')) {
      window.location.href = loginUrl;
    }
  };

  return (
    <Button
      onClick={handleLoginClick}
      variant={variant}
      size={size}
      className={`gap-2 ${className}`}
    >
      <LogIn className="w-4 h-4" />
      {children || 'Login to Vote'}
    </Button>
  );
}

// Alternative button with vote icon
export function VoteLoginButton({ 
  className = '', 
  variant = 'default',
  size = 'default',
  children 
}: LoginToVoteButtonProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Get environment variables
  const coreAppUrl = process.env.NEXT_PUBLIC_MAIN_APP_URL || 'https://sacavia.com';
  const contestAppUrl = process.env.NEXT_PUBLIC_CONTEST_APP_URL || 'https://vote.sacavia.com';

  const handleLoginClick = () => {
    // Construct the return URL for after login
    const returnTo = `${contestAppUrl}${pathname}`;
    
    // Redirect to core app login with return URL
    const loginUrl = `${coreAppUrl}/login?returnTo=${encodeURIComponent(returnTo)}`;
    
    console.log('🔐 Redirecting to login:', loginUrl);
    
    // Open in new tab or redirect
    if (!window.open(loginUrl, '_blank')) {
      window.location.href = loginUrl;
    }
  };

  return (
    <Button
      onClick={handleLoginClick}
      variant={variant}
      size={size}
      className={`gap-2 ${className}`}
    >
      <Vote className="w-4 h-4" />
      {children || 'Login to Vote'}
    </Button>
  );
}

// Simple text link version
export function LoginToVoteLink({ 
  className = '', 
  children 
}: { className?: string; children?: React.ReactNode }) {
  const pathname = usePathname();

  // Get environment variables
  const coreAppUrl = process.env.NEXT_PUBLIC_MAIN_APP_URL || 'https://sacavia.com';
  const contestAppUrl = process.env.NEXT_PUBLIC_CONTEST_APP_URL || 'https://vote.sacavia.com';

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Construct the return URL for after login
    const returnTo = `${contestAppUrl}${pathname}`;
    
    // Redirect to core app login with return URL
    const loginUrl = `${coreAppUrl}/login?returnTo=${encodeURIComponent(returnTo)}`;
    
    console.log('🔐 Redirecting to login:', loginUrl);
    
    // Open in new tab or redirect
    if (!window.open(loginUrl, '_blank')) {
      window.location.href = loginUrl;
    }
  };

  return (
    <button
      onClick={handleLoginClick}
      className={`text-frontend-primary hover:text-frontend-primary/80 underline underline-offset-2 ${className}`}
    >
      {children || 'Login to Vote'}
    </button>
  );
}
