import Head from "next/head";
import { Category } from "./modules/constant/Category";
import { HeroSection } from "./modules/constant/HeroSection";
import { PopularTools } from "./modules/constant/Polulartools";
import ContactUs from "./modules/tools/ContactUs";

export default function Home() {
  return (
    <div className="w-full h-full">
      <Head>
        <title>Multi Tool | Online Tools Collection</title>
        <meta
          name="description"
          content="Explore a wide variety of online tools for your everyday needs. Multi Tool offers calculators, converters, generators, and more."
        />
        <meta
          name="keywords"
          content="online tools, free tools, calculators, unit converters, password generators, image converters"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Multi Tool | Online Tools Collection"
        />
        <meta
          property="og:description"
          content="Discover useful online tools to simplify your tasks. From calculators to converters, Multi Tool has it all."
        />
        <meta
          property="og:url"
          content="https://multi-tool-eosin.vercel.app/"
        />
        <link rel="canonical" href="https://multi-tool-eosin.vercel.app/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Multi Tool | Online Tools Collection",
              description:
                "Explore a collection of essential online tools for various purposes like calculators, converters, and more.",
              url: "https://multi-tool-eosin.vercel.app/",
              mainEntityOfPage: "https://multi-tool-eosin.vercel.app/",
            }),
          }}
        />
      </Head>

      <HeroSection />
      <PopularTools />
      <Category />
      <ContactUs />
    </div>
  );
}
