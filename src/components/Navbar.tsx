import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Museum', to: '/museum' },
  { label: 'Explore', to: '/explore' },
  { label: 'Stories', to: '/stories' },
  { label: 'The Film', to: '/film' },
  { label: 'Craft', to: '/craft' },
];

export function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const overHero = isHome && !scrolled && !mobileOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        overHero
          ? 'bg-gradient-to-b from-[#1B1B1B]/70 to-transparent text-[#F6F1E7] border-b border-white/10'
          : 'bg-[#F6F1E7]/95 backdrop-blur-md text-[#1B1B1B] border-b border-[#1B1B1B]/12'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element brand wordmark */}
        <Link
          to="/"
          className="font-editorial text-xl tracking-[0.14em] uppercase whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B75E40]"
        >
          PAGDI
        </Link>

        {/* Zone 2: 6 concise single-line nav links */}
        <nav
          aria-label="Primary Museum Navigation"
          className="hidden lg:flex items-center gap-7 text-sm font-medium"
        >
          {NAV_LINKS.map((item) => {
            const active =
              location.pathname === item.to ||
              (item.to !== '/' && location.pathname.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-200 ${
                  overHero
                    ? active
                      ? 'text-[#F6F1E7]'
                      : 'text-[#F6F1E7]/80 hover:text-[#F6F1E7]'
                    : active
                    ? 'text-[#641F2B]'
                    : 'text-[#1B1B1B]/75 hover:text-[#1B1B1B]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 bottom-0 h-px transition-transform duration-200 origin-left ${
                    overHero ? 'bg-[#DCC9A6]' : 'bg-[#641F2B]'
                  } ${active ? 'scale-x-100' : 'scale-x-0'}`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/try-on"
            className={`hidden sm:inline-flex items-center justify-center px-5 py-2 text-xs font-semibold tracking-[0.1em] uppercase whitespace-nowrap shrink-0 transition-colors duration-200 ${
              overHero
                ? 'bg-[#F6F1E7] text-[#1B1B1B] hover:bg-[#DCC9A6]'
                : 'bg-[#641F2B] text-[#F6F1E7] hover:bg-[#4E1620]'
            }`}
          >
            Try a Turban
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 -mr-2"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Minimal mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#F6F1E7] text-[#1B1B1B] border-t border-[#1B1B1B]/12 px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-1">
            <Link
              to="/"
              className="py-2.5 text-base font-medium border-b border-[#1B1B1B]/8"
            >
              Home
            </Link>
            {NAV_LINKS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="py-2.5 text-base font-medium border-b border-[#1B1B1B]/8"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/occasions"
              className="py-2.5 text-base font-medium border-b border-[#1B1B1B]/8"
            >
              Occasions
            </Link>
            <Link
              to="/gallery"
              className="py-2.5 text-base font-medium border-b border-[#1B1B1B]/8"
            >
              Gallery
            </Link>
          </nav>
          <Link
            to="/try-on"
            className="block w-full text-center py-3 bg-[#641F2B] text-[#F6F1E7] text-xs font-semibold tracking-[0.12em] uppercase"
          >
            Try a Turban
          </Link>
        </div>
      )}
    </header>
  );
}
