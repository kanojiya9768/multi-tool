import {
  Ruler,
  Type,
  Key,
  Calculator,
  Coins,
  Image,
  ListTodo,
  Info,
  HandCoins,
  Laugh,
  Drama,
  Dock,
} from "lucide-react";

export const categories = [
  {
    title: "Utility Tools",
    icon: Key,
    tools: [
      {
        name: "Unit Converter",
        description: "Convert between various units",
        popularity: 60,
        slug: "unit-converter",
        icon: Ruler,
      },
      {
        name: "Text Case Converter",
        description: "Transform text between different cases",
        popularity: 76,
        slug: "text-case-converter",
        icon: Type,
      },
      {
        name: "Password Generator",
        description: "Generate secure passwords",
        popularity: 92,
        slug: "password-generator",
        icon: Key,
      },
    ],
  },
  {
    title: "Calculators",
    icon: Calculator,
    tools: [
      {
        name: "Complex Calculator",
        description: "Advanced calculator with scientific functions",
        popularity: 90,
        slug: "complex-calculator",
        icon: Calculator,
      },
      {
        name: "Loan Calculator",
        description: "Calculate loan payments and interest",
        popularity: 85,
        slug: "loan-calculator",
        icon: Coins,
      },
    ],
  },
  {
    title: "Image Tools",
    icon: Image,
    tools: [
      {
        name: "Image Resizer",
        description: "Resize images to specific dimensions",
        popularity: 89,
        slug: "image-resizer",
        icon: Image,
      },
      {
        name: "Image Compressor",
        description: "Compress images while maintaining quality",
        popularity: 98,
        slug: "image-compressor",
        icon: Image,
      },
      {
        name: "Image Converter",
        description:
          "Multi Tool converts your image files online. Amongst many others, we support PNG, JPG, WebP, GIF, BMP, AVIF, and SVG.",
        popularity: 99,
        slug: "image-converter",
        icon: Image,
      },
      {
        name: "Image to PDF Converter",
        description:
          "Easily convert your image files into a PDF document. Supports multiple image formats including PNG, JPG, JPEG, and more.",
        popularity: 99, // You can adjust this based on the tool's popularity
        slug: "image-to-pdf-converter",
        icon: Dock, // Replace this with your actual icon component if needed
      },
    ],
  },
  {
    title: "Productivity",
    icon: ListTodo,
    tools: [
      {
        name: "Todo App",
        description: "Manage your tasks efficiently",
        popularity: 95,
        slug: "todo-app",
        icon: ListTodo,
      },
    ],
  },
  {
    title: "Data/Info",
    icon: Info,
    tools: [
      {
        name: "Age Calculator",
        description:
          "A tool to calculate and determine your exact age in years, months, days, and more. Perfect for keeping track of your milestones and planning ahead.",
        popularity: 87,
        slug: "age-calculator",
        icon: HandCoins,
      },
      {
        name: "Joke Generator",
        description:
          "A fun tool that generates random jokes to make you laugh. Perfect for lightening up your day or sharing with friends.",
        popularity: 87,
        slug: "random-joke-generator",
        icon: Laugh,
      },
    ],
  },
  {
    title: "Fun/Entertainment",
    icon: Drama,
    tools: [
      {
        name: "Trivia Quiz",
        description:
          "A tool to calculate and determine your exact age in years, months, days, and more. Perfect for keeping track of your milestones and planning ahead.",
        popularity: 87,
        slug: "trivia-quiz",
        icon: Drama,
      },
    ],
  },
];
