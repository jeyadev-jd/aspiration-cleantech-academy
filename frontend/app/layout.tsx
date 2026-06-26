import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Aspiration Cleantech Academy",
  description: "Job-oriented technical training programs from Aspiration Cleantech Academy.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.variable} style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
        <Navbar />
        {children}
        <Footer />
        <ScrollReveal />
        <BootstrapClient />
      </body>
    </html>
  );
}
