import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { NAV, SITE } from '../data/config';
import Logo from './Logo';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // desktop dropdown
  const [mobileSub, setMobileSub] = useState(null);
  const location = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [location.pathname, location.hash]);

  // Close desktop dropdown on outside click / Escape.
  useEffect(() => {
    const onClick = (e) => navRef.current && !navRef.current.contains(e.target) && setOpenMenu(null);
    const onKey = (e) => e.key === 'Escape' && (setOpenMenu(null), setMobileOpen(false));
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-brand/10 bg-cream/95 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-4 sm:h-20">
        <Link to="/" className="flex items-center gap-3" aria-label={`${SITE.fullName} home`}>
          <Logo className="h-11 w-auto sm:h-14" />
          <span className="hidden leading-tight sm:block">
            <span className="block font-display text-lg font-bold text-brand">{SITE.name}</span>
            <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-ink/60">Indore · {SITE.board}</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav ref={navRef} aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) =>
            item.children ? (
              <div key={item.label} className="relative">
                <button
                  type="button"
                  aria-expanded={openMenu === item.label}
                  aria-haspopup="true"
                  onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                  className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-bold text-ink hover:text-brand"
                >
                  {item.label}
                  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" className={`transition-transform ${openMenu === item.label ? 'rotate-180' : ''}`}>
                    <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                </button>
                {openMenu === item.label && (
                  <ul className="absolute left-0 top-full mt-2 w-52 rounded-md border border-brand/15 bg-white py-2 shadow-lg">
                    {item.children.map((c) => (
                      <li key={c.label}>
                        <Link to={c.to} className="block px-4 py-2 text-sm text-ink hover:bg-brand/5 hover:text-brand">
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-bold hover:text-brand ${isActive ? 'text-brand underline decoration-accent decoration-2 underline-offset-8' : 'text-ink'}`
                }
              >
                {item.label}
              </NavLink>
            )
          )}
          <Link to="/contact" className="btn-accent ml-2 !py-2">Enquire now</Link>
        </nav>

        {/* Hamburger */}
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-md border border-brand/25 text-brand lg:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {mobileOpen ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav id="mobile-menu" aria-label="Mobile" className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-brand/10 bg-cream lg:hidden">
          <ul className="container-x py-3">
            {NAV.map((item) => (
              <li key={item.label} className="border-b border-brand/10 last:border-0">
                {item.children ? (
                  <>
                    <button
                      type="button"
                      aria-expanded={mobileSub === item.label}
                      onClick={() => setMobileSub(mobileSub === item.label ? null : item.label)}
                      className="flex w-full items-center justify-between py-3 text-left font-bold text-ink"
                    >
                      {item.label}
                      <span aria-hidden="true" className={`text-xl transition-transform ${mobileSub === item.label ? 'rotate-45' : ''}`}>+</span>
                    </button>
                    {mobileSub === item.label && (
                      <ul className="pb-3 pl-3">
                        {item.children.map((c) => (
                          <li key={c.label}>
                            <Link to={c.to} className="block py-2 text-sm text-ink/80">{c.label}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link to={item.to} className="block py-3 font-bold text-ink">{item.label}</Link>
                )}
              </li>
            ))}
            <li className="pt-4">
              <Link to="/contact" className="btn-accent w-full">Enquire now</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
