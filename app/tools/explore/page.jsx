import { SearchTools } from "@/app/modules/tools/ToolSearch";
import Head from "next/head";
import React from "react";

const page = () => {
  return (
    <>
      <Head>
        <title>Explore Tools | Multi Tool</title>
        <meta
          name="description"
          content="Explore a variety of tools on Multi Tool. From calculators to converters, find everything you need in one place."
        />
        <meta
          name="keywords"
          content="explore tools, online tools, free tools, tool collection, unit converter, calculator tools"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Explore Tools | Multi Tool" />
        <meta
          property="og:description"
          content="Explore all the tools offered by Multi Tool, from unit converters to calculators, image compressors, and much more!"
        />
        <meta
          property="og:url"
          content="https://multi-tool-eosin.vercel.app/tools/explore"
        />
        <link
          rel="canonical"
          href="https://multi-tool-eosin.vercel.app/tools/explore"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Explore Tools | Multi Tool",
              description:
                "Explore all the available tools at Multi Tool. Find calculators, converters, and more in one convenient place.",
              url: "https://multi-tool-eosin.vercel.app/tools/explore",
              mainEntityOfPage:
                "https://multi-tool-eosin.vercel.app/tools/explore",
            }),
          }}
        />
      </Head>

      <SearchTools />
    </>
  );
};

export default page;
