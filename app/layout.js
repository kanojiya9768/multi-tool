import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "./modules/layouts/Navbar";
import { Footer } from "./modules/layouts/Footer";
import { Particle_Animation } from "./modules/constant/BgParticleAnimation";

// Load custom fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Global metadata (this will apply to all pages unless overridden)
export const metadata = {
  title: "Multi Tool | Online Tools Collection",
  description:
    "Explore a wide variety of online tools for your everyday needs. Multi Tool offers calculators, converters, generators, and more.",
  keywords:
    "online tools, free tools, calculators, unit converters, password generators, image converters",
  openGraph: {
    type: "website",
    title: "Multi Tool | Online Tools Collection",
    description:
      "Discover useful online tools to simplify your tasks. From calculators to converters, Multi Tool has it all.",
    url: "https://multi-tool-eosin.vercel.app/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Multi Tool | Online Tools Collection",
    description:
      "Explore a wide variety of online tools for your everyday needs. Multi Tool offers calculators, converters, generators, and more.",
    url: "https://multi-tool-eosin.vercel.app/",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Multi Tool | Online Tools Collection",
    description:
      "Explore a collection of essential online tools for various purposes like calculators, converters, and more.",
    url: "https://multi-tool-eosin.vercel.app/",
    mainEntityOfPage: "https://multi-tool-eosin.vercel.app/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="bg-black flex-1 relative">
          <Particle_Animation />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
