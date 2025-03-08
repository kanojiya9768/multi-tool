import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "./modules/layouts/Navbar";
import { Footer } from "./modules/layouts/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "All-in-One Online Tools",
  description:
    "Access a powerful collection of free online tools for everyday tasks, from calculators and converters to media editors and more. Simplify your workflow today!",
  keywords:
    "online tools, free tools, unit converter, password generator, image resizer, calculator, productivity tools, web tools, tool collection",
  author: "Multi Tools",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="bg-white flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
