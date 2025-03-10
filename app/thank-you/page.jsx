import Link from "next/link";
import React from "react";


export const metadata = {
    title: "Thank You | Multi Tool",
    description:
      "Thank you for using Multi Tool! We hope our online tools helped you with your task.",
    keywords: "thank you, multi tool, online tools",
    openGraph: {
      type: "website",
      title: "Thank You | Multi Tool",
      description:
        "Thank you for using Multi Tool! We hope our online tools helped you with your task.",
      url: "http://localhost:3000/thank-you",
    },
    twitter: {
      card: "summary_large_image",
      title: "Thank You | Multi Tool",
      description:
        "Thank you for using Multi Tool! We hope our online tools helped you with your task.",
      url: "http://localhost:3000/thank-you",
    },
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Thank You | Multi Tool",
      description:
        "Thank you for using Multi Tool! We hope our online tools helped you with your task.",
      url: "http://localhost:3000/thank-you",
      mainEntityOfPage: "http://localhost:3000/thank-you",
    },
  };
  

const page = () => {
  return (
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
  );
};

export default page;
