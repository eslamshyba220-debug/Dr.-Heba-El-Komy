import React from 'react';
import { Language } from '../types';
import { CONTENT } from '../data/content';
import { Phone, MessageSquare, MapPin, Clock, AlertTriangle, ExternalLink, ShieldCheck } from 'lucide-react';

interface ContactSectionProps {
  lang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const t = CONTENT[lang].contact;

  return (
    <section id="contact" data-reveal className="py-24 lg:py-32 bg-[#FAF9F6] relative border-t border-[#183333]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header with Number */}
        <div className="flex items-baseline gap-4 mb-16 border-b border-[#183333]/10 pb-6">
          <span className="text-4xl sm:text-6xl font-extralight text-[#70B0B0] tracking-tighter">
            {t.sectionNumber}
          </span>
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-[#70B0B0] font-semibold">
              {t.sectionTag}
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#183333]">
              {t.headline}
            </h2>
          </div>
        </div>

        {/* Split Editorial Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start text-start">
          
          {/* Left Column: Direct Clinical Contacts & Working Hours (7 cols) */}
          <div className="lg:col-span-7 space-y-10">
            
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-[#183333]">
                {t.clinicTitle}
              </h3>
              <p className="text-sm font-medium text-[#70B0B0]">
                {t.specialty}
              </p>
            </div>

            {/* Contact Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-[#183333]/10">
              
              {/* Phone Lines */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[#183333]">
                  <Phone className="w-4 h-4 text-[#70B0B0]" />
                  <span>{t.phoneTitle}</span>
                </div>
                <div className="space-y-1">
                  <a
                    href={`tel:${t.phoneNumber}`}
                    className="block text-base font-semibold text-[#183333] hover:text-[#70B0B0] transition-colors"
                  >
                    {t.phoneNumber}
                  </a>
                  {t.phoneSecondary && (
                    <a
                      href={`tel:${t.phoneSecondary}`}
                      className="block text-sm text-[#667575] hover:text-[#70B0B0] transition-colors"
                    >
                      {t.phoneSecondary}
                    </a>
                  )}
                </div>
              </div>

              {/* WhatsApp Direct Line */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[#183333]">
                  <MessageSquare className="w-4 h-4 text-[#70B0B0]" />
                  <span>{t.whatsappTitle}</span>
                </div>
                <a
                  href={`https://wa.me/201556400998?text=${encodeURIComponent(
                    lang === 'ar' ? 'مرحباً د. هبة الكومي، أود الاستفسار عن موعد كشف في العيادة.' : 'Hello Dr. Heba El-Komy, I would like to inquire about an appointment.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-base font-semibold text-[#70B0B0] hover:text-[#5FA1A1] transition-colors"
                >
                  <span>{t.whatsappNumber}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Clinic Address */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[#183333]">
                  <MapPin className="w-4 h-4 text-[#70B0B0]" />
                  <span>{t.locationTitle}</span>
                </div>
                <p className="text-sm text-[#667575] leading-relaxed">
                  {t.locationDetails}
                </p>
              </div>

              {/* Working Hours */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[#183333]">
                  <Clock className="w-4 h-4 text-[#70B0B0]" />
                  <span>{t.hoursTitle}</span>
                </div>
                <p className="text-sm text-[#667575] leading-relaxed">
                  {t.hoursDetails}
                </p>
              </div>

            </div>

            {/* Surgical Emergency Notice Bar */}
            <div className="p-5 rounded-xl bg-white border border-[#70B0B0]/30 shadow-xs flex items-start gap-4">
              <div className="w-9 h-9 rounded-lg bg-[#70B0B0]/15 flex items-center justify-center shrink-0 text-[#70B0B0]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#183333]">
                  {t.emergencyTitle}
                </h4>
                <p className="text-xs text-[#667575] leading-relaxed">
                  {t.emergencyDetails}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Tasteful Map / Location Presence Frame (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden bg-white border border-[#183333]/15 shadow-[0_15px_35px_rgba(24,51,51,0.05)] p-6 sm:p-8 space-y-6">
              
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#70B0B0]/15 flex items-center justify-center text-[#70B0B0]">
                  <MapPin className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-[#183333]">
                  {lang === 'ar' ? 'موقع العيادة وسهولة الوصول' : 'Clinic Accessibility'}
                </h4>
                <p className="text-xs sm:text-sm text-[#667575] leading-relaxed">
                  {lang === 'ar'
                    ? 'تقع العيادة في موقع حيوي وهادئ مجهز بأماكن انتظار ومصاعد مخصصة لراحة المرضى وكبار السن.'
                    : 'Conveniently located with dedicated patient parking and elevators for comfortable access.'}
                </p>
              </div>

              {/* Aesthetic Location Visual Mock Plate with Brand Palette */}
              <div className="w-full h-48 rounded-xl bg-[#F4FAF9] border border-[#70B0B0]/20 flex flex-col items-center justify-center p-6 text-center space-y-3 relative overflow-hidden">
                <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-[#70B0B0]/10" />
                <div className="w-12 h-12 rounded-full bg-[#70B0B0] text-white flex items-center justify-center shadow-md animate-bounce">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="text-xs font-semibold text-[#183333]">
                  {t.locationDetails}
                </div>
              </div>

              <a
                id="open-google-maps-btn"
                href="https://www.google.com/maps/search/?api=1&query=505%20El-Horreya%20Road%2C%20Bolkly%2C%20Alexandria%2C%20Egypt"
                target="_blank"
                rel="noopener noreferrer"
                className="premium-cta w-full flex items-center justify-center gap-2 bg-[#183333] hover:bg-[#112525] text-white py-3.5 px-4 rounded-xl font-medium text-sm transition-colors"
              >
                <span>{t.mapButton}</span>
                <ExternalLink className="w-4 h-4 text-[#70B0B0]" />
              </a>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
