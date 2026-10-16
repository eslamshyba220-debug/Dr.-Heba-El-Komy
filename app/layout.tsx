import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../src/index.css';
import { PageViewTracker } from './page-view-tracker';

const siteTitle = 'عيادة د. هبة الكومي | الجراحة العامة والمناظير وجراحات السمنة في الإسكندرية';
const siteDescription = 'د. هبة الكومي، استشاري الجراحة العامة والمناظير وجراحات السمنة المفرطة في الإسكندرية. تعرف على الخدمات الطبية وتواصل لحجز موعد.';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.drhebaelkomy.com'),
  title: siteTitle,
  description: siteDescription,
  keywords: [
    'د. هبة الكومي',
    'جراحة عامة في الإسكندرية',
    'جراحة المناظير في الإسكندرية',
    'جراحات السمنة الإسكندرية',
    'Dr Heba El-Komy',
    'General Surgery Alexandria',
  ],
  authors: [{ name: 'د. هبة الكومي' }],
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: 'website',
    locale: 'ar_EG',
    siteName: 'عيادة د. هبة الكومي',
    url: '/',
    images: [{ url: '/1.jpg', width: 1122, height: 1410, alt: 'د. هبة الكومي' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/1.jpg'],
  },
  icons: {
    icon: '/1.png',
    apple: '/1.png',
  },
  applicationName: 'عيادة د. هبة الكومي',
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Physician',
  '@id': 'https://www.drhebaelkomy.com/#physician',
  name: 'عيادة د. هبة الكومي',
  alternateName: 'Dr. Heba El-Komy',
  url: 'https://www.drhebaelkomy.com/',
  image: 'https://www.drhebaelkomy.com/1.jpg',
  logo: 'https://www.drhebaelkomy.com/1.png',
  telephone: '+201556400998',
  medicalSpecialty: 'Surgical',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '505 طريق الحرية، منطقة الوزارة، بولكلي، أعلى صيدليات بلبع وأمام الحزب الوطني، الدور الأول',
    addressLocality: 'الإسكندرية',
    addressCountry: 'EG',
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alexandria:wght@200;300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
      <body className="bg-[#FAF9F6] text-[#173333] font-alexandria antialiased selection:bg-[#70B0B0]/20 selection:text-[#173333]">
        <PageViewTracker />
        {children}
      </body>
    </html>
  );
}
