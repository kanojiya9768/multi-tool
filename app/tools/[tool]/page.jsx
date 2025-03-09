import ComplexCalculator from "@/app/modules/tools/AdvanceCalci";
import AdvancedImageFileConverter from "@/app/modules/tools/AdvanceImageConverter";
import AgeCalculator from "@/app/modules/tools/AgeCalci";
import ImageCompressor from "@/app/modules/tools/ImageCompressor";
import ImageResizer from "@/app/modules/tools/ImageResizer";
import ImageFileConverter from "@/app/modules/tools/ImageTypeConverter";
import { JokeFetcher } from "@/app/modules/tools/JokeFectcher";
import LoanCalculator from "@/app/modules/tools/LoanCalci";
import PasswordGenerator from "@/app/modules/tools/PasswordGenerater";
import TriviaQuiz from "@/app/modules/tools/Quiz";
import TextCaseConverter from "@/app/modules/tools/TextCaseConverter";
import TodoApp from "@/app/modules/tools/Todo";
import UnitConverter from "@/app/modules/tools/UnitConverter";
import Head from "next/head";

const toolMetadata = {
  "unit-converter": {
    title: "Unit Converter | Multi Tool",
    description:
      "Convert units easily with Multi Tool's Unit Converter. Convert lengths, weights, temperatures, and more.",
    keywords:
      "unit converter, length converter, weight converter, temperature converter, convert units",
  },
  "text-case-converter": {
    title: "Text Case Converter | Multi Tool",
    description:
      "Easily convert text cases with Multi Tool's Text Case Converter.",
    keywords:
      "text case converter, text format, upper case, lower case, title case",
  },
  "password-generator": {
    title: "Password Generator | Multi Tool",
    description:
      "Generate strong and secure passwords easily using Multi Tool's Password Generator.",
    keywords:
      "password generator, secure password, strong password, random password",
  },
  "complex-calculator": {
    title: "Complex Calculator | Multi Tool",
    description:
      "Perform complex calculations easily with Multi Tool's Complex Calculator.",
    keywords: "complex calculator, math calculator, advanced calculator",
  },
  "loan-calculator": {
    title: "Loan Calculator | Multi Tool",
    description:
      "Calculate loan payments and interest easily using Multi Tool's Loan Calculator.",
    keywords:
      "loan calculator, calculate loan, mortgage calculator, loan payment",
  },
  "image-resizer": {
    title: "Image Resizer | Multi Tool",
    description:
      "Resize images quickly and easily with Multi Tool's Image Resizer.",
    keywords: "image resizer, resize images, image editing tool",
  },
  "image-compressor": {
    title: "Image Compressor | Multi Tool",
    description:
      "Compress images to reduce file size using Multi Tool's Image Compressor.",
    keywords: "image compressor, compress images, reduce image size",
  },
  "todo-app": {
    title: "ToDo App | Multi Tool",
    description: "Stay organized with Multi Tool's easy-to-use ToDo App.",
    keywords: "todo app, task manager, to do list",
  },
  "age-calculator": {
    title: "Age Calculator | Multi Tool",
    description:
      "Calculate your age quickly and easily with Multi Tool's Age Calculator.",
    keywords: "age calculator, calculate age, age date",
  },
  "random-joke-generator": {
    title: "Random Joke Generator | Multi Tool",
    description:
      "Get random jokes and lighten up your day with Multi Tool's Joke Generator.",
    keywords: "random joke generator, funny jokes, jokes app",
  },
  "trivia-quiz": {
    title: "Trivia Quiz | Multi Tool",
    description: "Test your knowledge with Multi Tool's Trivia Quiz.",
    keywords: "trivia quiz, quiz app, general knowledge quiz",
  },
  "image-converter": {
    title: "Image Converter | Multi Tool",
    description:
      "Convert images to different formats easily with Multi Tool's Image Converter.",
    keywords: "image converter, convert images, image format",
  },
  "advanced-image-converter": {
    title: "Advanced Image Converter | Multi Tool",
    description:
      "Convert and edit images in multiple formats with Multi Tool's Advanced Image Converter.",
    keywords: "advanced image converter, convert images, image editing",
  },
};

const page = ({ params }) => {
  const { tool } = params;

  const meta = toolMetadata[tool] || {
    title: "Tool Not Found | Multi Tool",
    description: "The tool you're looking for is not available on Multi Tool.",
    keywords: "multi tool, online tools, unavailable tool",
  };

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
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta
          property="og:url"
          content={`https://multi-tool-eosin.vercel.app/tools/${tool}`}
        />
        <link
          rel="canonical"
          href={`https://multi-tool-eosin.vercel.app/tools/${tool}`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: meta.title,
              description: meta.description,
              url: `https://multi-tool-eosin.vercel.app/tools/${tool}`,
              mainEntityOfPage: `https://multi-tool-eosin.vercel.app/tools/${tool}`,
            }),
          }}
        />
      </Head>

      <div className="pt-32 w-full h-full">
        {Tools[tool] ? (
          Tools[tool]
        ) : (
          <div className="text-center bg-gradient-to-br from-primary/40 via-purple-500/5 to-blue-500/5 animate-gradient h-[80dvh] text-3xl animate-g xl:text-6xl font-bold md:w-[60%] mx-auto flex justify-center items-center primary-text-gradient">
            Tool You Are Looking For is Not Available!
          </div>
        )}
      </div>
    </>
  );
};

export default page;
