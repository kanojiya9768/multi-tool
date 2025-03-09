import React from "react";


export const metadata = {
  title: "Privacy Policy | Multi Tool",
  description:
    "Read our privacy policy regarding the collection and use of data on Multi Tool's website.",
  keywords: "privacy policy, multi tool, data collection",
  openGraph: {
    type: "website",
    title: "Privacy Policy | Multi Tool",
    description:
      "Read our privacy policy regarding the collection and use of data on Multi Tool's website.",
    url: "http://localhost:3000/privacy-policy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Multi Tool",
    description:
      "Read our privacy policy regarding the collection and use of data on Multi Tool's website.",
    url: "http://localhost:3000/privacy-policy",
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy | Multi Tool",
    description:
      "Read our privacy policy regarding the collection and use of data on Multi Tool's website.",
    url: "http://localhost:3000/privacy-policy",
    mainEntityOfPage: "http://localhost:3000/privacy-policy",
  },
};


export default function page() {
  return (
    <section className="bg-white mt-24 py-6 rounded container mx-auto px-4 sm:px-10 lg:px-28">
      <h1 className="text-3xl font-bold mb-4 primary-text-gradient">
        Privacy Policy
      </h1>
      <p className="mb-4">
        {`  Welcome to Multi Tools. Whether you're converting units, calculating
        expenses, or generating strong passwords, our free online tools are
        designed to save you time and effort. This privacy policy explains how
        we collect, use, and protect your information.`}
      </p>

      <h3 className="text-2xl font-semibold mb-2 primary-text-gradient">
        Information We Collect
      </h3>
      <p className="mb-4">We may collect the following types of information:</p>
      <ul className="list-disc list-inside mb-4">
        <li>
          Personal identification information (Name, email address, phone
          number, etc.)
        </li>
        <li>Usage data (pages visited, time spent on the site, etc.)</li>
      </ul>

      <h3 className="text-2xl font-semibold mb-2 primary-text-gradient">
        How We Use Your Information
      </h3>
      <p className="mb-4">
        We use the information we collect in the following ways:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>To provide and maintain our service</li>
        <li>To notify you about changes to our service</li>
        <li>To provide customer support</li>
        <li>
          To gather analysis or valuable information so that we can improve our
          service
        </li>
        <li>To monitor the usage of our service</li>
        <li>To detect, prevent and address technical issues</li>
      </ul>

      <h3 className="text-2xl font-semibold mb-2 primary-text-gradient">
        How We Protect Your Information
      </h3>
      <p className="mb-4">
        We are committed to ensuring that your information is secure. In order
        to prevent unauthorized access or disclosure, we have put in place
        suitable physical, electronic, and managerial procedures to safeguard
        and secure the information we collect online.
      </p>

      <h3 className="text-2xl font-semibold mb-2 primary-text-gradient">
        Cookies
      </h3>
      <p className="mb-4">
       {` We use cookies to enhance your experience on our website. Cookies are
        small files that a site or its service provider transfers to your
        computer's hard drive through your web browser (if you allow) that
        enables the site's or service provider's systems to recognize your
        browser and capture and remember certain information.`}
      </p>

      <h3 className="text-2xl font-semibold mb-2 primary-text-gradient">
        Third-Party Services
      </h3>
      <p className="mb-4">
        We may employ third-party companies and individuals to facilitate our
        service, to provide the service on our behalf, to perform
        service-related services, or to assist us in analyzing how our service
        is used. These third parties have access to your personal information
        only to perform these tasks on our behalf and are obligated not to
        disclose or use it for any other purpose.
      </p>

      <h3 className="text-2xl font-semibold mb-2 primary-text-gradient">
        Changes to This Privacy Policy
      </h3>
      <p className="mb-4">
        We may update our privacy policy from time to time. We will notify you
        of any changes by posting the new privacy policy on this page. You are
        advised to review this privacy policy periodically for any changes.
        Changes to this privacy policy are effective when they are posted on
        this page.
      </p>

      <h3 className="text-2xl font-semibold mb-2 primary-text-gradient">
        Contact Us
      </h3>
      <p>
        If you have any questions about this privacy policy, please contact us:
      </p>
      <ul className="list-disc list-inside">
        <li>By email: support@multitools.com</li>
        <li>
          By visiting this page on our website:{" "}
          <a
            href="/contact"
            className="text-blue-600 hover:underline primary-text-gradient"
          >
            Contact Us
          </a>
        </li>
        <li>
          By phone number: (+91){" "}
          <a
            href="tel:8097859158"
            className="text-blue-600 hover:underline primary-text-gradient"
          >
            8097859158
          </a>{" "}
        </li>
      </ul>
    </section>
  );
}
