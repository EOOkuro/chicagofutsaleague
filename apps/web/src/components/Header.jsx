import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NETWORK } from '../data/leagues.js';

const NAV = [
  { name: 'Leagues', path: '/leagues' },
  { name: 'Teams', path: '/teams' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Rules', path: '/rules' },
  { name: 'About', path: '/about' },
  { name: 'Sponsors', path: '/sponsors' },
  { name: 'Contact', path: '/contact' },
  { name: 'Register', path: '/register', highlight: true },
];

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (p) => pathname === p || pathname.startsWith(p + '/');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[hsl(var(--black))] shadow-lg py-2' : 'bg-[hsl(var(--black))]/90 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 z-50">
            <div className="w-10 h-10 bg-[hsl(var(--primary))] rounded-lg flex items-center justify-center transform rotate-3">
              <span className="text-white font-['Bebas_Neue'] text-2xl tracking-wider">{NETWORK.short}</span>
            </div>
            <span className="text-[hsl(var(--true-white))] font-['Bebas_Neue'] text-2xl tracking-wide hidden sm:block">
              {NETWORK.name.toUpperCase()}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {NAV.map((l) =>
              l.highlight ? (
                <Link
                  key={l.name}
                  to={l.path}
                  className="nav-text text-sm font-bold px-4 py-2 rounded-lg bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--primary-dark))] transition-colors"
                >
                  {l.name}
                </Link>
              ) : (
                <Link
                  key={l.name}
                  to={l.path}
                  className={`nav-text text-sm transition-colors ${
                    isActive(l.path)
                      ? 'text-[hsl(var(--primary))] font-bold'
                      : 'text-[hsl(var(--white))] hover:text-[hsl(var(--primary-light))]'
                  }`}
                >
                  {l.name}
                </Link>
              )
            )}
          </nav>

          <button
            className="md:hidden text-[hsl(var(--true-white))] z-50 p-2"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="absolute top-full left-0 right-0 bg-[hsl(var(--black))] border-t border-[hsl(var(--gray))]/20 shadow-xl md:hidden">
          <div className="flex flex-col px-4 py-6 gap-4">
            {NAV.map((l) => (
              <Link
                key={l.name}
                to={l.path}
                className={
                  l.highlight
                    ? 'nav-text text-lg font-bold px-4 py-3 rounded-lg bg-[hsl(var(--primary))] text-white text-center'
                    : `nav-text text-lg py-2 border-b border-[hsl(var(--gray))]/20 ${
                        isActive(l.path) ? 'text-[hsl(var(--primary))] font-bold' : 'text-[hsl(var(--white))]'
                      }`
                }
              >
                {l.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
