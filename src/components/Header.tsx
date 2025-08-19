'use client';

import { useState } from 'react';
import Link from 'next/link';

const navItems = [
  { name: 'Inicio', href: '/' },
  { name: 'Acerca de', href: '/about' },
  { name: 'Servicios', href: '/services' },
  { name: 'Contacto', href: '/contact' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-acent text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        {/* Logo/Nombre del sitio */}
        <Link href="/" className="text-2xl font-bold">
          Mi Sitio
        </Link>

        {/* Menú de navegación para desktop */}
        <div className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="hover:text-gray-400 transition-colors duration-200"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Botón de menú para móvil */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          )}
        </button>
      </nav>

      {/* Menú desplegable para móvil */}
      <div
        className={`md:hidden ${
          isMenuOpen ? 'block' : 'hidden'
        } mt-4 space-y-2`}
      >
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="block text-center py-2 hover:bg-gray-700 transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </header>
  );
}


export default Header;