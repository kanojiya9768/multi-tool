"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <nav className="border-b backdrop-blur-sm bg-background/80 fixed w-full z-50 ">
      <div className="container mx-auto px-4 sm:px-10 lg:px-20 py-4 flex items-center justify-between">
        <Link href="/">
          <img src="/logo.png" alt="logo-multitool" className="w-[230px]" />
        </Link>
        <div className="md:flex hidden items-center gap-6 w-1/3 capitalize">
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
              size="lg"
              className="primary-gradient hover:opacity-90 relative"
            >
              Explore <ArrowRight className="h-4 w-4" />
              <Link
                href={"/#BrowseBycategory"}
                className="absolute inset-0"
              ></Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </nav>
  );
};
