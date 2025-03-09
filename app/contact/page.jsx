import React from "react";
import ContactUs from "../modules/tools/ContactUs";

export const metadata = {
  title: "Contact Us | Multi Tool",
  description:
    "Get in touch with us for support or inquiries regarding our online tools collection.",
  keywords: "contact, multi tool, support, inquiries",
  openGraph: {
    type: "website",
    title: "Contact Us | Multi Tool",
    description:
      "Get in touch with us for support or inquiries regarding our online tools collection.",
    url: "http://localhost:3000/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Multi Tool",
    description:
      "Get in touch with us for support or inquiries regarding our online tools collection.",
    url: "http://localhost:3000/contact",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Contact Us | Multi Tool",
    description:
      "Get in touch with us for support or inquiries regarding our online tools collection.",
    url: "http://localhost:3000/contact",
    mainEntityOfPage: "http://localhost:3000/contact",
  },
};


const page = () => {
  return (
    <div className="h-full mt-28">
      <ContactUs />
    </div>
  );
};

export default page;
