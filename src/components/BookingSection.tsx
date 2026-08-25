import React, { useState, useEffect } from 'react';
import { Language, BookingFormData } from '../types';
import { CONTENT } from '../data/content';
import { Calendar, Phone, MessageSquare, CheckCircle, Clock, AlertCircle, Sparkles } from 'lucide-react';

interface BookingSectionProps {
  lang: Language;
  preselectedServiceId?: string | null;
}

export const BookingSection: React.FC<BookingSectionProps> = ({ lang, preselectedServiceId }) => {
  const t = CONTENT[lang].booking;
  const servicesList = CONTENT[lang].services.items;
  
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    phone: '',
    serviceId: preselectedServiceId || '',
    appointmentSlot: 'saturday',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Synchronize when preselectedServiceId changes from external trigger
  useEffect(() => {
    if (preselectedServiceId) {
      setFormData(prev => ({ ...prev, serviceId: preselectedServiceId }));
      const section = document.getElementById('booking');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [preselectedServiceId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedSlot = t.form.timeOptions.find(option => option.value === formData.appointmentSlot);

    if (!formData.name.trim() || !formData.phone.trim() || !selectedSlot) {
      setErrorMessage(
        lang === 'ar'
          ? 'يرجى إدخال الاسم ورقم الهاتف واختيار موعد متاح للمتابعة.'
          : 'Please enter your full name, phone number, and an available appointment.'
      );
      return;
    }

    const selectedServiceObj = servicesList.find(s => s.id === formData.serviceId);
    const serviceName = selectedServiceObj ? selectedServiceObj.title : (lang === 'ar' ? 'استشارة عامة' : 'General Consultation');

    // Build structured WhatsApp message
    const waText = lang === 'ar'
      ? `السلام عليكم ورحمة الله وبركاته،
أود إرسال طلب حجز موعد بعيادة د. هبة الكومي:
• الاسم: ${formData.name.trim()}
• الهاتف: ${formData.phone.trim()}
• الخدمة المطلوبة: ${serviceName}
• الموعد المختار: ${selectedSlot.label}
${formData.notes.trim() ? `• ملاحظات إضافية: ${formData.notes.trim()}` : ''}

يرجى تأكيد الموعد المتاح من قبل إدارة العيادة. شكراً جزيلاً.`
      : `Hello,
I would like to request an appointment with Dr. Heba El-Komy:
• Full Name: ${formData.name.trim()}
• Phone Number: ${formData.phone.trim()}
• Requested Service: ${serviceName}
• Selected Appointment: ${selectedSlot.label}
${formData.notes.trim() ? `• Additional Notes: ${formData.notes.trim()}` : ''}

Please confirm the appointment details with the clinic. Thank you.`;

    const encodedText = encodeURIComponent(waText);
    const whatsappUrl = `https://wa.me/201556400998?text=${encodedText}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsSubmitted(true);
  };

  return (
    <section id="booking" data-reveal className="py-24 lg:py-32 bg-[#70B0B0] text-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-black/10 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.sectionTag}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {t.headline}
          </h2>

          <p className="text-base sm:text-lg text-white/90 font-normal leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* The Booking Container (Sophisticated White & Neutral Form on Teal Canvas) */}
        <div className="bg-[#FAF9F6] text-[#173333] rounded-2xl p-8 sm:p-12 shadow-[0_25px_60px_rgba(24,51,51,0.18)] border border-white/30 text-start">
          
          {isSubmitted ? (
            <div className="py-12 text-center space-y-5 animate-in fade-in duration-300">
              <div className="w-16 h-16 bg-[#70B0B0]/20 text-[#70B0B0] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-9 h-9" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#183333]">
                {lang === 'ar' ? 'تم تجهيز طلب الحجز بنجاح' : 'Booking Request Initiated'}
              </h3>

              <p className="text-base text-[#667575] max-w-md mx-auto leading-relaxed">
                {t.form.disclaimerNotice}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-3 rounded-xl border border-[#183333]/20 text-[#183333] hover:bg-black/5 text-sm font-medium transition-colors"
                >
                  {lang === 'ar' ? 'حجز موعد آخر' : 'Book Another Appointment'}
                </button>
                <a
                  href="tel:+201556400998"
                  className="px-6 py-3 rounded-xl bg-[#70B0B0] text-white hover:bg-[#5FA1A1] text-sm font-medium flex items-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'اتصال فوري بالعيادة' : 'Call Clinic Directly'}</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Two Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <div className="space-y-2">
                  <label htmlFor="name-input" className="block text-xs uppercase tracking-wider font-bold text-[#183333]">
                    {t.form.nameLabel} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t.form.namePlaceholder}
                    required
                    className="w-full h-12 px-4 rounded-xl border border-[#183333]/20 bg-white focus:outline-none focus:ring-2 focus:ring-[#70B0B0] focus:border-transparent text-sm transition-all placeholder:text-[#667575]/60"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label htmlFor="phone-input" className="block text-xs uppercase tracking-wider font-bold text-[#183333]">
                    {t.form.phoneLabel} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone-input"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t.form.phonePlaceholder}
                    required
                    className="w-full h-12 px-4 rounded-xl border border-[#183333]/20 bg-white focus:outline-none focus:ring-2 focus:ring-[#70B0B0] focus:border-transparent text-sm transition-all placeholder:text-[#667575]/60"
                  />
                </div>

                {/* Selected Service */}
                <div className="space-y-2">
                  <label htmlFor="service-select" className="block text-xs uppercase tracking-wider font-bold text-[#183333]">
                    {t.form.serviceLabel}
                  </label>
                  <select
                    id="service-select"
                    name="serviceId"
                    value={formData.serviceId}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-xl border border-[#183333]/20 bg-white focus:outline-none focus:ring-2 focus:ring-[#70B0B0] focus:border-transparent text-sm transition-all cursor-pointer"
                  >
                    <option value="">{t.form.servicePlaceholder}</option>
                    {servicesList.map(service => (
                      <option key={service.id} value={service.id}>
                        {service.number} - {service.title}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Time Selection */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-wider font-bold text-[#183333]">
                  {t.form.timeLabel}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {t.form.timeOptions.map(opt => (
                    <label
                      key={opt.value}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all text-xs font-medium ${
                        formData.appointmentSlot === opt.value
                          ? 'border-[#70B0B0] bg-[#70B0B0]/10 text-[#183333] font-bold shadow-xs'
                          : 'border-[#183333]/15 bg-white text-[#667575] hover:bg-black/5'
                      }`}
                    >
                      <input
                        type="radio"
                        name="appointmentSlot"
                        value={opt.value}
                        checked={formData.appointmentSlot === opt.value}
                        onChange={handleChange}
                        className="text-[#70B0B0] focus:ring-[#70B0B0]"
                      />
                      <Clock className="w-3.5 h-3.5 text-[#70B0B0]" />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <label htmlFor="notes-input" className="block text-xs uppercase tracking-wider font-bold text-[#183333]">
                  {t.form.notesLabel}
                </label>
                <textarea
                  id="notes-input"
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder={t.form.notesPlaceholder}
                  className="w-full p-4 rounded-xl border border-[#183333]/20 bg-white focus:outline-none focus:ring-2 focus:ring-[#70B0B0] focus:border-transparent text-sm transition-all placeholder:text-[#667575]/60"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  id="submit-booking-wa-btn"
                  type="submit"
                  className="premium-cta w-full flex items-center justify-center gap-3 bg-[#183333] hover:bg-[#112525] text-white py-4 px-6 rounded-xl font-bold text-base transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5 text-[#70B0B0]" />
                  <span>{t.form.submitButton}</span>
                </button>
              </div>

              {/* Verified Disclaimer Notice */}
              <div className="p-3.5 rounded-xl bg-[#F4FAF9] border border-[#70B0B0]/30 text-xs text-[#183333]/80 text-center leading-relaxed">
                {t.form.disclaimerNotice}
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
