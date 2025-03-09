import Head from "next/head";
import React from "react";

const page = () => {
  return (
    <>
      <Head>
        <title>Terms and Conditions | Multi Tool</title>
        <meta
          name="description"
          content="Read the terms and conditions for using Multi Tool. Understand the rules and guidelines that govern your use of our tools."
        />
        <meta
          name="keywords"
          content="terms and conditions, terms of service, user agreement, Multi Tool rules"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Terms and Conditions | Multi Tool" />
        <meta
          property="og:description"
          content="Read our terms and conditions for the Multi Tool website and tools. Understand your rights and responsibilities."
        />
        <meta
          property="og:url"
          content="https://multi-tool-eosin.vercel.app/terms-and-conditions"
        />
        <link
          rel="canonical"
          href="https://multi-tool-eosin.vercel.app/terms-and-conditions"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Terms and Conditions | Multi Tool",
              description:
                "Review the terms and conditions for using Multi Tool services and tools. Know your rights and obligations.",
              url: "https://multi-tool-eosin.vercel.app/terms-and-conditions",
              mainEntityOfPage:
                "https://multi-tool-eosin.vercel.app/terms-and-conditions",
            }),
          }}
        />
      </Head>

      <section className="mt-24 bg-white p-6 rounded  container mx-auto px-4 sm:px-10 lg:px-28">
        <h2 className="text-3xl font-bold mb-4 primary-text-gradient">
          Terms and Conditions
        </h2>
        <p className="mb-4">
          {` Welcome to Multi Tools. Whether you're converting units, calculating
        expenses, or generating strong passwords, our free online tools are
        designed to save you time and effort. These terms and conditions outline
        the rules and regulations for the use of Multi Tools' website.`}
        </p>

        <h3 className="text-2xl font-semibold mb-2 primary-text-gradient">
          Acceptance of Terms
        </h3>
        <p className="mb-4">
          By accessing this website, we assume you accept these terms and
          conditions. Do not continue to use Multi Tools if you do not agree to
          all of the terms and conditions stated on this page.
        </p>

        <h3 className="text-2xl font-semibold mb-2 primary-text-gradient">
          License
        </h3>
        <p className="mb-4">
          Unless otherwise stated, Multi Tools and/or its licensors own the
          intellectual property rights for all material on Multi Tools. All
          intellectual property rights are reserved. You may access this from
          Multi Tools for your own personal use subjected to restrictions set in
          these terms and conditions.
        </p>

        <h3 className="text-2xl font-semibold mb-2 primary-text-gradient">
          User Responsibilities
        </h3>
        <p className="mb-4">
          As a user of this website, you agree to use the tools and services
          provided in a lawful manner. You are prohibited from:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Republishing material from Multi Tools</li>
          <li>Selling, renting, or sub-licensing material from Multi Tools</li>
          <li>
            Reproducing, duplicating, or copying material from Multi Tools
          </li>
          <li>Redistributing content from Multi Tools</li>
        </ul>

        <h3 className="text-2xl font-semibold mb-2 primary-text-gradient">
          Limitation of Liability
        </h3>
        <p className="mb-4">
          In no event shall Multi Tools, nor any of its officers, directors, and
          employees, be held liable for anything arising out of or in any way
          connected with your use of this website whether such liability is
          under contract. Multi Tools, including its officers, directors, and
          employees, shall not be held liable for any indirect, consequential,
          or special liability arising out of or in any way related to your use
          of this website.
        </p>

        <h3 className="text-2xl font-semibold mb-2 primary-text-gradient">
          Indemnification
        </h3>
        <p className="mb-4">
          You hereby indemnify to the fullest extent Multi Tools from and
          against any and/or all liabilities, costs, demands, causes of action,
          damages, and expenses arising in any way related to your breach of any
          of the provisions of these terms.
        </p>

        <h3 className="text-2xl font-semibold mb-2 primary-text-gradient">
          Severability
        </h3>
        <p className="mb-4">
          If any provision of these terms is found to be invalid under any
          applicable law, such provisions shall be deleted without affecting the
          remaining provisions herein.
        </p>

        <h3 className="text-2xl font-semibold mb-2 primary-text-gradient">
          Variation of Terms
        </h3>
        <p className="mb-4">
          Multi Tools is permitted to revise these terms at any time as it sees
          fit, and by using this website you are expected to review these terms
          on a regular basis.
        </p>

        <h3 className="text-2xl font-semibold mb-2 primary-text-gradient">
          Assignment
        </h3>
        <p className="mb-4">
          The Multi Tools is allowed to assign, transfer, and subcontract its
          rights and/or obligations under these terms without any notification.
          However, you are not allowed to assign, transfer, or subcontract any
          of your rights and/or obligations under these terms.
        </p>

        <h3 className="text-2xl font-semibold mb-2 primary-text-gradient">
          Entire Agreement
        </h3>
        <p className="mb-4">
          These terms constitute the entire agreement between Multi Tools and
          you in relation to your use of this website and supersede all prior
          agreements and understandings.
        </p>

        <h3 className="text-2xl font-semibold mb-2 primary-text-gradient">
          Governing Law & Jurisdiction
        </h3>
        <p className="mb-4">
          These terms will be governed by and interpreted in accordance with the
          laws of the State of [Your State], and you submit to the non-exclusive
          jurisdiction of the state and federal courts located in [Your State]
          for the resolution of any disputes.
        </p>

        <h3 className="text-2xl font-semibold mb-2 primary-text-gradient">
          Contact Us
        </h3>
        <p>If you have any questions about these terms, please contact us:</p>
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
    </>
  );
};

export default page;
