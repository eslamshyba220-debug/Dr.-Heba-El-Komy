import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { CONTENT } from '../data/content';
import { Menu, X, Phone, Calendar } from 'lucide-react';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  onBookClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ lang, onToggleLang, onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = CONTENT[lang].nav;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: t.about },
    { href: '#services', label: t.services },
    { href: '#principles', label: t.principles },
    { href: '#journey', label: t.journey },
    { href: '#gallery', label: t.gallery },
    { href: '#faq', label: t.faq },
    { href: '#contact', label: t.contact },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#70B0B0]/20 py-3 shadow-[0_4px_20px_rgba(23,51,51,0.03)]'
          : 'bg-[#FAF9F6]/90 backdrop-blur-xs py-4 sm:py-5 border-b border-[#70B0B0]/20'
      }`}
    >
      <div className="w-full max-w-[1720px] mx-auto px-5 sm:px-8 xl:px-6 2xl:px-10 flex items-center justify-between gap-5">
        {/* Brand Doctor Name Logo */}
        <a
          id="brand-logo-link"
          href="#home"
          className="group flex shrink-0 flex-col items-start focus:outline-none"
        >
          <div className="whitespace-nowrap text-xl sm:text-2xl font-bold tracking-tighter leading-tight text-[#173333]">
            {lang === 'ar' ? (
              <>د. هبة <span className="text-[#70B0B0]">الكومي</span></>
            ) : (
              <>DR. HEBA <span className="text-[#70B0B0]">EL-KOMY</span></>
            )}
          </div>
          <span className="mt-2 max-w-[260px] xl:max-w-none text-[9px] sm:text-[10px] text-[#70B0B0] font-semibold leading-relaxed xl:whitespace-nowrap">
            {lang === 'ar' ? 'استشاري الجراحة العامة والمناظير وجراحات السمنة المفرطة' : 'Consultant General, Laparoscopic & Bariatric Surgeon'}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav" className="hidden xl:flex min-w-0 flex-1 items-center justify-center gap-3 2xl:gap-6 flex-nowrap">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-[11px] 2xl:text-xs font-medium text-[#173333]/85 hover:text-[#70B0B0] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls: Language Toggle & Booking Button */}
        <div className="hidden xl:flex shrink-0 items-center gap-3 2xl:gap-5">
          {/* Language Switcher */}
          <button
            id="lang-toggle-btn"
            onClick={onToggleLang}
            className="text-xs font-bold text-[#173333]/70 hover:text-[#70B0B0] transition-colors cursor-pointer uppercase tracking-widest"
            title={lang === 'ar' ? 'Switch to English' : 'التحويل للغة العربية'}
          >
            {lang === 'ar' ? 'EN' : 'عربي'}
          </button>

          {/* Primary CTA button styled per Editorial theme */}
          <button
            id="header-book-btn"
            onClick={onBookClick}
            className="whitespace-nowrap bg-[#70B0B0] text-white px-5 2xl:px-7 py-2.5 rounded-[10px] text-xs 2xl:text-sm font-semibold hover:bg-[#183333] transition-all duration-300 cursor-pointer shadow-xs"
          >
            {t.bookNow}
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex xl:hidden items-center gap-3">
          <button
            id="mobile-lang-toggle"
            onClick={onToggleLang}
            className="px-2.5 py-1 text-xs font-bold text-[#173333] border border-[#70B0B0]/30 rounded-lg bg-white"
          >
            {lang === 'ar' ? 'EN' : 'عربي'}
          </button>
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#173333] rounded-lg hover:bg-black/5 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#173333]" /> : <Menu className="w-6 h-6 text-[#173333]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="xl:hidden bg-[#FAF9F6] border-b border-[#70B0B0]/20 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200"
        >
          <div className="flex flex-col space-y-3 text-start">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium uppercase tracking-widest text-[#173333] hover:text-[#70B0B0] py-2 border-b border-[#70B0B0]/10 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 flex flex-col gap-2.5">
            <button
              id="mobile-drawer-book-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#70B0B0] text-white py-3 rounded-[10px] font-semibold text-sm hover:bg-[#183333] transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.bookNow}</span>
            </button>
            <a
              id="mobile-drawer-call-btn"
              href="tel:+201556400998"
              className="w-full flex items-center justify-center gap-2 border border-[#70B0B0]/30 text-[#173333] py-2.5 rounded-[10px] font-medium text-sm bg-white"
            >
              <Phone className="w-4 h-4 text-[#70B0B0]" />
              <span>{t.callNow}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
