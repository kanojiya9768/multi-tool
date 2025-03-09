import ComplexCalculator from "@/app/modules/tools/AdvanceCalci";
import AdvancedImageFileConverter from "@/app/modules/tools/AdvanceImageConverter";
import AgeCalculator from "@/app/modules/tools/AgeCalci";
import ImageCompressor from "@/app/modules/tools/ImageCompressor";
import ImageResizer from "@/app/modules/tools/ImageResizer";
import { ImagesToPDFConverter } from "@/app/modules/tools/ImageToPDF";
import ImageFileConverter from "@/app/modules/tools/ImageTypeConverter";
import { JokeFetcher } from "@/app/modules/tools/JokeFectcher";
import LoanCalculator from "@/app/modules/tools/LoanCalci";
import PasswordGenerator from "@/app/modules/tools/PasswordGenerater";
import TriviaQuiz from "@/app/modules/tools/Quiz";
import TextCaseConverter from "@/app/modules/tools/TextCaseConverter";
import TodoApp from "@/app/modules/tools/Todo";
import UnitConverter from "@/app/modules/tools/UnitConverter";
import React from "react";

export const metadata = {
  title: "Explore Tools | Multi Tool",
  description:
    "Explore a wide variety of online tools for different tasks such as calculators, converters, and generators. Find the perfect tool for your needs!",
  keywords:
    "online tools, multi tool, calculators, generators, converters, text tools, image tools, quiz, password generator, loan calculator, age calculator, joke generator",
  openGraph: {
    type: "website",
    title: "Explore Tools | Multi Tool",
    description:
      "Explore a wide variety of online tools for different tasks such as calculators, converters, and generators. Find the perfect tool for your needs!",
    url: "http://localhost:3000/tools/explore",
    image: "http://localhost:3000/static/images/tools-preview.jpg", // Add a relevant image URL here
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore Tools | Multi Tool",
    description:
      "Explore a wide variety of online tools for different tasks such as calculators, converters, and generators. Find the perfect tool for your needs!",
    url: "http://localhost:3000/tools/explore",
    image: "http://localhost:3000/static/images/tools-preview.jpg", // Add a relevant image URL here
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Explore Tools | Multi Tool",
    description:
      "Explore a wide variety of online tools for different tasks such as calculators, converters, and generators. Find the perfect tool for your needs!",
    url: "http://localhost:3000/tools/explore",
    mainEntityOfPage: "http://localhost:3000/tools/explore",
  },
};

const page = ({ params }) => {
  const { tool } = params;

  const Tools = {
    "unit-converter": <UnitConverter />,
    "text-case-converter": <TextCaseConverter />,
    "password-generator": <PasswordGenerator />,
    "complex-calculator": <ComplexCalculator />,
    "loan-calculator": <LoanCalculator />,
    "image-resizer": <ImageResizer />,
    "image-compressor": <ImageCompressor />,
    "todo-app": <TodoApp />,
    "age-calculator": <AgeCalculator />,
    "random-joke-generator": <JokeFetcher />,
    "trivia-quiz": <TriviaQuiz />,
    "image-converter": <ImageFileConverter />,
    "advanced-image-converter": <AdvancedImageFileConverter />,
    "image-to-pdf-converter" : <ImagesToPDFConverter />
  };

  return (
    <div className="pt-32 w-full h-full">
      {Tools[tool] ? (
        Tools[tool]
      ) : (
        <div className="text-center bg-gradient-to-br from-primary/40 via-purple-500/5 to-blue-500/5 animate-gradient h-[80dvh] text-3xl animate-g xl:text-6xl font-bold md:w-[60%] mx-auto flex justify-center items-center primary-text-gradient">
          Tool You Are Looking For is Not Available.!
        </div>
      )}
    </div>
  );
};

export default page;
