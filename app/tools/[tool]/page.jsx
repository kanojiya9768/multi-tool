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
import React from "react";

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
