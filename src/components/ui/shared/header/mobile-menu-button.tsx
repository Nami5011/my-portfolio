'use client';

import { useMenuStore } from '@/store/use-menu-store';
import { Menu, X } from 'lucide-react';
export default function MobileMenuButton() {
  const { isMenuOpen, setIsMenuOpen } = useMenuStore();

  return (
    <button
      type="button"
      className="md:hidden w-8 h-8 flex flex-col justify-center items-center gap-1.5 ml-auto cursor-pointer"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      aria-label="Toggle menu"
    >
      {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
    </button>
  );
}
