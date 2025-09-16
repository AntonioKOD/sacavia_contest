'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Trophy, MapPin, Award } from 'lucide-react';
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarButton,
} from '@/components/ui/resizable-navbar';

export function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      name: 'Home',
      link: '/',
    },
    {
      name: 'Entries',
      link: '/leaderboard',
    },
    {
      name: 'Enter',
      link: '/how-to-enter',
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody>
        {/* Logo */}
        <Link href="/" className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black dark:text-white">
          <img src="/logo.svg" alt="Sacavia" className="w-10 h-10" />
        </Link>

        {/* Navigation Items */}
        <NavItems items={navItems} />

        {/* CTA Button */}
        <NavbarButton
          href="https://sacavia.com/add-location"
          variant="primary"
          className="bg-[#FF6B6B] hover:bg-[#e55a5a] text-white shadow-lg border-2 border-[#FF6B6B] hover:border-[#e55a5a] transition-all duration-200"
        >
          Enter Contest
        </NavbarButton>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          {/* Mobile Logo */}
          <Link href="/" className="flex items-center space-x-2 px-2 py-1 text-sm font-bold text-black dark:text-white">
            <img src="/logo.svg" alt="Sacavia" className="w-6 h-6" />
            <span>Hidden Gems Contest</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <MobileNavToggle isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />
        </MobileNavHeader>

        {/* Mobile Menu */}
        <MobileNavMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu}>
          {navItems.map((item) => {
            const isActive = pathname === item.link;
            
            return (
              <Link
                key={item.link}
                href={item.link}
                onClick={closeMobileMenu}
                className={`w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-frontend-primary text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:text-frontend-primary hover:bg-frontend-primary/10'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          
          {/* Mobile CTA */}
          <Link
            href="https://sacavia.com/add-location"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobileMenu}
            className="w-full px-4 py-3 rounded-lg bg-frontend-primary text-white hover:bg-frontend-primary/90 transition-colors duration-200 text-center font-semibold"
          >
            <MapPin className="w-4 h-4 mr-2 inline" />
            Enter Contest
          </Link>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
