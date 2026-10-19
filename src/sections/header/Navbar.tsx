'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useSession } from '@/components/session-provider';
import { createClient } from '@/utils/supabase/client';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

import { Menu, X } from 'lucide-react';

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function ThemeToggle() {
  const t = useTranslations('nav');
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-11 w-11" />;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="inline-flex h-11 w-11 items-center justify-center rounded-md text-foreground hover:bg-muted transition-colors duration-200 cursor-pointer"
      aria-label={theme === 'dark' ? t('themeToLight') : t('themeToDark')}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

function AuthActions({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) {
  const t = useTranslations('nav');
  const router = useRouter();
  const { data: session, status } = useSession();
  const buttonClass = mobile ? 'h-11 w-full' : 'h-11';

  // Reserve the space while the session resolves so the header does not jump
  if (status === 'loading') return <div aria-hidden className={mobile ? 'h-11' : 'ml-2 h-11 w-28'} />;

  if (!session) {
    return (
      <Button asChild variant="outline" size="sm" className={mobile ? 'h-11 w-full' : 'ml-2 h-11'}>
        <Link href="/login?callbackUrl=/admin" onClick={onNavigate}>
          {t('login')}
        </Link>
      </Button>
    );
  }

  const canManage = session.user.role === 'ADMIN' || session.user.role === 'EDITOR';

  const handleSignOut = async () => {
    await createClient().auth.signOut();
    onNavigate?.();
    router.push('/');
    router.refresh();
  };

  return (
    <div className={mobile ? 'flex flex-col gap-2' : 'ml-2 flex items-center gap-2'}>
      {canManage && (
        <Button asChild size="sm" className={buttonClass}>
          <Link href="/admin" onClick={onNavigate}>
            {t('panel')}
          </Link>
        </Button>
      )}
      <Button variant="outline" size="sm" className={buttonClass} onClick={handleSignOut}>
        {t('logout')}
      </Button>
    </div>
  );
}

export function Navbar() {
  const t = useTranslations('nav');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen]);

  const navItems = [
    { name: t('timeline'), href: '/timeline' },
    { name: t('club'), href: '/club' },
    { name: t('studentCouncil'), href: '/consejo-estudiantil' },
    { name: t('personalDocente'), href: '/personal-docente' },
  ];

  return (
    <nav className="flex items-center justify-between py-2">
      <Link href="/" className="inline-flex min-h-11 items-center font-bold tracking-tight text-primary hover:opacity-80 transition-opacity leading-tight">
        <span className="hidden sm:block text-sm">{t('brand')}</span>
        <span className="sm:hidden text-lg">TIMS</span>
      </Link>

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="inline-flex min-h-11 items-center px-3 rounded-md text-sm font-medium text-foreground hover:bg-muted hover:text-primary transition-colors duration-200"
          >
            {item.name}
          </Link>
        ))}
        <LanguageSwitcher />
        <ThemeToggle />
        <AuthActions />
      </div>

      {/* Mobile controls */}
      <div className="md:hidden flex items-center gap-1">
        <LanguageSwitcher />
        <ThemeToggle />
        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-foreground hover:bg-muted transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? t('closeMenu') : t('openMenu')}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isMenuOpen && (
        <div id="mobile-menu" className="absolute top-full left-0 right-0 md:hidden border-b border-border bg-background shadow-md">
          <div className="mx-auto max-w-6xl px-4 py-2 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-3 rounded-md text-sm font-medium text-foreground hover:bg-muted hover:text-primary transition-colors duration-200"
                onClick={closeMenu}
              >
                {item.name}
              </Link>
            ))}
            <div className="py-2 border-t border-border mt-1">
              <AuthActions mobile onNavigate={closeMenu} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
