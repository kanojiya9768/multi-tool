import { Category } from "./modules/constant/Category";
import { HeroSection } from "./modules/constant/HeroSection";
import { PopularTools } from "./modules/constant/Polulartools";
import ContactUs from "./modules/tools/ContactUs";

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
    url: "http://localhost:3000",
  },
  twitter: {
    card: "summary_large_image",
    title: "Multi Tool | Online Tools Collection",
    description:
      "Explore a wide variety of online tools for your everyday needs. Multi Tool offers calculators, converters, generators, and more.",
    url: "http://localhost:3000",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Multi Tool | Online Tools Collection",
    description:
      "Explore a collection of essential online tools for various purposes like calculators, converters, and more.",
    url: "http://localhost:3000",
    mainEntityOfPage: "http://localhost:3000",
  },
};

export default function Home() {
  return (
    <div className="w-full h-full">
      <HeroSection />
      <PopularTools />
      <Category />
      <ContactUs />
    </div>
  );
}
