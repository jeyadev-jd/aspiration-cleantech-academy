import type { Metadata } from "next";
import Script from "next/script";
import { Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./theme.css";
import "./swiper-theme.css";
import "./globals.css";
import BootstrapClient from "@/components/BootstrapClient";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

const siteUrl = "https://aspcvacademy.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aspiration Cleantech Academy | HVAC & Career Training Institute",
    template: "%s | Aspiration Cleantech Academy",
  },
  description:
    "Job-oriented technical training programs from Aspiration Cleantech Academy: HVAC, entrepreneurship, digital marketing, and sales training. Backed by Aspiration Cleantech Ventures.",
  keywords: [
    "HVAC training",
    "HVAC course India",
    "Aspiration Cleantech Academy",
    "technical training institute",
    "digital marketing training",
    "entrepreneurship training",
    "sales executive training",
    "job oriented courses",
  ],
  openGraph: {
    type: "website",
    siteName: "Aspiration Cleantech Academy",
    title: "Aspiration Cleantech Academy | HVAC & Career Training Institute",
    description:
      "Practical, job-oriented training in HVAC, entrepreneurship, digital marketing, and sales. Register to start your career.",
    url: siteUrl,
    images: [{ url: "/img/academy/students.jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aspiration Cleantech Academy | HVAC & Career Training Institute",
    description:
      "Practical, job-oriented training in HVAC, entrepreneurship, digital marketing, and sales.",
    images: ["/img/academy/students.jpeg"],
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: "w3O7wO60JoFrczDAWwWzQgOpUkuFyNuNRMVyTRqVVuA",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Aspiration Cleantech Academy",
  url: siteUrl,
  logo: `${siteUrl}/img/academy/logo-transparent.png`,
  description:
    "Job-oriented technical training programs in HVAC, entrepreneurship, digital marketing, and sales, backed by Aspiration Cleantech Ventures. Offers the best HVAC course in Chennai with pan-India training, in partnership with HVACRedu Inc.",
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  parentOrganization: {
    "@type": "Organization",
    name: "Aspiration Cleantech Ventures",
    url: "https://aspcv.com",
  },
  memberOf: {
    "@type": "Organization",
    name: "HVACRedu Inc.",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "1st Main Rd, Poompuhar Nagar, Kolathur",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    postalCode: "600099",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-96777-63170",
    contactType: "admissions",
    email: "info@aspcv.com",
  },
  sameAs: [
    "https://aspcv.com",
    "https://www.instagram.com/aspiration.cleantech.academy/",
    "https://www.linkedin.com/company/aspiration-cleantech-academy/",
    "https://www.youtube.com/channel/UC3H95r-Mb7N56PqFq2Woufw",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className={poppins.variable} style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
        <Navbar />
        {children}
        <Footer />
        <ScrollReveal />
        <BootstrapClient />

        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-EXGM6SFZ4Q" />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EXGM6SFZ4Q');`}
        </Script>
      </body>
    </html>
  );
}
