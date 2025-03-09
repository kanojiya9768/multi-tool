"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto px-4 text-center bg-gradient-to-br from-primary/40 via-purple-500/5 to-blue-500/5 animate-gradient h-[100dvh] md:h-[80dvh] z-10 flex flex-col justify-center items-center  relative overflow-hidden"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sm:text-4xl text-3xl lg:text-6xl font-bold mb-6 primary-text-gradient "
        >
          All-in-One Tools to Make Life Easier
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-muted-foreground mb-8 md:w-[60%] px-2 sm:px-0 mx-auto"
        >
          {` Whether you're converting units, calculating expenses, or generating
          strong passwords, our free online tools are designed to save you time
          and effort.`}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            size="lg"
            className="primary-gradient hover:opacity-90 relative"
          >
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
            <Link
              href={"/tools/explore"}
              className="absolute inset-0"
            ></Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};
