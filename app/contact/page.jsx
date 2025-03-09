import React from "react";
import ContactUs from "../modules/tools/ContactUs";
import Head from "next/head";

const page = () => {
  return (
    <>
      <Head>
        <title>Contact Us | Multi Tool</title>
        <meta
          name="description"
          content="Get in touch with us for any queries or support. We're here to help you with Multi Tool."
        />
        <meta
          name="keywords"
          content="contact us, customer support, reach us, help, support team, Multi Tool contact"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Contact Us | Multi Tool" />
        <meta
          property="og:description"
          content="Contact us for inquiries, feedback, or support with our Multi Tool services."
        />
        <meta
          property="og:url"
          content="https://multi-tool-eosin.vercel.app/contact"
        />
        <link
          rel="canonical"
          href="https://multi-tool-eosin.vercel.app/contact"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Contact Us | Multi Tool",
              description:
                "Get in touch with the Multi Tool team for any inquiries or assistance.",
              url: "https://multi-tool-eosin.vercel.app/contact",
              mainEntityOfPage: "https://multi-tool-eosin.vercel.app/contact",
            }),
          }}
        />
      </Head>

      <div className="h-full mt-28">
        <ContactUs />
      </div>
    </>
  );
};

export default page;
