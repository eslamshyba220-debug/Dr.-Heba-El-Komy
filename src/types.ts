export type Language = 'ar' | 'en';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  fullDesc: string;
  indications: string[];
  features: string[];
  recoveryTime: string;
  anesthesiaType: string;
}

export interface PrincipleItem {
  number: string;
  title: string;
  description: string;
}

export interface JourneyStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  duration?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageSrc: string;
  altText: string;
  description: string;
}

export interface ClinicInfo {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  workingHours: string;
  emergencyPhone: string;
}

export interface BookingFormData {
  name: string;
  phone: string;
  serviceId: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}
