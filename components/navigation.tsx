'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Trophy, MapPin, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navigation() {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/',
      label: 'Home',
      icon: Trophy,
    },
    {
      href: '/leaderboard',
      label: 'Leaderboard',
      icon: Award,
    },
    {
      href: '/how-to-enter',
      label: 'How to Enter',
      icon: MapPin,
    },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Trophy className="w-8 h-8 text-frontend-primary" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Hidden Gems Contest
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-frontend-primary text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:text-frontend-primary hover:bg-frontend-primary/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <Link
              href="https://sacavia.com/add-location"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-frontend-primary hover:bg-frontend-primary/90 text-white">
                <MapPin className="w-4 h-4 mr-2" />
                Enter Contest
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-frontend-primary text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:text-frontend-primary hover:bg-frontend-primary/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            
            {/* Mobile CTA */}
            <Link
              href="https://sacavia.com/add-location"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-frontend-primary text-white hover:bg-frontend-primary/90 transition-colors duration-200"
            >
              <MapPin className="w-5 h-5" />
              <span>Enter Contest</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
