"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <nav className="border-b backdrop-blur-sm bg-black fixed w-full z-50 ">
      <div className="container mx-auto px-4 sm:px-10 lg:px-20 py-4 flex items-center justify-between">
        <Link href="/">
          <img src="/logo.png" alt="logo-multitool" className="sm:w-[230px] w-[150px]" />
        </Link>
        <div className="lg:flex hidden items-center gap-6 capitalize text-lg">
          <Link href={"/privacy-policy"} className="primary-text-gradient">
            Privacy Policy
          </Link>
          <Link
            href={"/terms-and-conditions"}
            className="primary-text-gradient"
          >
            Terms condition
          </Link>
          <Link href={"/contact"} className="primary-text-gradient">
            Contact Us
          </Link>
        </div>
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              size="sm"
              className="primary-gradient hover:opacity-90 relative sm:text-[17px] sm:hidden"
            >
              Explore <ArrowRight className="h-5 w-5" />
              <Link href={"/tools/explore"} className="absolute inset-0"></Link>
            </Button>
            <Button
              size="lg"
              className="primary-gradient hover:opacity-90 relative sm:text-[17px] sm:flex hidden"
            >
              Explore <ArrowRight className="h-5 w-5" />
              <Link href={"/tools/explore"} className="absolute inset-0"></Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </nav>
  );
};
