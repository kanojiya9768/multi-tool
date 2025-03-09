import { SearchTools } from '@/app/modules/tools/ToolSearch'
import React from 'react'


export const metadata = {
    title: "Explore Tools | Multi Tool",
    description:
      "Explore a wide variety of online tools for different tasks such as calculators, converters, and generators.",
    keywords:
      "explore tools, online tools, multi tool, free tools, calculators, generators, converters",
    openGraph: {
      type: "website",
      title: "Explore Tools | Multi Tool",
      description:
        "Explore a wide variety of online tools for different tasks such as calculators, converters, and generators.",
      url: "http://localhost:3000/tools/explore",
    },
    twitter: {
      card: "summary_large_image",
      title: "Explore Tools | Multi Tool",
      description:
        "Explore a wide variety of online tools for different tasks such as calculators, converters, and generators.",
      url: "http://localhost:3000/tools/explore",
    },
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Explore Tools | Multi Tool",
      description:
        "Explore a wide variety of online tools for different tasks such as calculators, converters, and generators.",
      url: "http://localhost:3000/tools/explore",
      mainEntityOfPage: "http://localhost:3000/tools/explore",
    },
  };

  
const page = () => {
  return (
   <SearchTools />
  )
}

export default page