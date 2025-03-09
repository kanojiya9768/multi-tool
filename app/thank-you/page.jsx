import Head from "next/head";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <Head>
        <title>Thank You | Multi Tool</title>
        <meta
          name="description"
          content="Thank you for using Multi Tool! We appreciate your visit and hope you find our tools helpful."
        />
        <meta
          name="keywords"
          content="thank you, gratitude, Multi Tool, online tools"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Thank You | Multi Tool" />
        <meta
          property="og:description"
          content="We appreciate your visit to Multi Tool. Thank you for using our tools. We hope they meet your needs."
        />
        <meta
          property="og:url"
          content="https://multi-tool-eosin.vercel.app/thank-you"
        />
        <link
          rel="canonical"
          href="https://multi-tool-eosin.vercel.app/thank-you"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Thank You | Multi Tool",
              description:
                "Thank you for using Multi Tool. We value your visit and look forward to assisting you again.",
              url: "https://multi-tool-eosin.vercel.app/thank-you",
              mainEntityOfPage: "https://multi-tool-eosin.vercel.app/thank-you",
            }),
          }}
        />
      </Head>

      <div class="bg-white font-roboto flex items-center justify-center min-h-screen py-10 mt-20">
        <div class="bg-white p-10 rounded-lg shadow-2xl text-center max-w-lg mx-auto relative">
          <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-blue-500"></div>
          <img
            alt="A decorative thank you icon with a smiley face"
            class="mx-auto mb-6 animate-bounce"
            height="100"
            src="https://storage.googleapis.com/a1aa/image/_5Dw-tDORSzI6atchIlbOqBNAKAY8ZG0-Ig_MPgQ2hQ.jpg"
            width="100"
          />
          <h1 class="text-5xl font-bold text-gray-800 mb-4">Thank You!</h1>
          <p class="text-gray-600 mb-8">
            Your submission has been received. We appreciate your feedback and
            will get back to you shortly.
          </p>
          <Link
            class="inline-block primary-gradient bg-green-500 text-white px-8 py-3 rounded-full hover:bg-green-600 transition duration-300"
            href="/"
          >
            Go to Homepage
          </Link>
          <div class="mt-10">
            <img
              alt="A decorative background image with abstract shapes and colors"
              class="w-full h-auto"
              height="320"
              src="https://storage.googleapis.com/a1aa/image/f8VfCw36p9hVfrArkrPgkIwAW8-wvaMeus9Ta3OykT0.jpg"
              width="1440"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
