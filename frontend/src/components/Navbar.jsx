import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Navbar({ cartCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate(`/#${targetId}`);
      setTimeout(() => {
        if (targetId === 'top') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    if (targetId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { label: 'Products', targetId: 'categories' },
    { label: 'How It Works', targetId: 'how-it-works' },
    { label: 'Trending', targetId: 'featured', isSpecial: true },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-transparent pt-3 sm:pt-4 pb-2 px-4 sm:px-6 lg:px-8 pointer-events-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 sm:h-18 px-4 sm:px-6 rounded-2xl bg-white/[0.02] backdrop-blur-md border border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <a 
              href="#" 
              onClick={(e) => handleSmoothScroll(e, 'top')}
              className="flex items-center gap-2.5 group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF6D06] to-[#ff8c3a] flex items-center justify-center shadow-lg shadow-[#FF6D06]/30 group-hover:scale-105 group-hover:shadow-[#FF6D06]/50 transition-all duration-300">
                <span className="font-black text-black text-lg tracking-tight">AS</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-white flex items-center gap-1 group-hover:text-gray-100 transition-colors">
                  AS<span className="text-[#FF6D06]">Vision</span>
                </span>
                <span className="text-[9px] text-white/40 -mt-1 tracking-widest uppercase font-medium">Custom Studio</span>
              </div>
            </a>
          </div>

          {/* Center Navigation Links (Clean directly without extra box container) */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9">
            {navLinks.map((link) => (
              <a
                key={link.targetId}
                href={`#${link.targetId}`}
                onClick={(e) => handleSmoothScroll(e, link.targetId)}
                className={`text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  link.isSpecial
                    ? 'text-[#FF6D06] hover:text-[#ff8a38] flex items-center gap-1.5'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.isSpecial && <span className="text-xs">✦</span>}
                <span>{link.label}</span>
              </a>
            ))}
          </nav>

          {/* Right Action Icons & Smooth CTA */}
          <div className="flex items-center gap-3">
            {/* Cart Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => navigate('/cart')}
                aria-label="Shopping Cart"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 cursor-pointer relative hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#FF6D06] text-white text-[10px] font-extrabold h-4.5 w-4.5 min-w-[18px] rounded-full flex items-center justify-center border-2 border-[#0a0a0c] shadow-md shadow-[#FF6D06]/50 animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Primary Action Button with Smooth Scroll */}
            <a
              href="#categories"
              onClick={(e) => handleSmoothScroll(e, 'categories')}
              className="hidden sm:inline-flex items-center gap-2 bg-[#FF6D06] hover:bg-[#ff7b1c] active:scale-95 text-white font-bold text-xs tracking-wider px-5 py-2.5 rounded-full shadow-lg shadow-[#FF6D06]/30 hover:shadow-[#FF6D06]/50 transition-all duration-300 cursor-pointer uppercase"
            >
              <span>Shop Products</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-white hover:bg-white/[0.1] transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu (Glass & Smooth) */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-3 bg-[#121316]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl space-y-1.5">
            {navLinks.map((link) => (
              <a
                key={link.targetId}
                href={`#${link.targetId}`}
                onClick={(e) => handleSmoothScroll(e, link.targetId)}
                className={`block px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${
                  link.isSpecial
                    ? 'text-[#FF6D06] bg-[#FF6D06]/10 font-bold'
                    : 'text-white/80 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                {link.isSpecial ? `✦ ${link.label}` : link.label}
              </a>
            ))}

            {/* Mobile Cart Link */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/cart');
              }}
              className="w-full text-left flex items-center justify-between px-4 py-2.5 text-sm font-medium text-white/90 hover:bg-white/[0.06] rounded-xl cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <span>🛒</span>
                <span>My Cart</span>
              </span>
              {cartCount > 0 && (
                <span className="bg-[#FF6D06] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="pt-2">
              <a
                href="#categories"
                onClick={(e) => handleSmoothScroll(e, 'categories')}
                className="w-full text-center block bg-[#FF6D06] text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl shadow-lg shadow-[#FF6D06]/30 active:scale-98 transition-transform"
              >
                Shop Products
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
