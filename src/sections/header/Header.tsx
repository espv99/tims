'use client';

import { Navbar } from './Navbar';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 md:text-lg">
        <Navbar />
      </div>
    </header>
  );
}

export default Header;