import {
  Ruler,
  Type,
  Key,
  Calculator,
  Coins,
  Image,
  ListTodo,
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
        popularity: 91,
        slug: "image-compressor",
        icon: Image,
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
        popularity: 87,
        slug: "todo-app",
        icon: ListTodo,
      },
    ],
  },
];
