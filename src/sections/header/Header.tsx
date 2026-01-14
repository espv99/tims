'use client';

import { Navbar } from './Navbar';

export function Header() {
  return (
    <header className="relative w-full m-auto p-4 z-10 md:text-xl">
      <Navbar/>
    </header>
  );
}


export default Header;