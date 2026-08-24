/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServiceList } from './components/ServiceList';
import { Principles } from './components/Principles';
import { MedicalJourney } from './components/MedicalJourney';
import { BookingSection } from './components/BookingSection';
import { GallerySection } from './components/GallerySection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MobileActions } from './components/MobileActions';
import { MotionSystem } from './components/MotionSystem';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | null>(null);

  // Sync document direction and language attributes
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleBookClick = () => {
    const bookingElement = document.getElementById('booking');
    if (bookingElement) {
      bookingElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForBooking = (serviceId: string) => {
    setPreselectedServiceId(serviceId);
    handleBookClick();
  };

  return (
    <div className={`min-h-screen bg-[#FAF9F6] text-[#173333] selection:bg-[#70B0B0]/25 selection:text-[#173333] ${lang === 'ar' ? 'font-alexandria' : 'font-sans'}`}>
      <MotionSystem />
      {/* Navigation Header */}
      <Header
        lang={lang}
        onToggleLang={toggleLanguage}
        onBookClick={handleBookClick}
      />

      {/* Main Content Sections */}
      <main>
        {/* High-End Editorial Hero */}
        <Hero
          lang={lang}
          onBookClick={handleBookClick}
        />

        {/* 01: About & Surgical Philosophy */}
        <AboutSection
          lang={lang}
        />

        {/* 02: Editorial Services List (NO CARDS) */}
        <ServiceList
          lang={lang}
          onSelectServiceForBooking={handleSelectServiceForBooking}
        />

        {/* 03: Core Principles (Visual Statement) */}
        <Principles
          lang={lang}
        />

        {/* 04: Medical Journey Timeline */}
        <MedicalJourney
          lang={lang}
        />

        {/* 05: High-Conversion Booking Section */}
        <BookingSection
          lang={lang}
          preselectedServiceId={preselectedServiceId}
        />

        {/* 06: Clinical Gallery & Surgical Tech */}
        <GallerySection
          lang={lang}
        />

        {/* 07: FAQ Minimalist Accordion */}
        <FAQSection
          lang={lang}
        />

        {/* 08: Split Contact & Clinic Info */}
        <ContactSection
          lang={lang}
        />
      </main>

      {/* Minimal Footer */}
      <Footer
        lang={lang}
      />

      {/* Mobile Sticky Quick Actions */}
      <MobileActions
        lang={lang}
        onBookClick={handleBookClick}
      />
    </div>
  );
}
